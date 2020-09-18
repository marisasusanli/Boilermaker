module.exports = {
  entry: './app/main.js', // assumes your entry point is main.js in a folder called app
  mode: 'development',
  output: {
    path: __dirname, // assumes your bundle.js will be in a folder called public
    filename: './public/bundle.js',
  },
  devtool: 'source-maps',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
