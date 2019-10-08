const gulp = require('gulp'),
postCss = require('gulp-postcss'),
cssImport = require('postcss-import'),
autoprefixer = require('autoprefixer'),
mixins = require('postcss-mixins'),
hexrgba = require('postcss-hexrgba')
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
browserSync = require('browser-sync').create();

// Compile BEM in to CSS 

function style() {
    //1. where is my BEM CSS file?

    return gulp.src('./app/assets/styles/styles.css')
    
    //2. pass that file trough PostCSS compiler

      .pipe(postCss([cssImport, cssvars, mixins, hexrgba, nested, autoprefixer]))

    //3. Error managment
    .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
      })  
      
    //4. where do I place compiled CSS?

      .pipe(gulp.dest('./app/temp/styles'));

    //5. stream changes to all browsers
}

exports.style = style;