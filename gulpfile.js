var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');

gulp.task('default', ['browser-sync'], () => {
});

gulp.task('nodemon', function (cb) {

    var started = false;
    return nodemon({
        exec: 'node-inspector & node --debug',
        ignore: ['.vscode/*', 'node_modules/*'],
        script: 'app.js',
        debug: true
    }).on('start', () => {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true;
        }
    });
});

gulp.task('sync', ['nodemon'], () => {
    browserSync.init(null, {
        proxy: "http://localhost:4501",
        files: ["**/*.*"],
        port: 4500,
    });
});
