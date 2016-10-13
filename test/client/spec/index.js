var $ = require('jquery');

describe('hmpo', function () {

    before(function () {
        $(document.body).append($('<div id="test-container"/>'));
    });

    beforeEach(function () {
        $('#test-container').empty();
    });

    require('./spec.helpers');
    require('./spec.form-focus');
    require('./spec.progressive-reveal');
    require('./spec.validation');
    require('./spec.close');
    require('./spec.anchor-button');

});
