const withStylus = require('@zeit/next-stylus');
require('dotenv').config();
const webpack = require('webpack');

module.exports = {
  webpack: config => {
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
      return acc;
    }, {});

    console.log('QUE ES ENV', env);

    config.plugins.push(new webpack.DefinePlugin(env));

    return config;
  }
}