import gulp from 'gulp';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import cssnext from 'postcss-cssnext';
import rename from 'gulp-rename';
import atimport from 'postcss-import';
import babel from 'gulp-babel';
import concat from 'gulp-concat';

const stylesheets = ['static/css/*-cssnext.css', 'static/css/build.css']; 

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

gulp.task('js', () => {
    gulp.src(['static/js/highlight.pack.js', 'static/js/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('static/js/'));
});

gulp.task('watch', () => {
    gulp.watch(stylesheets, ['css']);
});

gulp.task('default', ['watch']);
