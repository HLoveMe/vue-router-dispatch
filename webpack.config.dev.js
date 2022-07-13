const path = require('path');
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, "src", "index.ts"),
  output: {
    path: path.join(__dirname, "esm"),
    filename: 'pin.esm.dev.js',
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
        options:{
          "plugins": [
            [
              "@babel/plugin-transform-runtime",
              {
                "helpers": true,
                "corejs": 3,
                "regenerator": true,
                "useESModules": false,
                "absoluteRuntime": false,
              }
            ]
          ],
          presets:[
            [
              '@babel/preset-env',{
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
  externals: [
    "rxjs",
    'rxjs/operators',
    "vue",
    "vue-router",
  ],
  devtool: 'cheap-module-source-map',
};