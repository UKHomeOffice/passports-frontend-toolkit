'use strict';

var _ = require('underscore');

var helpers = require('./helpers'),
    inputs, groups,
    toggleAttr = 'data-toggle',
    hiddenClass = 'js-hidden';

function inputClicked(e, target) {
    target = target || helpers.target(e);
    var multipleToggle = {};
    _.each(groups[target.name], function (input) {
        var toggle = document.getElementById(input.getAttribute(toggleAttr));
        if (toggle) {
            if (multipleToggle[toggle.id] === false) {
                multipleToggle[toggle.id] = true;
            } else {
                multipleToggle[toggle.id] = false;
            }

            if (input.checked) {
                input.setAttribute('aria-expanded', 'true');
                toggle.setAttribute('aria-hidden', 'false');
                helpers.removeClass(toggle, hiddenClass);
            } else {
                input.setAttribute('aria-expanded', 'false');
                toggle.setAttribute('aria-hidden', 'true');
                helpers.addClass(toggle, hiddenClass);

                if (e && target.getAttribute(toggleAttr) === toggle.id && multipleToggle[toggle.id]) {
                    toggle.setAttribute('aria-hidden', 'false');
                    helpers.removeClass(toggle, hiddenClass);
                }
            }
        }
    });
}

function setupReveal(input) {
    var toggleId = input.getAttribute(toggleAttr),
        toggle = document.getElementById(toggleId);

    if (toggle) {
        input.setAttribute('aria-controls', toggleId);
        inputClicked(null, input);
    }
    helpers.addEvent(input, 'click', inputClicked);
}

function progressiveReveal() {
    var forms = document.getElementsByTagName('form'),
        input;

    if (forms.length > 0) {
        inputs = document.getElementsByTagName('input');
        groups = _.groupBy(inputs, 'name');
        for (var i = 0, num = inputs.length; i < num; i++) {
            input = inputs[i];
            if (input.type.match(/radio|checkbox/)) {
                helpers.once(input, 'progressive-reveal', setupReveal);
            }
        }
    }
}

module.exports = progressiveReveal;
