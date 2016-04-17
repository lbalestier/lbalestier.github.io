var gulp   = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass   = require('gulp-sass');

//Task: Concat javascript
gulp.task('concat-scripts', function(){
  return gulp.src([  //telling gulp where our files live relative to gulpfile.js
    'assets/js/jquery.min.js',
    'assets/js/jquery.poptrox.min.js',
    'assets/js/skel.min.js',
    'assets/js/util.js',
    "assets/js/main.js"
  ])
  .pipe(concat("main.js")) // the output file
  .pipe(gulp.dest('assets/js'));  // new file will go to our js folder

});


//Task: Minify javascript file
gulp.task('minify-scripts', function(){
  return gulp.src('assets/js/production.js')
  .pipe(uglify())
  .pipe(rename('production.min.js')) //piping uglify to rename
  .pipe(gulp.dest('assets/js'));
});



 //Task: Compile Sass to CSS
  gulp.task('compile-sass', function(){
    return gulp.src("assets/css/sass/main.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('assets/css'));
  });


  //Watch task
  gulp.task('watch',function() {
      //anytime of our sass files change, compile!
      gulp.watch('assets/css/sass/**/*.scss',['compile-sass']);
      //anytime our js files change, run concat and minifyScript tasks!
      gulp.watch('assets/js/**.js', ['concat-scripts', 'minify-scripts']);
  });

  //Gulp default task
  gulp.task('default', ['watch']);
