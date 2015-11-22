const humans = require('../'),
    fs = require('fs');

(() => {

    'use strict';

    humans({
        team: 'Hayden Bleasel (@haydenbleasel on Twitter)',
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
    }, (error, config) => {
        console.log(error, config);
        fs.writeFile('humans.txt', config.join('\n'), { encoding: 'utf8' }, (error2) =>
            console.log(error2));
    });

})();
