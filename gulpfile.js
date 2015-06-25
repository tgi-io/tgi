/**---------------------------------------------------------------------------------------------------------------------
 * tgi/gulpfile.js
 */

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var childProcess = require('child_process');

// Source and _packaging
var libFiles = [
  'node_modules/tgi-core/lib/_packaging/lib-header',
  'node_modules/tgi-core/dist/tgi.core.chunk.js',
  'node_modules/tgi-interface-framework7/dist/tgi.interface.framework7.chunk.js',
  'node_modules/tgi-interface-bootstrap/dist/tgi.interface.bootstrap.chunk.js',
  'node_modules/tgi-store-local/dist/tgi.store.local.chunk.js',
  'node_modules/tgi-core/lib/_packaging/lib-footer'
];

// Build Lib
gulp.task('_buildLib', function () {
  return gulp.src(libFiles)
    .pipe(concat('tgi.client.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('tgi.client.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

// Build Task
gulp.task('build', ['_buildLib'], function (callback) {
  callback();
});

gulp.task('default', ['build']);
