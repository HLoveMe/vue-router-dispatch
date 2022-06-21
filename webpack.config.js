const path = require('path');
const webpack = require('webpack');
module.exports = {
  mode: 'production',
  entry: path.join(__dirname, "src", "index.ts"),
  output: {
    path: path.join(__dirname, "esm"),
    filename: 'pin.esm.prod.js',
    library: 'Pin',// 
    libraryTarget: 'umd',
  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      use: ['ts-loader']
    },{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components|build)/,
      use: {
        loader: "babel-loader",
      },
    },]
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
  },
  externals: {
    rxjs: 'rxjs',
    "rxjs/operators": 'rxjs/operators',
    vue: 'vue',
    "vue-router": 'vue-router',
  },
};