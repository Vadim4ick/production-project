import { JsxAttribute, Node, Project, SyntaxKind } from 'ts-morph';

const project = new Project({});

const toggleFunctionName = 'toggleFeatures';
const toggleComponentName = 'ToggleFeatures';

const removedFeatureName = process.argv[2]; // example isArticleEnabled
const featureState = process.argv[3]; // example off/on

if (!removedFeatureName) {
  throw new Error('Укажите название фича-флага');
}

if (!featureState) {
  throw new Error('Укажите состояние фичи (on/off)');
}

if (featureState !== 'on' && featureState !== 'off') {
  throw new Error('Некорректное значение фичи (on/off)');
}

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

function isToggleFunction(node: Node) {
  let isToggleFeatures = false;

  node.forEachChild((child) => {
    if (
      child.isKind(SyntaxKind.Identifier) &&
      child.getText() === toggleFunctionName
    ) {
      isToggleFeatures = true;
    }
  });

  return isToggleFeatures;
}

function isToggleComponent(node: Node) {
  // let isToggleFeatures = false;
  // node.forEachChild((child) => {
  //   if (
  //     child.isKind(SyntaxKind.Identifier) &&
  //     child.getText() === toggleComponentName
  //   ) {
  //     isToggleFeatures = true;
  //   }
  // });
  // return isToggleFeatures;

  const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);

  return identifier?.getText() === toggleComponentName;
}

const replaceRemoveFunction = (node: Node) => {
  const objectOptions = node.getFirstDescendantByKind(
    SyntaxKind.ObjectLiteralExpression,
  );

  if (!objectOptions) {
    return;
  }

  const featureNameProperty = objectOptions.getProperty('name');
  const onFunctionProperty = objectOptions.getProperty('on');
  const offFunctionProperty = objectOptions.getProperty('off');

  const onFunction = onFunctionProperty?.getFirstDescendantByKind(
    SyntaxKind.ArrowFunction,
  );
  const offFunction = offFunctionProperty?.getFirstDescendantByKind(
    SyntaxKind.ArrowFunction,
  );
  const featureName = featureNameProperty
    ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
    ?.getText()
    .slice(1, -1);

  if (featureName !== removedFeatureName) return;

  if (featureState === 'on') {
    node.replaceWithText(onFunction?.getBody().getText() ?? '');
  }

  if (featureState === 'off') {
    node.replaceWithText(offFunction?.getBody().getText() ?? '');
  }
};

const getAttributeByName = (JsxAttribute: JsxAttribute[], name: string) => {
  return JsxAttribute.find((node) => node.getName() === name);
};

const getReplaceComponent = (attribute?: JsxAttribute) => {
  const value = attribute
    ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
    ?.getExpression()
    ?.getText();

  if (value?.startsWith('(')) {
    return value.slice(1, -1);
  }

  return value;
};

const replaceComponent = (node: Node) => {
  const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

  const onAttributes = getAttributeByName(attributes, 'on');
  const offAttributes = getAttributeByName(attributes, 'off');
  const featureNameAttribute = getAttributeByName(attributes, 'feature');

  const featureName = featureNameAttribute
    ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
    ?.getText()
    .slice(1, -1);

  if (featureName !== removedFeatureName) return;

  const offValue = getReplaceComponent(offAttributes);
  const onValue = getReplaceComponent(onAttributes);

  if (featureState === 'on' && onValue) {
    node.replaceWithText(onValue);
  }

  if (featureState === 'off' && offValue) {
    node.replaceWithText(offValue);
  }
};

files.forEach((sourceFile) => {
  sourceFile.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      return replaceRemoveFunction(node);
    }

    if (
      node.isKind(SyntaxKind.JsxSelfClosingElement) &&
      isToggleComponent(node)
    ) {
      return replaceComponent(node);
    }
  });
});

project.save();
