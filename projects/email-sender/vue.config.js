const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/email-sender/'
    : '/',
  outputDir: '../../email-sender/',
  productionSourceMap: false,
  pages: {
    index: {
      entry: './src/main.js',
      title: 'Email Sender',
    },
  },
  configureWebpack: {
    plugins: [new MonacoWebpackPlugin()],
  },
};
