var humans = require('./index.js');
humans({
    team: {
        'Hayden Bleasel': {
            Twitter: '@haydenbleasel',
            Email: 'haydenbleasel@gmail.com',
            Country: 'Australia'
        },
        'Hayden Bleasel 2': {
            Twitter: '@haydenbleasel',
            Email: 'haydenbleasel@gmail.com',
            Country: 'Australia'
        }
    },
    thanks: [
        'Hayden Bleasel (@haydenbleasel on Twitter) <haydenbleasel@gmail.com>',
        'Hayden Bleasel 2 (@haydenbleasel on Twitter) <haydenbleasel@gmail.com>'
    ],
    site: {
        standards: 'HTML5, CSS3',
        components: 'jQuery, Normalize.css',
        software: 'Atom'
    }
});
