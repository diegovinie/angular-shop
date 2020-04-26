module.exports = {
  module : {
    rules: [
      {
        test: /\.(tsx|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test   : /\.scss$/,
        loader : 'postcss-loader',
        options: {
          ident  : 'postcss',
          plugins: () => [
            require('postcss-short')(),
          ]
        }
      }
    ]
  }
};
