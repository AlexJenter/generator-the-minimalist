'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');
var inline = require('gulp-inline');
var inlinesource = require('gulp-inline-source');


gulp.task('sass', function() {
    return gulp.src('src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('src/'))
        .pipe(connect.reload());
});

gulp.task('inlinesource', function() {
    return gulp.src('./src/index.html')
        .pipe(inlinesource())
        .pipe(gulp.dest('./'))
        .pipe(connect.reload());
});


gulp.task('connect', function() {
    connect.server({
        root: './',
        livereload: true
    });
});

gulp.task('watch', function() {
    gulp.watch('./src/**/*.scss', ['sass']);
    gulp.watch('./src/**/*.css', ['inlinesource']);
    gulp.watch('./src/**/*.html', ['inlinesource']);
});

gulp.task('default', ['sass', 'inlinesource', 'connect', 'watch']);
gulp.task('build', ['sass', 'inlinesource']);
