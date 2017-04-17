"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const browserSync = require("browser-sync").create();
const mqpacker = require("css-mqpacker");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const svgmin = require("gulp-svgmin");
const svgstore = require("gulp-svgstore");
const run = require("run-sequence");
const del = require("del");
const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");
const cheerio = require("gulp-cheerio");
const ghPages = require('gulp-gh-pages');


// ЗАДАЧА: Сборка стилей
gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 versions"
      ]}),
      mqpacker({
        sort: false
      })
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(browserSync.stream())
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"));
});

// ЗАДАЧА: Копирование изображений
gulp.task("img", function () {
  return gulp.src("img/*.{gif,png,jpg,jpeg,svg}")
    .pipe(plumber())
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest("build/img"));
});

// ЗАДАЧА: Сборка SVG-спрайта
gulp.task("svgstore", function (callback) {
  let spritePath = "img/svg-sprite";
  if(fileExist(spritePath) !== false) {
    return gulp.src(spritePath + "/*.svg")
      .pipe(svgmin(function (file) {
        return {
          plugins: [{
            cleanupIDs: {
              minify: true
            }
          }]
        }
      }))
      .pipe(svgstore({ inlineSvg: true }))
      .pipe(cheerio(function ($) {
        $("svg").attr("style",  "display:none");
      }))
      .pipe(rename("sprite-svg.svg"))
      .pipe(gulp.dest("build/img/"));
  }
  else {
    console.log("Нет файлов для сборки SVG-спрайта");
    callback();
  }
});

// ЗАДАЧА: Копирование шривтов, скриптов и html
gulp.task("copy", function() {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "js/**",
    "*.html"
  ], {
    base: "."
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("build", function(fn) {
  run(
    "clean",
    "copy",
    "style",
    "img",
    "svgstore",
    fn
  );
});

gulp.task("html:copy", function() {
  return gulp.src("*.html")
    .pipe(gulp.dest("build"));
});

gulp.task("html:update", ["html:copy"], function(done) {
  browserSync.reload();
  done();
});

gulp.task("serve", ["style"], function() {
  browserSync.init({
    server: "build",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html", ["html:update"]);
});

gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});

// ЗАДАЧА: Задача по умолчанию
gulp.task("default", ["serve"]);

// Проверка существования файла/папки
function fileExist(path) {
  const fs = require("fs");
  try {
    fs.statSync(path);
  } catch(err) {
    return !(err && err.code === "ENOENT");
  }
}
