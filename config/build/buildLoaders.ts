import webpack from 'webpack';

import buildCssLoader from './loaders/buildCssLoader';
import { buildBabelLoader } from './loaders/buildLoaders';
import { BuildOptions } from './types/config';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const { isDev } = options;

  const svgLoader = {
    test: /\.svg$/,
    use: [{ loader: '@svgr/webpack', options: { titleProp: true } }],
  };

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  };

  const babelLoader = buildBabelLoader(options);

  const cssLoader = buildCssLoader(isDev);

  // Если не используется ts - нужен babel-loader
  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  return [fileLoader, babelLoader, svgLoader, typescriptLoader, cssLoader];
}
