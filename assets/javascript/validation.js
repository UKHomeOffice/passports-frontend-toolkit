'use strict';

var _ = require('underscore');
var helpers = require('./helpers');
var NAME = 'VALIDATION';

function clicked(e) {
  var elem = helpers.target(e);

  var groupId = elem.getAttribute('href').replace(/^#/, '');
  var group = document.getElementById(groupId);
  var inputs;

  if (group) {
    if (group.getElementsByTagName('input').length) {
      inputs = group.getElementsByTagName('input');
    } else if (group.getElementsByTagName('textarea').length) {
      inputs = group.getElementsByTagName('textarea');
    } else if (group.getElementsByTagName('select').length) {
      inputs = group.getElementsByTagName('select');
    }

    if (inputs) {
      inputs[0].focus();
    }
  }
}

function pressed(e) {
  // Allow the spacebar to trigger the same behaviour
  if (e.keyCode === 32) {
    clicked(e);
  }
}

function setup(summary) {
  summary.focus();

  var errors = summary.getElementsByTagName('a');

  _.each(errors, function addErrorEvents(error) {
    helpers.addEvent(error, 'click', clicked);
    helpers.addEvent(error, 'keydown', pressed);
  });
}

function validation() {
  var summaries = helpers.getElementsByClass(document.getElementById('content'), 'div', 'validation-summary');

  if (summaries.length) {
    var summary = summaries[0];

    helpers.once(summary, NAME, function setupSummary(sum) {
      setup(sum);
    });
  }
}

module.exports = validation;
