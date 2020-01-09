const gulp = require('gulp'),
browserSync = require('browser-sync').create();
const style = require('./style.js').style;
const scripts = require('./scripts.js').scripts;

//Watch for changes on HTML, CSS and JS file

function watch() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: 'app'
    }
  });

  gulp.watch('./app/*.html').on('change', browserSync.reload);
  gulp.watch('./app/assets/styles/**/*.css').on('change', cssInject);
  gulp.watch('./app/assets/scripts/**/*.js').on('change', scriptsRefresh);
};

function cssinject() {
  return gulp.src('./app/temp/styles/styles.css')
  .pipe(browserSync.stream());
};

const cssInject = gulp.series(style, cssinject);


function scriptsrefresh() {
  gulp.watch('./app/temp/scripts/App.js').on('change', browserSync.reload);
};

const scriptsRefresh = gulp.series(scripts, scriptsrefresh);

exports.watch = watch;