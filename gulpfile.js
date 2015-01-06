'use strict';

var es          = require('event-stream'),
  gulp          = require('gulp'),
  gulpif        = require('gulp-if'),
  bless         = require('gulp-bless'),
  concat        = require('gulp-concat'),
  rename        = require('gulp-rename'),
  less          = require('gulp-less'),
  uglify        = require('gulp-uglify'),
  jshint        = require('gulp-jshint'),
  jshintstylish = require('jshint-stylish'),
  connect       = require('gulp-connect'),
  mustache      = require('gulp-mustache'),
  views         = require('./views/views'),
  ngmin         = require('gulp-ngmin'),
  templateCache = require('gulp-angular-templatecache'),
  bower         = require('gulp-bower'),
  clean         = require('gulp-clean'),
  markdown      = require('gulp-markdown'),
  autoprefixer  = require('gulp-autoprefixer'),
  plumber       = require('gulp-plumber'),
  cheerio       = require('gulp-cheerio');

require('gulp-grunt')(gulp, {
  prefix: 'grunt-tasks-'
});

var Tasks = {
  BoomstrapJavascriptVendor:  'Javascript Vendor Libraries',
  BoomstrapJavascriptAngular: 'Boomstrap Angular Module',
  BoomstrapAngularTemplates:  'Boomstrap Angular Templates',
  BoomstrapJavascript:        'Boomstrap Javascript Distributable',

  BoomstrapStylesDev:         'Compile Less Files for Development Server',
  BoomstrapStylesDist:        'Compile Less Files for Distribution',
  BoomstrapStyles:            'Compile Less Files',

  CreateDocumentationHTML:    'Create Documentation HTML Files',
  JavascriptDocumentation:    'Convert Javascript Documentation Markdown',

  DevelopmentServer:          'server',
  ReloadDevelopmentJS:        'Reload Development Server Javascript',
  ReloadDevelopmentHTML:      'Reload Development Server HTML',
  ReloadDevelopmentStyles:    'Reload Development Server Styles',

  Boomstrap:                  'Build Tasks'
};


gulp.task(Tasks.BoomstrapJavascriptVendor, function() {
  return gulp.src([
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/jquery-mousewheel/jquery.mousewheel.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/bootstrap-tour/build/js/bootstrap-tour.min.js',
    'bower_components/bootstrap-select/js/bootstrap-select.js',
    'js/bootstrap-datepicker-custom.js',
    'js/bootstrap-datepicker-override.js',
    'vendor/chosen/chosen.jquery.min.js',
    'bower_components/baron/baron.min.js',
    'bower_components/momentjs/min/moment.min.js',
    'js/vendor-config.js',
    'bower_components/angular/angular.min.js',
    'bower_components/angular/angular-animate.min.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
    'bower_components/angular-ui-select/dist/select.js',
    'bower_components/angular-moment/angular-moment.min.js',
    'bower_components/boomqueries/dist/js/boomqueries.min.js',
    'js/element-queries.js',
    'js/global.js'
  ])
  .pipe(concat('boomstrap.js'))
  .pipe(gulp.dest('docs/js/'))
  .pipe(gulp.dest('dist/js/'))
  .pipe(rename({ suffix:'.min' }))
  .pipe(uglify({ mangle: false, outSourceMap: true }))
  .pipe(gulp.dest('docs/js/'))
  .pipe(gulp.dest('dist/js/'));
});

gulp.task(Tasks.BoomstrapJavascriptAngular, function() {
  return gulp.src(['app/app.js', 'app/constants.js', 'app/scripts/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(jshintstylish))
    .pipe(ngmin())
    .pipe(concat('boomstrap-angular.js'))
    .pipe(gulp.dest('docs/js/'));
});

gulp.task(Tasks.BoomstrapAngularTemplates, function() {
  return es.concat(
    gulp.src(['app/template/**/*.html', '!app/template/pagination/*.html'])
      .pipe(templateCache({
        module: 'boomstrap',
        root: 'template'
      })),
    gulp.src('app/template/bootstrap/**/*.html')
      .pipe(templateCache({
        module: 'ui.bootstrap',
        root: 'template/'
      }))
  )
  .pipe(concat('boomstrap-angular-templates.js'))
  .pipe(gulp.dest('docs/js/'));
});

gulp.task(Tasks.BoomstrapJavascript,
  [
    Tasks.BoomstrapJavascriptVendor,
    Tasks.BoomstrapJavascriptAngular,
    Tasks.BoomstrapAngularTemplates
  ], function() {
  // Combine templates and angular
  return gulp.src(['docs/js/boomstrap-angular.js', 'docs/js/boomstrap-angular-templates.js'])
    .pipe(concat('boomstrap-angular.js'))
    .pipe(gulp.dest('docs/js/'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(rename({ suffix:'.min' }))
    .pipe(uglify({ mangle: false, outSourceMap: true  }))
    .pipe(gulp.dest('docs/js/'))
    .pipe(gulp.dest('dist/js/'));
});


/*
 * Create html files
 */
gulp.task(Tasks.CreateDocumentationHTML, function() {
  return es.concat.apply(es,
    Object.keys(views).map(function(key) {
      var sources = [],
        idLinks = [],
        src = views[key];

      // Retrieve the ids and Headers
      // for each item we are concatenating
      src.sources.forEach(function(view) {
        if (view.css_id){
          idLinks.push({
            css_id: view.css_id,
            nav_header: view.nav_header
          });
        }

        sources.push(view.source);
      });

      var sourceFiles = ['views/partials/header.html'];
      sourceFiles.push.apply(sourceFiles, sources);
      sourceFiles.push.apply(sourceFiles, [
        'views/partials/sub_nav.tpl.html',
        'views/partials/footer.html'
      ]);

      return gulp.src(sourceFiles)
        .pipe(
          gulpif(
            /(header|sub_nav\.tpl)\.html/,
            mustache({
              page_title: src.header,
              header:     src.header,
              link:       idLinks
            })
          )
        )
        .pipe(concat(key + '.html'));
    })
  ).pipe(gulp.dest('docs/'));
});

/*
 * Create html files from markdown
 */
gulp.task(Tasks.JavascriptDocumentation, function() {
  var highlight = require('highlight.js');

  gulp.src(['app/documentation/scripts/directives/**'])
    .pipe(markdown({
      highlight: function(code) {
        return highlight.highlightAuto(code).value;
      }
    }))
    .pipe(concat('apiBody.html'))
    .pipe(cheerio({
      run: function($) {
        // Make tables bootstrap-y
        $('table').addClass('table table-bordered');

        // Blockquotes are callouts
        $('blockquote').addClass('callout callout-info');

        // $('pre > code').map(function() {
        //   var $code = $(this).html();
        //   var highlightedCode = highlight.highlightAuto($code).value;
        //   $(this).html(highlightedCode);
        //   return $(this).html();
        // });
      }
    }))
    .pipe(gulp.dest('views/javascript/'));
});


gulp.task(Tasks.ReloadDevelopmentJS, function() {
 gulp.src('docs/js/*.js')
 .pipe(connect.reload());
});

gulp.task(Tasks.ReloadDevelopmentStyles, function() {
  gulp.src('docs/css/**/*.css')
  .pipe(connect.reload());
});

/*
 * Dynamically reload connect website when html changes
 */
gulp.task(Tasks.ReloadDevelopmentHTML, function() {
  gulp.src('docs/**/*.html')
    .pipe(connect.reload());
});

gulp.task(Tasks.BoomstrapStylesDev, function() {
  var DEST_DIR  = 'docs/css';
  var DEST_FILE = 'boomstrap.css';

  return gulp.src([
    'less/boomstrap.less',
    'less/boomstrap-docs.less'
  ])
    .pipe(plumber())
    .pipe(concat(DEST_FILE))
    .pipe(less({ compress: false }))
    .pipe(plumber.stop())
    .pipe(autoprefixer({ browsers: ['last 2 versions','ie 9'], cascade: false }))
    .pipe(gulp.dest(DEST_DIR))
    .pipe(bless({ imports: false }))
    .pipe(gulp.dest('docs/css/splitcss/'));
});

gulp.task(Tasks.BoomstrapStylesDist, function() {
  var DEST_DIR  = 'dist/css';

  return gulp.src([
    'less/boomstrap.less'
  ])
    .pipe(less({ compress: false })) // compressing will screw up importing as 'less' in other projects
    .pipe(autoprefixer({ browsers: ['last 2 versions','ie 9'], cascade: false }))
    .pipe(gulp.dest(DEST_DIR));
});

gulp.task(Tasks.BoomstrapStyles, [Tasks.BoomstrapStylesDev, Tasks.BoomstrapStylesDist]);

/*
* Common build task run by all tasks
*/
gulp.task(Tasks.Boomstrap, [Tasks.BoomstrapStyles, Tasks.BoomstrapJavascript, Tasks.CreateDocumentationHTML, Tasks.JavascriptDocumentation], function() {
  var IMAGES_DIR   = 'docs/images',
  FONTS_DOCS_DIR = 'docs/css/fonts',
  FONTS_DIST_DIR = 'dist/css/fonts';

  // Copy all image/font files if they are newer than destination
  return es.concat(
    gulp.src('images/**/*.*')
    .pipe(gulp.dest(IMAGES_DIR)),
    gulp.src('fonts/**/*.*')
    .pipe(gulp.dest(FONTS_DOCS_DIR)),
    gulp.src('fonts/**/*.*')
    .pipe(gulp.dest(FONTS_DIST_DIR))
  );
});

gulp.task('clean', function() {
  return gulp.src(['docs/', 'dist/'], { read: false })
    .pipe(clean());
});

gulp.task('bower', function() {
  return bower();
});



// Run a server with a watch with gulp server
gulp.task(Tasks.DevelopmentServer, [Tasks.Boomstrap], function() {
  gulp.run('grunt-tasks-ngdocs');
  // gulp.run('angularAPI');
  connect.server({
    hostname: 'localhost',
    port: 9000,
    root: 'docs',
    keepalive: false,
    livereload: true
  });

  // Watch Less files
  gulp.watch(['less/**/*.less'], [Tasks.BoomstrapStylesDev, Tasks.ReloadDevelopmentStyles]);



  // Watch Javascript Files and Templates
  gulp.watch([
    'bower_components/**/*.js',
    'js/**/*.js',
    'app/**/*.js',
    'app/template/**/*.html'
  ], [Tasks.BoomstrapJavascript, Tasks.ReloadDevelopmentJS]);

  // Watch html files
  gulp.watch(
    ['app/views/*.html', 'views/**/*.html'],
    [Tasks.CreateDocumentationHTML, Tasks.ReloadDevelopmentHTML]
  );
});

/*
 * +==============+
 * =              =
 * = Public Tasks =
 * =              =
 * +==============+
 */
// Just run compilation by default
gulp.task('default', [Tasks.Boomstrap]);

// Deploy to our github pages page
gulp.task('website', function() {
  // Run our gulp tasks
  gulp.run('grunt-tasks-ngdocs');
  return gulp.run('grunt-tasks-gh-pages');
});
