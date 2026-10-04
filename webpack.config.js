const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env = {}) => {
  const isGitHubPages = Boolean(env.githubPages);

  return {
    entry: './src/app.js',
    output: {
      path: path.resolve(__dirname, isGitHubPages ? 'dist-pages' : 'dist'),
      filename: 'bundle.js',
      publicPath: isGitHubPages ? './' : '/'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|svg|jpe?g|gif|webp)$/i,
          type: 'asset/resource',
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
      port: 3000,
      hot: true,
      open: true
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.GITHUB_PAGES': JSON.stringify(isGitHubPages)
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html'
      })
    ],
    resolve: {
      extensions: ['.js', '.jsx']
    }
  };
};
