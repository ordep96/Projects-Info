import gulp from 'gulp';
import pug from 'gulp-pug';
import babel from 'gulp-babel';
import postcss from 'gulp-postcss';
import mixins from 'postcss-mixins';
import postFor from 'postcss-for';
import nested from 'postcss-nested';
import colorFunction from 'postcss-color-function';
import customMedia from 'postcss-custom-media';
import cssnext from 'postcss-cssnext';
import postcssImport from 'postcss-import';
import browserSync from 'browser-sync';


let server = browserSync.create();

gulp.task('default',['serve','watch'])


gulp.task('serve', () => {
  server.init({
      server:'./public'
  })

})

gulp.task('watch',() => {
    gulp.watch('./dev/js/app.js',['babel'])
    gulp.watch('./dev/index.pug',['pug'])
    gulp.watch('./dev/css/estilos.css',['css'])
})

gulp.task('babel',() => {
  gulp.src('./dev/js/app.js')
    .pipe(babel())
    .pipe(gulp.dest('./public/js/'))
    .pipe(server.stream())
})


gulp.task('pug',() => {
  gulp.src('./dev/index.pug')
    .pipe(pug({
      pretty:true
    }))
    .pipe(gulp.dest('./public/'))
    .pipe(server.stream())
})


gulp.task('css',() => {
  const procesar = [
    postcssImport(),
    colorFunction(),
    customMedia(),
    mixins(),
    postFor(),
    nested(),
    cssnext({
      features:{
        autoprefixer:{
          grid:true,
        }
      },

      customProperties:false,
    })
  ]

  return gulp.src('./dev/css/estilos.css')
    .pipe(postcss(procesar))
    .pipe(gulp.dest('./public/css/'))
    .pipe(server.stream())
})

