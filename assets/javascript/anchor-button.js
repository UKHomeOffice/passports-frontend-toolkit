'use strict';

var _ = require('underscore');

var helpers = require('./helpers');

function pressed(e) {
    // the space bar should trigger the anchor tag's default behaviour
    if (e.keyCode === 32) {
        helpers.preventDefault(e);
        helpers.target(e).click();
    }
}

function anchorButton() {
    var anchors = document.getElementsByTagName('a');
    _.each(anchors, function (a) {
        if (helpers.hasClass(a, 'button')) {
            helpers.once(a, 'anchor-button', function () {
                a.setAttribute('role', 'button');
                helpers.addEvent(a, 'keydown', pressed);
            });
        }
    });
}

module.exports = anchorButton;
