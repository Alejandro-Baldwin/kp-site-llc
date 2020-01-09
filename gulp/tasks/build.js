
const gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemins = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();
const style = require('../../gulp/tasks/style').style;
const scripts = require('./scripts').scripts;
const icons = require('../../gulp/tasks/sprites.js').icons;

//1. Watch function for the Dist

function previewDist() {

    browserSync.init({
        notify: false,
        server: {
            baseDir: "docs"
        }
    });
};

//2. Deletes the Dist Folder to start clean

function deleteDistFolder() { 
    return del("./docs");
};

//3. Moves general files in to the Dist folder

function copyGeneralFiles(callback) {
    const pathsToCopy = [
        './app/**/*',
        '!./app/**',
        '!./app/assets/php/**',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp',
        '!./app/temp/**'
    ]

    return gulp.src(pathsToCopy)
        .pipe(gulp.dest("./docs"));
};

//4. Compresses images and places it in the Dist folder

function optimizeImages() {
    return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
        .pipe(imagemin({
            progresice: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest("./docs/assets/images"));
};

//5. Compresses the CSS and JS files, add version and places them in the Dist folder

function usemin() {
    return gulp.src("./app/index.html")
        .pipe(usemins({
            css: [function() {return rev()}, function() {return cssnano()}],
            js: [function() {return rev()}, function() {return uglify()}]
        }))
        .pipe(gulp.dest("./docs"));
};

//6. Triggers all the functions in the correct order

const build = gulp.series(icons, deleteDistFolder, style, scripts, gulp.parallel(usemin, optimizeImages, copyGeneralFiles));

exports.build = build;