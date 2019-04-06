const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const os = require('os');

const devMode = process.env.NODE_ENV !== 'production';

const cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      importLoaders: 1
    }
  }
];

if (!devMode) {
  cssLoaders.push({
    loader: 'postcss-loader'
  });
}

module.exports = {
  target: 'web',
  mode: process.env.NODE_ENV || 'production',
  devtool: 'sourceMap',
  entry: {
    app: [path.join(__dirname, '/assets/scss/app.scss')],
    homepage: [path.join(__dirname, '/assets/scss/homepage.scss')],
    login: [path.join(__dirname, '/assets/scss/login.scss')],
    new: [path.join(__dirname, '/assets/scss/new.scss')],
    register: [path.join(__dirname, '/assets/scss/register.scss')],
    search: [path.join(__dirname, '/assets/scss/search.scss')]
  },
  output: {
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? {
            loader: 'style-loader',
            options: {
              sourceMap: true,
              convertToAbsoluteUrls: true
            }
          } : MiniCssExtractPlugin.loader,
          ...cssLoaders,
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true,
              root: path.resolve(__dirname)
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:10].[ext]',
              outputPath: 'fonts/'
            }
          }]
      },
      {
        test: /\.(png|jpe?g|gif|svg)?$/i,
        use: [
          {
            loader: 'img-loader',
            options: {
              enabled: !devMode
            }
          },
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve('./public'),
      verbose: true,
      dry: false
    }),
    new UglifyJsPlugin({
      cache: true,
      extractComments: !devMode,
      parallel: os.cpus().length - 1,
      sourceMap: true
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }]
      },
      canPrint: true
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    }),
    new ManifestPlugin({
      publicPath: '/'
    }),
    new CopyWebpackPlugin([
      {
        from: 'assets/images',
        to: devMode ? 'images/[name].[ext]' : 'images/[name].[hash].[ext]',
        ignore: ['.DS_Store']
      }
    ])
  ]
};
