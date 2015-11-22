const gulp = require('gulp'),
    humans = require('../').stream;

(() => {

    'use strict';

    gulp.task('default', () =>
        gulp.src('index.html')
            .pipe(humans({
                thanks: 'Hayden Bleasel (@haydenbleasel on Twitter)',
                note: 'Built with love by Hayden Bleasel.'
            }))
            .pipe(gulp.dest('stream/')));

})();
