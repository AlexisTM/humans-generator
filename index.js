/*jslint node:true, nomen:true*/

(function () {

    'use strict';

    var fs = require('fs'),
        path = require('path'),
        figlet = require('figlet'),
        _ = require('underscore'),
        async = require('async'),
        metaparser = require('metaparser'),
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
                var indent = "";
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
        }

        function add(name, object) {
            config.push('\n/* ' + name + ' */');
            if (typeof object === 'string') {
                config.push(object);
            } else if (Array.isArray(object)) {
                _.each(object, function (obj) {
                    config.push(obj);
                });
            } else {
                traverse(object, true);
            }
        }

        function writeTags(callback) {
            metaparser({
                source: options.html,
                add: tag,
                remove: 'link[rel="author"]',
                out: options.html,
                callback: function (error, html) {
                    if (error) {
                        throw error;
                    }
                    return callback(html);
                }
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
                    writeTags(function (html) {
                        fs.writeFile(options.html, html, function (error) {
                            callback(error, config, html);
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
