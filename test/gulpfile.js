const gulp = require('gulp'),
    humans = require('../');

(() => {

    'use strict';

    gulp.task('default', () =>
        gulp.src('index.html')
            .pipe(humans({
                thanks: [
                    'Node (@nodejs on Twitter)',
                    'Gulp (@gulpjs on Twitter)'
                ],
                site: [
                    'Standards: HTML5, CSS3',
                    'Components: jQuery, Normalize.css',
                    'Software: Atom'
                ],
                note: 'Built with love by Hayden Bleasel.'
            }))
            .pipe(gulp.dest('./')));

})();
