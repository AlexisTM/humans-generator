'use strict';

var humans = require('humans-generator').stream;

(function () {
    'use strict';

    module.exports = function (params) {
        return humans(params);
    };
})();
