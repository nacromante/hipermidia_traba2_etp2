const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const htmlReplace = require('gulp-html-replace');
const cleanCSS = require('gulp-clean-css');
//const browserSync = require('browser-sync');
const csslint = require('gulp-csslint');
//const gulpif = require('gulp-if');
//const sprity = require('sprity');
const inlinesource = require('gulp-inline-source');
//const Hapi = require('hapi');
//const connect = require('gulp-connect');
const express = require('express');


gulp.task('default', ['copy'], function() {
    gulp.start('build-img', 'merge-css', 'html-replace', 'inlinesource', 'server');
})

gulp.task('copy', ['clean'] ,  function() {

   return gulp.src('src/**/*')
              .pipe(gulp.dest('dist') );
});



gulp.task('clean', function() {
   return gulp.src('dist')
              . pipe(clean() );

});

gulp.task('build-img',  function() {
    gulp.src('src/imagens/**/*')
        .pipe(imagemin() )
        .pipe(gulp.dest('dist/imagens') );

});

gulp.task('merge-css', function() {
    gulp.src(['dist/css/font-awesome.min.css',
              'dist/css/main.css'
             ])
        .pipe(concat('site.css') )
        .pipe(cleanCSS() )
        .pipe(gulp.dest('dist/css') );
 });

 gulp.task('html-replace', function() {
    gulp.src('dist/*.html')
    .pipe(htmlReplace({css:'css/site.css'}) )
    .pipe(gulp.dest('dist') );
 });

  gulp.task('browser-sync', function() {
     browserSync.init({
         server: {
             baseDir: 'src'
         }
     });
     gulp.watch('src/**/*')
         .on('change',  browserSync.reload );        

 });

 gulp.task('css-observer', function() {
  gulp.src('src/css/*.css')
    .pipe(csslint() )
    .pipe(csslint.formatter() );
});

 //gulp.task('sprites', function () {
 // return sprity.src({
 //  src: './src/imagens/**/*.{png,jpg}',
 //   style: './sprite.css'
    // ... other optional options
    // for example if you want to generate scss instead of css
    
 //})
 // .pipe(gulpif('*.png', gulp.dest('./dist/imagens/'), gulp.dest('./dist/css/')))
//});


 
gulp.task('inlinesource', function () {
    return gulp.src('src/*.html')
        .pipe(inlinesource())
        .pipe(gulp.dest('dist'));
});


//var port = process.env.PORT || 4040;
//var httpServer = require('http').createServer(app);
//httpServer.listen(port, function() {
//  console.log('sistema running on port ' + port + '.');
//});

//gulp.task('serveprod', function() {
//  console.log('porta '+process.env.PORT);
//  connect.server({
//    root: 'dist',
//    port: process.env.PORT || 15506, // localhost:5000
//    livereload: false
//  });
//});

//const server = Hapi.Server({ port: 3000, host: 'localhost' });

gulp.task('server', function () {
  var app = express()
  .use(express.static(__dirname + '/dist/'))
  .listen(process.env.PORT || 5000);
  console.log('passou server')
});
