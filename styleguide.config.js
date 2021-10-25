module.exports = {
  components: [
    'components/ApiResolver.js',
    'components/Authenticator.js',
    'components/DataList.js',
    'components/InputForm.js'
  ],
  webpackConfig: {
    module: {
      rules: [
        // Babel loader will use your project’s babel.config.js
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        // Other loaders that are needed for your components
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    }
  },
  styleguideDir: 'docs'
}
