/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BuildPaths } from './../build/types/config';
import webpack, { DefinePlugin } from 'webpack';
import path from 'path';
import buildCssLoader from '../build/loaders/buildCssLoader';

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
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

  config.plugins?.push(
    new DefinePlugin({
      __IS_DEV__: true,
    }),
  );

  return config;
};
