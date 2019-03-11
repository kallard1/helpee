const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ENV = (process.env.NODE_ENV !== undefined ? process.env.NODE_ENV : "production");
const dev = ENV === 'development';

let cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1
    }
  }
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
      '@scss': resolve('./assets/scss/')
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.scss', '.css']
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        // cache: resolve('./var/cache/'),
        extractComments: !dev,
        parallel: 4,
        sourceMap: true
      })]
  },
  devServer: {
    contentBase: resolve('./public'),
    overlay: true,
    port: 9000
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|vendor)/,
        use: {
          loader: 'eslint-loader'
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|vendor)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules|bower_components|vendor)/,
        use: [
          'babel-loader', 'ts-loader'
        ]
      },
      {
        test: /\.css$/,
        use: cssLoaders
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            ...cssLoaders, 'sass-loader'
          ]
        })
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
              enabled: !dev
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

  plugins: [
    new CleanWebpackPlugin(['build'], {
      root: resolve('./public'),
      verbose: true,
      dry: false
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].css'
    }),
    new ManifestPlugin(),
    new CopyWebpackPlugin([
      { from: 'assets/images', to: 'images' }
    ])
  ]
};

module.exports = config;
