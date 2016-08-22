var gulp = require('gulp'); 

var jshint       = require('gulp-jshint');
var compass      = require('gulp-compass');
var watch        = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');
var karma        = require('karma').server;
var jasmine      = require('gulp-jasmine');
var webpack      = require('gulp-webpack');
var pixrem       = require('gulp-pixrem');
var rename       = require('gulp-rename');

var singleRun = true;

gulp.task('jasmine', function () {
    return gulp.src('./assets/js/app.spec.js')
        .pipe(jasmine({
            verbose: true
        }));
});

gulp.task('tests', function (done) {
    return karma.start({
        configFile:  __dirname + '/karma.conf.js',
        singleRun: singleRun
      }, done);
});

gulp.task('webpack', function() {
    return gulp.src('./assets/js/app.js')
        .pipe(webpack({
            module: {
                loaders: [
                    {
                        test: /\.jsx?$/,
                        exclude: /(node_modules|bower_components)/,
                        loader: 'babel',
                        query: {
                            presets: ['es2015', 'react']
                        }
                    },
                    {   
                        test: require.resolve("react"), 
                        loader: "expose?React" 
                    }
                ]
            },
            resolve: {
                extensions: ['', '.js', '.jsx']
            }
        }))
        .pipe(rename('app.js'))
        .pipe(gulp.dest('./assets/js/build'));
});

gulp.task('webpack:tests', function() {
  return gulp.src('./assets/js/app.spec.js')
    .pipe(webpack())
    .pipe(rename('app.spec.js'))
    .pipe(gulp.dest('./assets/js/build'));
});


gulp.task('compass', function() {
  gulp.src('./assets/css/*.scss')
    .pipe(compass({
      css: './assets/css/build',
      sass: './assets/css',
    }))
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
    }))
    .pipe(pixrem({
      rootValue: '100%',
      replace: true
    }))
    .pipe(gulp.dest('./assets/css/build/'));
});



// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('assets/css/**/*.scss', ['compass']);
    gulp.watch(['assets/js/components/**/*', 'assets/js/app.js'], ['webpack']);
    // gulp.watch(['assets/js/app.spec.js'], ['webpack:tests']);
    // gulp.watch(['assets/js/build/app.spec.js'], ['tests']);
});

// Default Task
gulp.task('default', ['compass', 'webpack',  'watch']); 
//'webpack:tests', 'tests',