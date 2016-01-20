var argv          = require('yargs').argv;
var gulp          = require('gulp');
var jshint        = require('gulp-jshint');
var plugins       = require('gulp-load-plugins')({ camelize: true });
var runSequence   = require('run-sequence');
var source        = require('vinyl-source-stream');
var browserify    = require('browserify');


/* Server */
var embedlr         = require('gulp-embedlr');
var refresh         = require('gulp-livereload');
var lrserver        = require('tiny-lr')();
var express         = require('express');
var livereload      = require('connect-livereload');
var livereloadport  = 35729;
var serverport      = 5000;


var ENVS = {
  dev: 'dev',
  prod: 'prod'
};

var ENV = ENVS[argv.env || 'dev'];

var paths  = {
  indexFile: 'app/index.html',
  viewFiles: './app/**/*.html',
  sassFiles: './app/application/styles/**/*.scss',
  sassRoot: './app/application/styles/main.scss',
  sourceFiles: 'app/**/*.js',
  gulpFile: 'gulpfile.js',
  dist: {
    root: 'dist/',
    js: 'dist/js/',
    css: 'dist/css/'
  }
};

/* TODO: Live Reload not working */
var server = express();
server.use(livereload({port: livereloadport}));
server.use(express.static('./dist'));
server.all('/*', function(req, res) {
  res.sendFile('index.html', { root: 'dist' });
});

gulp.task('start', ['compile', 'watch'], function() {
  server.listen(serverport);
  lrserver.listen(livereloadport);
  console.log('Server started at http://localhost:' + serverport);
});

gulp.task('compile', function (done) {
  runSequence(
    'clean:dist',
    'config',
    'views',
    ['browserify', 'styles'],
    done
  );
  refresh(lrserver);
});

gulp.task('watch', [], function() {
  gulp.watch(['app/*.js', 'app/**/*.js'],[
    'compile'
  ]);

  gulp.watch(['app/*.scss', 'app/**/*.scss'],[
    'compile'
  ]);
  
  gulp.watch(['app/*.html', 'app/**/*.html'], [
    'compile'
  ]);
});

gulp.task('config', function () {
  return gulp.src('./config/' + ENV + '.json')
  .pipe(plugins.ngConstant({
    name: 'myApp.config',
    wrap: 'module.exports = <%= __ngModule.replace(";", ".name;") %>'
  }))
  .pipe(plugins.rename({ basename:'config' }))
  .pipe(gulp.dest('./dist/js'));
});

gulp.task('clean:dist', function () {
  return gulp.src(paths.dist.root, { read: false })
  .pipe(plugins.clean({ force: true }));
});

gulp.task('lint', function() {
  gulp.src('./app/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('browserify', function () {
  return browserify({
    debug: true
  })
  .add('./app')
  .require('./' + paths.dist.js + 'config',    { expose: 'config' })  
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(paths.dist.js))  
});

gulp.task('views', function() {
  gulp.src('app/index.html')
  .pipe(gulp.dest('dist'));

  gulp.src('./app/**/*.html')
  .pipe(gulp.dest('dist/views/'))
  .pipe(refresh(lrserver));
});

gulp.task('styles', function () {
  return gulp.src(paths.sassRoot)
  .pipe(plugins.sass({ errLogToConsole: true }))
  .pipe(plugins.minifyCss())
  .pipe(plugins.rename({ suffix: '.min' }))
  .pipe(gulp.dest(paths.dist.css));
});



