const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

const browserSync = require('browser-sync').create();

const updateStyles = () => {
    return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
};

const start = () => {
    browserSync.init({
        server: {
           baseDir: "./src",
           index: "/index.html"
        }
    });
    gulp.watch('src/scss/**/*.scss', updateStyles)
    gulp.watch('src/*.html').on('change',browserSync.reload);
    gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
};

exports.buildcss = updateStyles;
exports.start = start;