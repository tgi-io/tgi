/**---------------------------------------------------------------------------------------------------------------------
 * tgi/gulpfile.js
 */

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var childProcess = require('child_process');

/**
 * html5
 */

// Source and _packaging
var html5LibFiles = [
  'node_modules/tgi-core/lib/_packaging/lib-header',
  'node_modules/tgi-core/dist/tgi.core.chunk.js',
  'node_modules/tgi-store-remote/dist/tgi.store.remote.chunk.js',
  'node_modules/tgi-store-local/dist/tgi.store.local.chunk.js',
  'node_modules/tgi-interface-framework7/dist/tgi.interface.framework7.chunk.js',
  'node_modules/tgi-interface-bootstrap/dist/tgi.interface.bootstrap.chunk.js',
  'node_modules/tgi-core/lib/_packaging/lib-footer'
];

// Build Lib
gulp.task('_buildHtml5Lib', function () {
  return gulp.src(html5LibFiles)
    .pipe(concat('tgi.html5.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('tgi.html5.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

/**
 * node
 */

// Source and _packaging
var nodeLibFiles = [
  'node_modules/tgi-core/lib/_packaging/lib-header',
  'node_modules/tgi-core/dist/tgi.core.chunk.js',
  'node_modules/tgi-store-remote/dist/tgi.store.host.chunk.js',
  'node_modules/tgi-store-json-file/dist/tgi.store.json.file.chunk.js',
  'node_modules/tgi-store-mongodb/dist/tgi.store.json.mongodb.chunk.js',
  'node_modules/tgi-core/lib/_packaging/lib-footer'
];

// Build Lib
gulp.task('_buildNodeLib', function () {
  return gulp.src(nodeLibFiles)
    .pipe(concat('tgi.node.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('tgi.node.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

// Build Task
gulp.task('build', ['_buildHtml5Lib', '_buildNodeLib'], function (callback) {
  callback();
});

gulp.task('default', ['build']);
