module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/pert-online/'
    : '/',
  outputDir: '../../pert-online/',
  pages: {
    index: {
      entry: './src/main.js',
      title: 'Pert Calculator Online',
    },
  },
};
