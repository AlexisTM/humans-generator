# Humans Generator [![Build Status](https://travis-ci.org/haydenbleasel/humans-generator.svg?branch=master)](https://travis-ci.org/haydenbleasel/humans-generator)

Produces a simple, valid humans.txt to be parsed by web crawlers. Adheres to the [specification](http://humanstxt.org/Standard.html) provided by Humanstxt.org. Requires Node 4+. Installed through NPM with:

```shell
npm install humans-generator --save-dev
```

Simply require the module and execute it with an optional array of configuration.

- Team: A string or array of shoutouts to your squad.
- Thanks: A string or array of people you'd like to thank.
- Site: A string or array of technical specifications about your site.
- Note: A string or array of things you'd like to mention.

```js
var humans = require('humans-generator');

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
}, function (error, humans) {
    // Join ('\n') and write this to a file
    console.log(error, humans);
});
```

If you're using Gulp, this module scans your HTML for `<meta name="author" />`. Example usage:

```js
var humans = require('humans-generator').stream;

gulp.task('default', function () {
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
        .pipe(gulp.dest('dist/'));
});
```

If you need an ES5 build for legacy purposes, just require the ES5 file:

```js
var humans = require('humans-generator/es5');
```

Outputs the following file:

```
_   _                                  _        _   
| | | |_   _ _ __ ___   __ _ _ __  ___ | |___  _| |_
| |_| | | | | '_ ` _ \ / _` | '_ \/ __|| __\ \/ / __|
|  _  | |_| | | | | | | (_| | | | \__ \| |_ >  <| |_
|_| |_|\__,_|_| |_| |_|\__,_|_| |_|___(_)__/_/\_\\__|


/* TEAM */
Hayden Bleasel (@haydenbleasel on Twitter)

/* THANKS */
Node (@nodejs on Twitter)
Gulp (@gulpjs on Twitter)

/* SITE */
Standards: HTML5, CSS3
Components: jQuery, Normalize.css
Software: Atom

/* NOTE */
Built with love by Hayden Bleasel.
```

To build the ES5 version:

```sh
npm install -g babel-cli
babel --presets es2015 index.js --out-file es5.js
```
