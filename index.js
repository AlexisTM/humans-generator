const path = require('path'),
    figlet = require('figlet'),
    _ = require('underscore'),
    cheerio = require('cheerio'),
    async = require('async'),
    through2 = require('through2'),
    File = require('vinyl');

(() => {

    'use strict';

    function humans (params, next) {

        const options = _.defaults(params || {}, {
            header: 'Humans.txt',
            team: null,
            thanks: null,
            site: null,
            note: null
        }),
            configuration = [];

        next = next || function callback () {
            return true;
        };

        function add (name, object) {
            configuration.push(`\n/* ${ name } */`);
            if (typeof object === 'string') {
                configuration.push(object);
            } else if (Array.isArray(object)) {
                _.each(object, (obj) => configuration.push(obj));
            } else {
                return next(new Error(`Object type for ${ name } is not a string or array.`));
            }
        }

        async.waterfall([
            (callback) =>
                figlet(options.header, (error, data) =>
                    callback(error, data)),
            (data, callback) => {
                configuration.push(`${ data }`);

                _.each(['team', 'thanks', 'site', 'note'], (name) => {
                    if (options[name]) {
                        add(name.toUpperCase(), options[name]);
                    }
                });
                callback(null);
            }
        ], (error) =>
            next(error, configuration));
    }

    function stream (params) {

        params = params || {};

        return through2.obj((file, enc, callback) => {

            const $ = cheerio.load(file.contents.toString());

            if (file.isNull()) {
                return callback(null, file);
            }

            if (file.isStream()) {
                return callback(new Error('Streaming not supported'));
            }

            params.team = $('meta[name="author"]').attr('content');

            humans(params, (error, config) =>
                callback(error, new File({
                    path: path.join(file.cwd, 'humans.txt'),
                    contents: new Buffer(config.join('\n'))
                })));

        });

    }

    module.exports = humans;
    module.exports.stream = stream;

})();
