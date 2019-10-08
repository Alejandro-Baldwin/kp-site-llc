const gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del');

const config = {
    mode: {
        css: {
            sprite: 'svg/sprite.svg',
            render: {
                css: {
                    template: './gulp/templates/sprite.css'
                }
            }
        }
    }
}

//1. Starts with a clean blank

function beginClean() {
    return del(['./app/temp/sprite', './app/assets/images/sprites']);
};

//2. Creates one compiled SVG file with all individual svg images and
//-- creates the CSS file with the config

function createSprite() {
    return gulp.src('./app/assets/images/icons/**/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('./app/temp/sprite/'));
};

//3. Moves the compiled file to the assets folder

function copySpriteGraphic() {
    return gulp.src('./app/temp/sprite/css/**/*.svg')
        .pipe(gulp.dest('./app/assets/images/sprites'));
};

//4. Moves the CSS file to the assets folder

function copySpriteCSS() {
    return gulp.src('./app/temp/sprite/css/*.css')
        .pipe(rename('_sprite.css'))
        .pipe(gulp.dest('./app/assets/styles/modules'));
};

//5. Deletes all the TEMP files and folders

function endClean() {
    return del('./app/temp/sprite');
};

//6. Triggers all the functions in the correct order

const icons = gulp.series(beginClean, createSprite, gulp.parallel(copySpriteCSS, copySpriteGraphic), endClean)

exports.icons = icons;