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
            site: null,
            note: null,
            out: 'humans.txt',
            callback: null
        }),
            config = "";

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

        figlet(options.header, function (err, data) {
            if (err) {
                console.dir(err);
            } else {
                config += data + '\n\n';
            }

            add('TEAM', options.team);
            add('THANKS', options.thanks);
            add('SITE', options.site);
            add('NOTE', options.note);

            fs.writeFile(options.out, config, function (err) {
                if (options.callback) {
                    return options.callback(err, 'Generated humans.txt');
                }
            });

        });

    };

}());
