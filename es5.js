'use strict';

var humans = require('humans-generator/es5').stream;

(function () {
    'use strict';

    module.exports = function (params) {
        return humans(params);
    };
})();
