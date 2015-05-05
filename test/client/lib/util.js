var _ = require('underscore');

module.exports = {
    triggerEvent: function triggerEvent(element, event) {
        var evt = document.createEvent('Event');
        evt.initEvent(event, true, true);
        element.dispatchEvent(evt);
    },

    triggerKeyboardEvent: function triggerKeyboardEvent(element, event, options) {
        options = options || {};
        var evt = document.createEvent('Event');
        evt.initEvent(event, true, true);
        _.extend(evt, options);
        element.dispatchEvent(evt);
    }
};
