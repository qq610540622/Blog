/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    browserSync = require('browser-sync');

var path = {
    scss: './public/sass/*.scss',
    css: './public/build/css'
};

//css
gulp.task('sass', function () {
    return sass(path.scss)
        .pipe(autoprefixer('last 2 version', 'safari 5','firefox', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')) //添加前缀
        //.pipe(rename({ suffix: '.min' }))	//重命名
        //.pipe(minifycss())	//一行显示所有的css
        .pipe(gulp.dest(path.css));	//目标路径
        //.pipe(notify({ message: 'Styles task complete' }));	//提示
});

/*gulp.task('browserSync', function() {
    browserSync({
        files: "**",
        server: {
            baseDir: "./"
        }
    });
});*/

gulp.task('default', function() {
    gulp.watch(path.scss, ['sass']);
});