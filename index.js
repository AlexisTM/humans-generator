/*jslint devel:true, stupid:true*/
/*global module, require*/

(function () {

    'use strict';

    var fs = require('fs'),
        defaults = require('lodash.defaults'),
        path = require('path'),
        figlet = require('figlet'),
        cheerio = require('cheerio'),
        mkdirp = require('mkdirp');

    module.exports = function (params) {

        var options = defaults(params || {}, {
            header: 'Humans.txt',
            team: null,
            thanks: null,
            site: null,
            note: null,
            out: 'dist',
            callback: null
        }),
            config = "",
            directory = path.normalize(options.out),
            file = directory + '/humans.txt';

        function traverse(object, first) {
            Object.keys(object).forEach(function (val) {
                if (typeof object[val] === 'string') {
                    if (!first) {
                        config += '\t';
                    }
                    config += val + ': ' + object[val] + '\n';
                } else {
                    config += val + ':' + '\n';
                    traverse(object[val], false);
                }
            });
        }

        function add(name, object) {
            var i;
            if (object) {
                config += '\n/* ' + name + ' */\n';
                if (typeof object === 'string') {
                    config += object + '\n';
                } else if (Array.isArray(object)) {
                    for (i = 0; i < object.length; i += 1) {
                        config += object[i] + '\n';
                    }
                } else {
                    traverse(object, true);
                }
            }
        }

        function writeTags(callback) {
            var $, html = '', tag = '<meta name="author" rel="' + file + '" />';
            if (options.html && fs.existsSync(options.html)) {
                $ = cheerio.load(fs.readFileSync(options.html));
                $('link[rel="author"]').remove();
                html = $.html().replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' ');
                if (html === '') {
                    $ = cheerio.load('');
                }
                if ($('head').length > 0) {
                    $("head").append(tag);
                } else {
                    return console.log("HTML has no <head>.");
                }
                return callback($.html());
            }
            return callback(tag);
        }

        figlet(options.header, function (err, data) {

            if (err) {
                console.log(err);
                return;
            }

            config += data + '\n\n';

            add('TEAM', options.team);
            add('THANKS', options.thanks);
            add('SITE', options.site);
            add('NOTE', options.note);

            mkdirp(directory, function (err) {
                if (err) {
                    console.log(err);
                    return;
                }

                fs.writeFile(file, config, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    writeTags(function (data) {
                        if (options.html && options.html !== '') {
                            fs.writeFile(options.html, data, function (err) {
                                if (err) {
                                    return console.log(err);
                                }
                            });
                        }
                        if (options.callback) {
                            return options.callback(err, 'Generated humans.txt', data);
                        }
                    });
                });

            });

        });

    };

}());
