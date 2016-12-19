// MANERJO DE GULP
var gulp = require('gulp');

// actaliza en tiempo real
var watch = require('gulp-watch');

// destruye si existe error en publigns
var plumber = require('gulp-plumber');

// busca en el codigo html <!-- build:css css/combined.css --> <!-- endbuild -->
var useref = require('gulp-useref');
var gulpif = require('gulp-if');

// comprime codigo js
var uglify = require('gulp-uglify');

// comprime codigo css
var minifyCss = require('gulp-clean-css');

// comprime html
var htmlmin = require('gulp-htmlmin');

// comprime imagen
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

// servidor remoto
var server = require('gulp-express');

// servidor local
var connect = require('gulp-connect');

// inyectar codigo  al html
var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');
var debug = require('gulp-debug');



/**
 * inyeccion elementos en bower
 */
gulp.task('bower', function() {
    return gulp.src('./app/index.html')
        .pipe(inject(gulp.src(
            mainBowerFiles(), { read: false }), { name: 'bower', relative: true }))
        .pipe(gulp.dest('./app/'));
});


/**
 * Documentacion Javascript
 */

var jsdoc = require("gulp-jsdoc");

gulp.task('jsdoc', function() {
    gulp.src("./app/config/*.js")
        .pipe(jsdoc('./documentation-js'))
});



/**
 * Documentacion Javascript
 */


// node node_modules/jsdoc/jsdoc.js   --configure node_modules/angular-jsdoc/common/conf.json   --template node_modules/angular-jsdoc/angular-template   --destination build/docs   --readme README.md  --recurse app/config/
var shell = require('gulp-shell');

gulp.task('docs', shell.task([
    'node node_modules/jsdoc/jsdoc.js ' +
    '-c node_modules/angular-jsdoc/common/conf.json ' + // config file
    '-t node_modules/angular-jsdoc/angular-template ' + // template file
    '-d build/docs ' + // output directory
    './README.md ' + // to include README.md as index contents
    '-r app/config/app.js' // source code directory

]));

/**
 * ejecucucion del servidor
 */

gulp.task('desarrollo', function() {
    connect.server({
        root: 'app/development',
        port: 8090,
        livereload: true
    });
});

/**
 * Actualicacion de servidor en vivo
 */

gulp.task('localhost', function() {
    connect.server({
        root: 'app/development',
        port: 8090,
        livereload: false
    });
});



gulp.task('html', function() {
    gulp.src('./app/development/*.html')
        .pipe(connect.reload());
});

/*
ejecutamos webserver app.js
*/
gulp.task('webserver', function() {
    server.run(['app.js']);
});

gulp.task('minifyhtmlall', function() {
    return gulp.src([
            './app/development/*.html',
            './app/development/proyect/**/*.html',
            './app/development/view/**/*.html'
        ])
        .pipe(plumber())
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./app/testing/htmlcompress'))
});

/*
se minifica el codigo html de los proyectos
*/
gulp.task('MinifyHtmlProyect', function() {
    return gulp.src('./app/development/proyect/**/*.html')
        .pipe(plumber())
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./app/testing/proyect'))
});

/*
se minifica el codigo html del index principal
*/
gulp.task('MinifyHtmlView', function() {
    return gulp.src('./app/development/view/**/*.html')
        .pipe(plumber())
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./app/testing/view'))
});



gulp.task('MinifyJsAssets', function() {
    gulp.src('./app/development/assets/**/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('./app/testing/assets/'));
});

gulp.task('MinifyJs', function() {
    gulp.src('./app/development/*.js')
        .pipe(plumber())
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest('./app/testing/'));
});


gulp.task('MinifyJsConfiguracion', function() {
    gulp.src('./app/development/configuration/**/*.js')
        .pipe(plumber())
        .pipe(uglify({
            mangle: false,
            output: {
                comments: false,
                beautify: false
            }
        }))
        .pipe(gulp.dest('./app/testing/configuration/'));
});


gulp.task('MinifyCssAssets', function() {
    gulp.src('./app/development/assets/**/*.css')
        .pipe(plumber())
        .pipe(minifyCss())
        .pipe(gulp.dest('./app/testing/assets/'));
});


gulp.task('compress', function() {
    gulp.src('./app/development/index.html')
        .pipe(plumber())
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('./app/testing'));
});


gulp.task('imagemin', function() {
    gulp.src('./app/development/assets/images/**/*.{jpg,jpeg,png,gif,svg}')
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest('./app/testing/assets/images'));
});


gulp.task('minifyimg', function() {
    return gulp.src('./app/development/assets/images/**/*.{jpg,jpeg,png,gif,svg}')
        .pipe(plumber())
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./app/testing/assets/images'));
});


gulp.task('watch', function() {
    gulp.watch([
        './app/development/proyect/**/*.html',
        './app/development/*.html',
        './app/development/view/**/*.html'
    ], ['html']);
});


gulp.task('debug', ['compress',
    'MinifyHtmlProyect',
    'MinifyHtmlView',
    'MinifyJs',
    'MinifyJsProyect',
    'MinifyCssAssets',
    'MinifyJsView',
    'MinifyJsAssets',
    'MinifyJsConfiguracion',
    'minifyimg'
]);

gulp.task('local', ['desarrollo', 'watch']);

gulp.task('escritorio', ['webserver']);

gulp.task('default', ['webserver']);