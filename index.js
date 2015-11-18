/*jslint node:true, nomen:true*/

(function () {

    'use strict';

    var fs = require('fs'),
        path = require('path'),
        figlet = require('figlet'),
        _ = require('underscore'),
        cheerio = require('cheerio'),
        async = require('async'),
        mkdirp = require('mkdirp');

    module.exports = function (params) {

        var options = _.defaults(params || {}, {
            header: 'Humans.txt',
            team: null,
            thanks: null,
            site: null,
            note: null,
            html: null,
            out: null,
            callback: null
        }),
            config = [],
            file = 'humans.txt',
            tag = '<link rel="author" href="' + file + '" />';

        function traverse(object, first) {
            _.each(Object.keys(object), function (val) {
                var indent = '';
                if (typeof object[val] === 'string') {
                    if (!first) {
                        indent += '\t';
                    }
                    config.push(indent + val + ': ' + object[val]);
                } else {
                    config.push(val + ':');
                    traverse(object[val], false);
                }
            });
            config.push('');
        }

        function add(name, object) {
            config.push('/* ' + name + ' */');
            if (typeof object === 'string') {
                config.push(object);
                config.push('\n');
            } else if (Array.isArray(object)) {
                _.each(object, function (obj) {
                    config.push(obj);
                });
                config.push('\n');
            } else {
                traverse(object, true);
            }
        }

        function writeTags(callback) {
            async.waterfall([
                function (callback) {
                    fs.readFile(options.html, { encoding: 'utf8' }, function (error, data) {
                        callback(error, data);
                    });
                },
                function (data, callback) {
                    var $ = cheerio.load(data, { decodeEntities: false }),
                        target = $('head').length > 0 ? $('head') : $.root();
                    $('link[rel="author"]').remove();
                    target.append(tag);
                    callback(null, $.html());
                }
            ], function (error, html) {
                return callback(error, html.replace(/^\s*[\r\n]/gm, ''));
            });
        }

        async.waterfall([
            function (callback) {
                figlet(options.header, function (error, data) {
                    callback(error, data);
                });
            },
            function (data, callback) {
                config.push(data + '\n');

                if (options.team) {
                    add('TEAM', options.team);
                }

                if (options.thanks) {
                    add('THANKS', options.thanks);
                }

                if (options.site) {
                    add('SITE', options.site);
                }

                if (options.note) {
                    add('NOTE', options.note);
                }

                callback(null);
            },
            function (callback) {
                if (options.out) {
                    mkdirp(path.dirname(options.out), function (error) {
                        callback(error);
                    });
                } else {
                    callback(null);
                }
            },
            function (callback) {
                if (options.out) {
                    fs.writeFile(options.out, config.join('\n'), function (error) {
                        callback(error, config.join('\n'));
                    });
                } else {
                    callback(null, config.join('\n'));
                }
            },
            function (config, callback) {
                if (options.html && options.html !== '') {
                    writeTags(function (error2, html) {
                        fs.writeFile(options.html, html, function (error) {
                            callback(error || error2, config, html);
                        });
                    });
                } else {
                    callback(null, config, tag);
                }
            }
        ], function (error, config, html) {
            if (options.callback) {
                return options.callback(error, config, html);
            }
            return;
        });

    };

}());
