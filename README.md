# Humans Generator [![Build Status](https://travis-ci.org/haydenbleasel/humans-generator.svg?branch=master)](https://travis-ci.org/haydenbleasel/humans-generator)

Humans.txt generator for Node.js. Produces a simple, valid humans.txt for you and your team. Installed through NPM with:

```
npm install humans-generator --save-dev
```

Simply require the module and execute it with an optional array of configuration.

- Header: Your website's title to be converted to ASCII art!
- Team: Details about you and your team.
- Thanks: People you'd like to thank.
- Site: Details about the site (standards, components and software);
- Note: A small note to add at the end.
- HTML: Optional file to write metadata link to.
- Out: The destination path.
- Callback: Function to execute upon completion (parameters are 'error', 'data' and 'html').

Team, Thanks, Site and Note can be a String, Array or Hash. Defaults are shown below:

```
var humans = require('humans-generator');

humans({
    header: 'Humans.txt',
    team: null,
    thanks: null,
    site: null,
    note: null,
    html: null,
    out: null,
    callback: null
});
```

Example usage (multi-dimensional hash, array, hash and string):

```
humans({
    'team': {
        'Hayden Bleasel': {
            'Twitter': '@haydenbleasel',
            'Email': 'haydenbleasel@gmail.com',
            'Country': 'Australia'
        }
    },
    'thanks': [
        'Hayden Bleasel (@haydenbleasel on Twitter) <haydenbleasel@gmail.com>'
    ],
    'site': {
        'Standards': 'HTML5, CSS3',
        'Components': 'jQuery, Normalize.css',
        'Software': 'Atom'
    },
    'note': 'Built with love by Hayden Bleasel.'
});
```

This will output the following Humans.txt file:

```
 _   _                                  _        _
| | | |_   _ _ __ ___   __ _ _ __  ___ | |___  _| |_
| |_| | | | | '_ ` _ \ / _` | '_ \/ __|| __\ \/ / __|
|  _  | |_| | | | | | | (_| | | | \__ \| |_ >  <| |_
|_| |_|\__,_|_| |_| |_|\__,_|_| |_|___(_)__/_/\_\\__|


/* TEAM */
Hayden Bleasel:
Twitter: @haydenbleasel
Email: haydenbleasel@gmail.com
Country: Australia

/* THANKS */
Hayden Bleasel (@haydenbleasel on Twitter) <haydenbleasel@gmail.com>

/* SITE */
Standards: HTML5, CSS3
Components: jQuery, Normalize.css
Software: Atom

/* NOTE */
Built with love by Hayden Bleasel.
```
