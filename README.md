# Humans Generator [![Build Status](https://travis-ci.org/AlexisTM/humans-generator.svg?branch=master)](https://travis-ci.org/AlexisTM/humans-generator)

Produces a simple, valid humans.txt to be parsed by web crawlers. Adheres to the [specification](http://humanstxt.org/Standard.html) provided by Humanstxt.org. Requires Node 4+. Installed through NPM with:

```shell
npm install humans-generator --save-dev
```

Simply require the module and execute it with some configuration. It can take for each information a String, an Array, an Object or any combinaison of the 3.

The standard propose your those fields:

- header: The ASCII art, default is Humans.txt 
- Team: Shoutouts to your squad.
- Thanks: People you'd like to thank.
- Site: Technical specifications about your site.
- Note: Things you'd like to mention.

```javascript
var humans = require('humans-generator');

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
    
    }, function (error, humans) {
    if(error)  console.log(error);
    else console.log(humans.join('\n'));
});
```

Outputs the following file:

```
  _   _                                  _        _   
 | | | |_   _ _ __ ___   __ _ _ __  ___ | |___  _| |_ 
 | |_| | | | | '_ ` _ \ / _` | '_ \/ __|| __\ \/ / __|
 |  _  | |_| | | | | | | (_| | | | \__ \| |_ >  <| |_ 
 |_| |_|\__,_|_| |_| |_|\__,_|_| |_|___(_)__/_/\_\\__|
                                                      

/* TEAM */
Original developer: Hayden Bleasel
Twitter: @haydenbleasel

Maintainer: Alexis Paques
Github: @AlexisTM

/* THANKS */
Node
Gulp

/* SITE */
Standards: HTML5, CSS3
Components: jQuery, Normalize.css
Softwares: Atom, SublimeText

/* NOTE */
Built with love by Hayden Bleasel.

```

If you need an ES5 build for legacy purposes, just require the ES5 file:

```javascript
var humans = require('humans-generator/es5');
```

To build the ES5 version:

```sh
npm install -g babel-cli
babel --presets es2015 index.js --out-file es5.js
```
