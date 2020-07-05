module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/filter-color-generator/'
    : '/',
  outputDir: '../../filter-color-generator/',
  productionSourceMap: false,
  pages: {
    index: {
      entry: './src/main.js',
      title: 'CSS Filter Color Generator',
    },
  },
};
