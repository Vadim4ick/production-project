/* eslint-disable @typescript-eslint/no-non-null-assertion */
import path from 'path';
import webpack, { DefinePlugin } from 'webpack';

import buildCssLoader from '../build/loaders/buildCssLoader';

import { BuildPaths } from './../build/types/config';

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
    locales: '',
    buildLocales: '',
  };
  // config.resolve?.modules?.push(paths.src);

  config.resolve!.modules = [paths.src, 'node_modules'];

  config.resolve?.extensions?.push('.ts', '.tsx');

  config.module!.rules = config.module?.rules?.map(
    (rule: webpack.RuleSetRule | '...') => {
      if (rule !== '...' && /svg/.test(rule.test as string)) {
        console.log(rule);
        return {
          ...rule,
          exclude: /\.svg$/i,
        };
      } else {
        return rule;
      }
    },
  );

  config.module?.rules?.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  });
  config.module?.rules?.push(buildCssLoader(true));

  config!.resolve!.alias = {
    '@': path.resolve(__dirname, '..', '..', 'src'),
  };

  config.plugins?.push(
    new DefinePlugin({
      __IS_DEV__: true,
      __API__: JSON.stringify('https://testapi.ru'),
      __PROJECT__: JSON.stringify('storybook'),
    }),
  );

  return config;
};
