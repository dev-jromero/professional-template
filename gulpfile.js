const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

gulp.task('sass', function(){
    return gulp.src([
        'node_modules/bootstrap/scss/bootstrap.scss', 
        'src/assets/scss/*.scss'
    ])
    .pipe(sass())
    .pipe(gulp.dest('src/assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function(){
    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/popper.min.js'
    ])
    .pipe(gulp.dest('src/assets/js'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], function(){
    browserSync.init({
        server: "./src"
    });
    gulp.watch([
        'node_modules/bootstrap/scss/bootstrap.scss',
        'src/assets/scss/*.scss'], ['sass']);
        gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('fonts', function(){
    return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
    .pipe(gulp.dest('src/assets/fonts'));
});

gulp.task('fontawesome', function(){
    return gulp.src(
        'node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css'
    )
    .pipe(gulp.dest('src/assets/css'));
});

gulp.task('default', ['js', 'serve', 'fontawesome', 'fonts']);