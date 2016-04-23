import gulp from 'gulp';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import cssnext from 'postcss-cssnext';
import rename from 'gulp-rename';
import atimport from 'postcss-import';

const stylesheets = ['static/css/*-cssnext.css', 'static/css/build.css']; 

gulp.task('default', () => {
    
});

gulp.task('css', () => {
    let processors = [
        atimport,
       cssnext
    ];

    gulp.src('static/css/build.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('static/css/'))
});

gulp.task('watch', () => {
    gulp.watch(stylesheets, ['css']);
});

gulp.task('default', ['watch']);
