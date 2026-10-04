const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config();

module.exports = (env = {}) => {
  const isGitHubPages = Boolean(env.githubPages);

  if (
    isGitHubPages
    && (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY)
  ) {
    throw new Error(
      'GitHub Pages builds require SUPABASE_URL and SUPABASE_ANON_KEY. '
      + 'Configure them as GitHub Actions variables or secrets.'
    );
  }

  if (isGitHubPages) {
    let supabaseUrl;

    try {
      supabaseUrl = new URL(process.env.SUPABASE_URL);
    } catch (error) {
      throw new Error(
        'SUPABASE_URL must be the Supabase project API URL, '
        + 'for example https://<project-ref>.supabase.co.'
      );
    }

    if (
      supabaseUrl.protocol !== 'https:'
      || supabaseUrl.hostname === 'supabase.com'
      || supabaseUrl.pathname !== '/'
      || supabaseUrl.search
      || supabaseUrl.hash
    ) {
      throw new Error(
        'SUPABASE_URL must be the Supabase project API URL, '
        + 'for example https://<project-ref>.supabase.co, not a dashboard URL.'
      );
    }
  }

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
        'process.env.GITHUB_PAGES': JSON.stringify(isGitHubPages),
        'process.env.SUPABASE_URL': JSON.stringify(process.env.SUPABASE_URL || ''),
        'process.env.SUPABASE_ANON_KEY': JSON.stringify(process.env.SUPABASE_ANON_KEY || '')
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
