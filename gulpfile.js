let gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglifyes'),
    autoPrefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    bs = require('browser-sync'),
    htmlMin = require('gulp-htmlmin'),
    rename = require('gulp-rename'),
    delFiles = require('del'),
    cssMin = require('gulp-csso'),
    babel = require('gulp-babel'),
    imageMin = require('gulp-imagemin');
    const paths = {
        devHtml: 'app/*.html',
        devSass: 'app/sass/**/*.scss',
        devJs: 'app/js/**/*.js',
        devImg: "app/img/*.+(jpg|png|jpeg|svg)",
        project: 'dist/html',
        projectCss: 'dist/css',
        projectJs: 'dist/js',
        projectImg: 'dist/img',
    };


gulp.task('test', () => {
    return console.log('Gulp works!')
});

gulp.task('html', () => {
    return gulp.src(paths.devHtml) 
        .pipe(htmlMin({collapseWhitespace: true})) 
        .pipe(gulp.dest(paths.project)); 
 });

 gulp.task('imageMin', () => {
    return gulp.src(paths.devImg) 
        .pipe( imageMin())
        .pipe(gulp.dest(paths.projectImg));
 });