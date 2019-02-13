// gulp watch
const gulp = require('gulp'),
  processor = require('postcss-processor-order'),
  postcss = require('gulp-postcss'),
  cssImport = require('postcss-import'),
  cssFor = require('postcss-for'),
  mixins = require('postcss-mixins'),
  cssvars = require('postcss-simple-vars'),
  nested = require('postcss-nested'),
  colorFunctions = require('postcss-color-function'),
  pixelsToRem = require('postcss-pixels-to-rem'),
  googleColor = require('postcss-google-color'),
  cssnano = require('gulp-cssnano'),
  cssDeclarationSorter = require('css-declaration-sorter'),
  cssNext = require('postcss-preset-env'),
  cssif = require('postcss-conditionals')

gulp.task('styles', () => {
  return gulp
    .src('./src/assets/css/styles.css')
    .pipe(
      postcss([
        cssNext,
        cssImport,
        cssFor,
        cssif,
        cssvars,
        mixins,
        nested,
        pixelsToRem,
        googleColor,
        colorFunctions,
      ])
    )
    .on('error', errorInfo)
    .pipe(postcss([cssDeclarationSorter({ order: 'smacss' })]))
    .pipe(cssnano())
    .pipe(gulp.dest('./src/assets'))
})

gulp.task('watch', function() {
  gulp.watch('./src/assets/css/**/*.css', function() {
    gulp.start('cssInject')
  })
})

gulp.task('cssInject', ['styles'], function() {
  return gulp
    .src('./src/assets/css/styles.css')
    .pipe(postcss([cssDeclarationSorter({ order: 'smacss' })]))
    .pipe(cssnano())
})

function errorInfo(err) {
  console.log(err)
  this.emit('end')
}
