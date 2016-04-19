'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var config = require('./package.json');
var replace =require('gulp-replace');
 
gulp.task('sass', function () {
  return gulp.src('./public/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./public/css/**/*.scss', ['sass']);
});

gulp.task('cuat', function() {
	var base = config.name;
		var brand = config.brand;
	var nodeModulesUrl = 'http://wpc-stage.com/production/'+brand+'/'+base


	gulp.src('./app/**/*.+(js|html)')
		.pipe(replace('app/', '/javascript/'+base+'/'))
		.pipe(replace('./public/images', '/images/'+base))
		.pipe(replace('<header></header>', ''))
		.pipe(replace(/'\.\/([^']*)'/g, '\'./$1.js\''))
		.pipe(gulp.dest('./cuat/javascript/'+base+'/'))

	gulp.src('./public/css/**/*.css')
		.pipe(replace('../fonts/', ''))
		.pipe(replace('../images/', '/images/'+base+'/'))
		.pipe(replace('../../public/images/', '/images/'+base+'/'))
		.pipe(gulp.dest('./cuat/css/'+base+'/'))

	gulp.src('./public/fonts/**/*')
		.pipe(gulp.dest('./cuat/css/'+base+'/'))

	gulp.src('./public/js/**/*.js')
		.pipe(gulp.dest('./cuat/javascript/'+base+'/'))

	gulp.src('./public/images/**/*')
		.pipe(gulp.dest('./cuat/images/'+base+'/'))

	gulp.src('index.html')
		.pipe(replace('app/','/javascript/'+base+'/'))
		.pipe(replace('node_modules', nodeModulesUrl+'/node_modules'))
		.pipe(replace('./public/js', '/javascript/'+base))
		.pipe(replace('./public/css', '/css/'+base))
		.pipe(replace('./public/images', '/images/'+base))
		.pipe(replace('<html>','')).pipe(replace('</html>',''))
		.pipe(replace('<body>','')).pipe(replace('</body>',''))
		.pipe(replace('<head>','')).pipe(replace('</head>',''))
		.pipe(replace(/<title>.*<\/title>/g, ''))
		.pipe(gulp.dest('./cuat'))
});

gulp.task('default', ['sass', 'sass:watch']);