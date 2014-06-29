/*jslint devel:true*/
/*global module, require*/

(function () {

    'use strict';

    var fs = require('fs'),
        defaults = require('lodash.defaults'),
        figlet = require('figlet');

    module.exports = function (params) {

        var options = defaults(params || {}, {
            header: 'Humans.txt',
            team: null,
            thanks: null,
            site: {
                standards: null,
                components: null,
                software: null
            },
            out: 'humans.txt',
            callback: null
        }),
            config = "",
            i,
            traverse = function (object) {
                /*Object.keys(object).forEach(function (val) {
                    if (Object.keys(object[val])) {
                        config += val + ':';
                        config += '\n\t' + traverse(val);
                    } else {
                        config += '\n\t' + val + ': ' + object[val];
                    }
                });*/

                config += '\n';
            },
            add = function (name, object) {
                if (object) {
                    config += '/* ' + name + ' */\n';
                    if (typeof object === 'string') {
                        config += object + '\n';
                    } else if (Array.isArray(object)) {
                        for (i = 0; i < object.length; i += 1) {
                            config += object[i] + '\n';
                        }
                    } else {
                        traverse(object);
                    }
                    config += '\n';
                }
            };

        figlet('Hayden Bleasel', function (err, data) {
            if (err) {
                console.dir(err);
            } else {
                config += data + '\n\n';
            }

            add('TEAM', options.team);
            add('THANKS', options.thanks);
            add('SITE', options.site);

            fs.writeFile(options.out, config, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Generated humans.txt');
                }
                if (options.callback) {
                    return options.callback();
                }
            });

        });

    };

}());
