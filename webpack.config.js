const path = require('path');
const webpack = require('webpack');
module.exports = {
  mode: 'production',
  entry: path.join(__dirname, "dist", "index.js"),
  output: {
    path: path.join(__dirname, "cjs"),
    filename: 'pin.cjs.prod.js',
    library: 'Pin',// 
    libraryTarget: 'umd',
  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      use: ['ts-loader']
    }, {
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components|build)/,
      use: {
        loader: "babel-loader",
        options: {
          "plugins": [
            ["@babel/plugin-proposal-optional-chaining"],
          ],
          presets: [
            [
              "@babel/preset-env", {
                // 要兼容的目标浏览器
                targets: {
                  chrome: '74',
                  firefox: '60',
                  safari: '10',
                  edge: '17'
                },
                // 指定corejs版本
                "corejs": "3",
              }
            ]
          ]
        }
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
    vue: 'vue',
    "vue-router": 'vue-router',
  },
};