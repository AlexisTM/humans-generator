var humans = require('./index.js');
humans({
    team: {
        'Hayden Bleasel': {
            'Twitter': '@haydenbleasel',
            'Email': 'haydenbleasel@gmail.com',
            'Country': 'Australia'
        }
    },
    thanks: [
        'Hayden Bleasel (@haydenbleasel on Twitter) <haydenbleasel@gmail.com>'
    ],
    site: {
        'Standards': 'HTML5, CSS3',
        'Components': 'jQuery, Normalize.css',
        'Software': 'Atom'
    },
    note: 'Built with love by Hayden Bleasel.',
    html: 'test/index.html',
    out: 'test/humans.txt',
    callback: function (error, data, html) {
        console.log(error);
        console.log(data);
        console.log(html);
    }
});
