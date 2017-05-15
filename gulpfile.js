var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();



gulp.task('copy-html',() =>{
	gulp.src('./index.html')
		.pipe(gulp.dest('./dist'))
});



/* *************
	CSS
************* */

gulp.task('styles', function() {
	gulp.src(['_css/*.scss','_css/*.css'])
		.pipe(sass().on('error', sass.logError))
		.pipe(
			autoprefixer({
			browsers: ['last 2 versions']
		})
			)
		.pipe(concat('main.css'))
		.pipe(gulp.dest('assets/css'))
		.pipe(browserSync.stream());
});

/* *************
	JS
************* */
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var babel = require('gulp-babel');
var jsFiles = '_js/*.js';

gulp.task('js', function() {
	gulp.src(jsFiles)
		.pipe(
			babel({ presets: ['es2015'] })
			.on('error', gutil.log)
		)
		.pipe(
			concat('main.js')
		)
		.pipe(
			gulp.dest('assets/js')
		);
});

/* *************
	IMG
************* */

gulp.task('compression', function() {
	gulp.src('images/*')
		.pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(
        	gulp.dest('dist/images')
        );
});

gulp.task('copy-images',() =>{
	gulp.src('img/*')
		.pipe(
			gulp.dest('assets/images')
		)
});

gulp.task('default', ['styles','js',], function() {
	gulp.watch('sass/**/*.scss', ['styles']);
	/** 
	browserSync.init({ 
		server: '_site'
	});  
	**/
});