# gulp-humans [![Build Status](https://travis-ci.org/haydenbleasel/humans-generator.svg?branch=master)](https://travis-ci.org/haydenbleasel/humans-generator)

Humans.txt generator for Gulp. Simple wrapper around [humans-generator](https://github.com/haydenbleasel/humans-generator). Requires Node 4+. Installed through NPM with:

```shell
npm install gulp-humans --save-dev
```

Check out humans-generator for example options. This module scans your HTML for `<meta name="author" />`. Example usage:

```js
var humans = require('gulp-humans');

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
var humans = require('gulp-humans/es5');
```

To build the ES5 version, run the following and remember to require the ES5 version.

```js
npm install -g babel-cli
babel --presets es2015 index.js --out-file es5.js
```
