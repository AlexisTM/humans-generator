# Humans Generator [![Build Status](https://travis-ci.org/AlexisTM/humans-generator.svg?branch=master)](https://travis-ci.org/AlexisTM/humans-generator)

Produces a simple, valid humans.txt to be parsed by web crawlers. Adheres to the [specification](http://humanstxt.org/Standard.html) provided by Humanstxt.org. Requires Node 4+. Installed through NPM with:

```shell
npm install humans-generator --save-dev
```

Simply require the module and execute it with an optional array of configuration.

- Team: A string or array of shoutouts to your squad.
- Thanks: A string or array of people you'd like to thank.
- Site: A string or array of technical specifications about your site.
- Note: A string or array of things you'd like to mention.

```javascript
var humans = require('humans-generator');

humans({
    team: [
        'Hayden Bleasel (@haydenbleasel on Twitter)',
        'Alexis Paques (@AlexisTM on Github)'
    ],
    thanks: [
        'Node (@nodejs on Twitter)',
        'Gulp (@gulpjs on Twitter)'
    ],
    site: [
        'Standards: HTML5, CSS3',
        'Components: jQuery, Normalize.css',
        'Software: Atom'
    ],
    note: 'Built with love by Hayden Bleasel. Maintained by Alexis Paques.'
}, function (error, humans) {
    // Join ('\n') and write this to a file
    if(error)  console.log(error);
    else console.log(humans.join('\n'));
});
```

If you need an ES5 build for legacy purposes, just require the ES5 file:

```javascript
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
Alexis Paques (@AlexisTM on Github)

/* THANKS */
Node (@nodejs on Twitter)
Gulp (@gulpjs on Twitter)

/* SITE */
Standards: HTML5, CSS3
Components: jQuery, Normalize.css
Software: Atom

/* NOTE */
Built with love by Hayden Bleasel. Maintained by Alexis Paques.
```

To build the ES5 version:

```sh
npm install -g babel-cli
babel --presets es2015 index.js --out-file es5.js
```
