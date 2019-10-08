const gulp = require('gulp'),
webpack = require('webpack'),
webpackConfig = require('../../webpack.config.js');

//1. Compiles JS files

function scripts(cb) {
  return new Promise((resolve, reject) => {
      webpack(webpackConfig, (err, stats) => {
          if (err) {
              return reject(err)
          }
          if (stats.hasErrors()) {
              return reject(new Error(stats.compilation.errors.join('\n')))
          }
          resolve()
      })
  })
};

exports.scripts = scripts;