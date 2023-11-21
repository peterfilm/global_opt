"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const postcss = require("gulp-postcss");

const paths = {
  src: "./src",
  dist: "./dist",
};

gulp.task("copy-html", () => {
    return gulp.src(`${paths.src}/index.html`)
                .pipe(gulp.dest(`${paths.dist}`))
                .pipe(browsersync.stream());
});

gulp.task("build-sass", () => {
    return gulp.src(`${paths.src}/sass/style.scss`)
                .pipe(sass().on('error', sass.logError))
                .pipe(gulp.dest(`${paths.dist}`))
                .pipe(browsersync.stream());
});

gulp.task("build-js", () => {
    return gulp.src(`${paths.src}/js/main.js`)
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'script.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(`${paths.dist}`))
                .on("end", browsersync.reload);
});

gulp.task("watch", () => {
    browsersync.init({
		server: `${paths.dist}/`,
		port: 4000,
		notify: true
    });
    
    gulp.watch(`${paths.src}/index.html`, gulp.parallel("copy-html"));
    gulp.watch(`${paths.src}/js/**/*.js`, gulp.parallel("build-js"));
    gulp.watch(`${paths.src}/sass/**/*.scss`, gulp.parallel("build-sass"));
    gulp.watch(`${paths.src}/assets/**/*.*`, gulp.parallel("copy-assets"));
});

gulp.task("copy-assets", () => {
  return gulp.src(`${paths.src}/assets/**/*.*`) 
      .pipe(gulp.dest(`${paths.dist}/assets/`))
      .on("end", browsersync.reload);
});

gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-js", "build-sass"));



gulp.task("prod", () => {
    gulp.src(`${paths.src}/sass/style.scss`)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(cleanCSS())
        .pipe(gulp.dest(`${paths.dist}`));

    return gulp.src(`${paths.src}/js/main.js`)
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(`${paths.dist}`));
});

gulp.task("default", gulp.parallel("watch", "build"));