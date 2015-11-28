'use strict';

var path = require('path'),
    figlet = require('figlet'),
    _ = require('underscore'),
    cheerio = require('cheerio'),
    async = require('async'),
    through2 = require('through2'),
    File = require('vinyl');

(function () {
    'use strict';

    function humans(params, next) {

        var options = _.defaults(params || {}, {
            header: 'Humans.txt',
            team: null,
            thanks: null,
            site: null,
            note: null
        }),
            configuration = [];

        next = next || function callback() {
            return true;
        };

        function add(name, object) {
            configuration.push('\n/* ' + name + ' */');
            if (typeof object === 'string') {
                configuration.push(object);
            } else if (Array.isArray(object)) {
                _.each(object, function (obj) {
                    return configuration.push(obj);
                });
            } else {
                return next(new Error('Object type for ' + name + ' is not a string or array.'));
            }
        }

        async.waterfall([function (callback) {
            return figlet(options.header, function (error, data) {
                return callback(error, data);
            });
        }, function (data, callback) {
            configuration.push('' + data);

            _.each(['team', 'thanks', 'site', 'note'], function (name) {
                if (options[name]) {
                    add(name.toUpperCase(), options[name]);
                }
            });
            callback(null);
        }], function (error) {
            return next(error, configuration);
        });
    }

    function stream(params) {

        params = params || {};

        return through2.obj(function (file, enc, callback) {

            var $ = cheerio.load(file.contents.toString());

            if (file.isNull()) {
                return callback(null, file);
            }

            if (file.isStream()) {
                return callback(new Error('Streaming not supported'));
            }

            if (!params.team) {
                params.team = $('meta[name="author"]').attr('content');
            }

            humans(params, function (error, config) {
                return callback(error, new File({
                    path: path.join(file.cwd, 'humans.txt'),
                    contents: new Buffer(config.join('\n'))
                }));
            });
        });
    }

    module.exports = humans;
    module.exports.stream = stream;
})();
