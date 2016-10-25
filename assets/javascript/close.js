'use strict';

var helpers = require('./helpers');

var NAME = 'close';

var HTML = '<button class="button" role="button" id="close-button">Close<span class="visuallyhidden"> the current window</span></button>';

var closeId = 'close';

var addEventId = 'close-button';

function closeButton(elem) {
    elem.innerHTML = HTML;
    var buttonElem = document.getElementById(addEventId);
    helpers.addEvent(buttonElem, 'click', function (e) {
        helpers.preventDefault(e);
        window.close();
    });
}

function close() {
    var elem = document.getElementById(closeId);
    if (elem && helpers.isJSWindow()) {
        helpers.once(elem, NAME, closeButton);
    }
}

module.exports = close;
