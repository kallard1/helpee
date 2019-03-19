const {resolve} = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const ENV = (process.env.NODE_ENV !== undefined ? process.env.NODE_ENV : 'production');
const dev = ENV === 'development';

let cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
    },
  },
];

if (!dev) {
  cssLoaders.push({
    loader: 'postcss-loader',
  });
}

let config = {
  target: 'web',
  mode: ENV,
  devtool: dev ? 'cheap-module-eval-source-map' : 'source-map',
  entry: {
    app: [resolve('./assets/scss/app.scss')],
    homepage: [resolve('./assets/scss/homepage.scss')],
  },
  output: {
    path: resolve('./public/build'),
    filename: 'js/[name].js',
    //filename: 'js/' + (dev ? '[name].js' : '[name].[hash:10].js'),
    publicPath: '/build/'
  },
  resolve: {
    alias: {
      '@': resolve('./assets'),
      '@fonts': resolve('./assets/fonts/'),
      '@images': resolve('./assets/images/'),
      '@js': resolve('./assets/js/'),
      '@scss': resolve('./assets/scss/'),
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.scss', '.css'],
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        extractComments: !dev,
        parallel: 4,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', {discardComments: {removeAll: true}}],
        },
        canPrint: true,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },

  devServer: {
    contentBase: resolve('./public'),
    overlay: true,
    port: 9000,
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|vendor)/,
        use: {
          loader: 'eslint-loader',
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|vendor)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules|bower_components|vendor)/,
        use: [
          'babel-loader', 'ts-loader',
        ],
      },
      {
        test: /\.bundle\.js$/,
        use: 'bundle-loader',
      },
      {
        test: /\.css$/,
        use: cssLoaders,
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, ...cssLoaders, 'sass-loader'],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:10].[ext]',
              outputPath: 'fonts/',
            },
          }],
      },
      {
        test: /\.(png|jpe?g|gif|svg)?$/i,
        use: [
          {
            loader: 'img-loader',
            options: {
              enabled: !dev,
            },
          },
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['build'], {
      root: resolve('./public'),
      verbose: true,
      dry: false,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new ManifestPlugin(),
    new CopyWebpackPlugin([
      {from: 'assets/images', to: 'images'},
    ]),
  ],
};

module.exports = config;
