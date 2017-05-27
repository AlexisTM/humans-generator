'use strict';

const path = require('path'),
    figlet = require('figlet'),
    _ = require('underscore'),
    cheerio = require('cheerio'),
    async = require('async'),
    through2 = require('through2'),
    File = require('vinyl');

(function () {

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
            stringify(object, '', false)
        }

        function stringify(object, prepend, isNotFirst){
            prepend = prepend || ''
            if (typeof object === 'string') {
                configuration.push(prepend + object)
            } else if (Array.isArray(object)) {
                _.each(object, function(obj, index) { stringify(obj, '', index)}); //console.log(obj, b));//
            } else if (object instanceof Object){
                if (isNotFirst) configuration.push("")
                _.each(object, function(value, key) {
                    stringify(value, `${ key }: `, true)
                })
            } else {
                return next(new Error(`Object type for ${ name } is not a string, an array nor an Object.`));
            }
        }

        async.waterfall([
            function (callback) {
                figlet(options.header, function(error, data) {
                    callback(error, data)})
            },
            function (data, callback) {
                console.log(options); 
                configuration.push(`${ data }`);
                _.each(Object.keys(options), function(name) {
                    if (name != 'header')
                    if (options[name]) {
                        add(name.toUpperCase(), options[name]);
                    }
                    
                });
                configuration.push("");
                callback(null);
            },
        ], function(error){
				next(error, configuration)
    		});
    }

    function stream (params) {

        params = params || {};

        return through2.obj(function (file, enc, callback) {

            const $ = cheerio.load(file.contents.toString());

            if (file.isNull()) {
                return callback(null, file);
            }

            if (file.isStream()) {
                return callback(new Error('Streaming not supported'));
            }

            if (!params.team) {
                params.team = $('meta[name="author"]').attr('content');
            }

            humans(params, function(error, config){                 
            		callback(error, new File({
                    path: path.join(file.cwd, 'humans.txt'),
                    contents: new Buffer(config.join('\n'))
                }))});

        });

    }

    module.exports = humans;
    module.exports.stream = stream;

})();
