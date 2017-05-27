const humans = require('../es5'),
    fs = require('fs');

(() => {

    'use strict';

    humans({
        team: [{
                    "Original developer": "Hayden Bleasel",
                    Twitter: "@haydenbleasel" 
                },
                {
                    Maintainer: "Alexis Paques",
                    Github: "@AlexisTM"
                }],
        thanks: [
            'Node',
            'Gulp'
        ],
        site:
            {
                'Standards': 'HTML5, CSS3',
                'Components': 'jQuery, Normalize.css',
                'Softwares': 'Atom, SublimeText'
            },
        note: 'Built with love by Hayden Bleasel.'
    }, (error, config) => {
        console.log(error, config);
        fs.writeFile('humans.txt', config.join('\n'), { encoding: 'utf8' }, (error2) =>
            console.log(error2));
    });

})();
