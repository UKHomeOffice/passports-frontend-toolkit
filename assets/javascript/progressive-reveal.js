'use strict';

var _ = require('underscore');
var helpers = require('./helpers');
var toggleAttr = 'data-toggle';
var hiddenClass = 'js-hidden';
var inputs;
var groups;

function inputClicked(e, target) {
  target = target || helpers.target(e);
  var shown;
  _.each(groups[target.name], function itemClicked(input) {
    var toggle = document.getElementById(input.getAttribute(toggleAttr));
    if (toggle) {
      if (input.checked) {
        input.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-hidden', 'false');
        helpers.removeClass(toggle, hiddenClass);
        shown = toggle.id;
      } else {
        input.setAttribute('aria-expanded', 'false');
        if (shown !== toggle.id) {
          toggle.setAttribute('aria-hidden', 'true');
          helpers.addClass(toggle, hiddenClass);
        }
      }
    }
  });
}

function setupReveal(input) {
  var toggleId = input.getAttribute(toggleAttr);
  var toggle = document.getElementById(toggleId);

  if (toggle) {
    input.setAttribute('aria-controls', toggleId);
    inputClicked(null, input);
  }
  helpers.addEvent(input, 'click', inputClicked);
}

function progressiveReveal() {
  var forms = document.getElementsByTagName('form');
  var input;

  if (forms.length > 0) {
    inputs = document.getElementsByTagName('input');
    groups = _.groupBy(inputs, 'name');
    var i = 0;
    var num = inputs.length;
    for (i; i < num; i++) {
      input = inputs[i];
      if (input.type.match(/radio|checkbox/)) {
        helpers.once(input, 'progressive-reveal', setupReveal);
      }
    }
  }
}

module.exports = progressiveReveal;
