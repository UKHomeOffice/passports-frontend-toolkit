'use strict';

var _ = require('underscore');
var DESKTOP_WIDTH = 769;
var helpers = {};

helpers.documentReady = function documentReady(callback) {
  this.addEvent(document, 'DOMContentLoaded', callback);
  this.addEvent(window, 'load', callback);
};

helpers.addEvent = function addEvent(el, type, callback) {
  if (el.addEventListener) {
    el.addEventListener(type, callback, false);
  } else if (el.attachEvent) {
    el.attachEvent('on' + type, callback);
  }
};

helpers.removeEvent = function removeEvent(el, type, callback) {
  if (el.removeEventListener) {
    el.removeEventListener(type, callback, false);
  } else if (el.detachEvent) {
    el.detachEvent('on' + type, callback);
  }
};

helpers.target = function target(e) {
  return e.target || e.srcElement;
};

/**
* Cross-browser trigger event method
*/
helpers.triggerEvent = function triggerEvent(el, type) {
  var evt;

  if (document.createEvent) {
    evt = new Event(type);
    el.dispatchEvent(evt);
  } else {
    evt = document.createEventObject();
    el.fireEvent('on' + type, evt);
  }
};

helpers.preventDefault = function preventDefault(e) {
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    event.returnValue = false;
  }
};

/*
** Check if an element has a class name
***/
helpers.hasClass = function hasClass(el, className) {
  if (el.className.split(/\s/).indexOf(className) !== -1) {
    return true;
  }
  return false;
};

helpers.addClass = function addClass(el, className) {
  var current = el.className;

  if (current === '') {
    el.className = className;
  } else {
    current = current.split(' ');

    if (current.indexOf(className) !== -1) {
      this.stripClasses(current, className);
    }

    current.push(className);
    el.className = current.join(' ');
  }
};

helpers.addClasses = function addClasses(el, classNames) {
  _.each(classNames, function eachClass(className) {
    helpers.addClass(el, className);
  });
};

/*
** Strips all class names with name className from array
***/
helpers.stripClasses = function stripClasses(arr, className) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === className) {
      arr.splice(i, 1);
      --i;
    }
  }
};

helpers.removeClass = function removeClass(el, className) {
  var current = el.className;

  if (current !== '') {
    current = current.split(' ');
    this.stripClasses(current, className);
    el.className = current.join(' ');
  }
};

helpers.getElementsByClass = function getElementsByClass(parent, tag, className) {
  if (parent.getElementsByClassName) {
    return parent.getElementsByClassName(className);
  }
  var elems = [];
  _.each(parent.getElementsByTagName(tag), function getByTag(t) {
    if (helpers.hasClass(t, className)) {
      elems.push(t);
    }
  });
  return elems;
};

helpers.once = function once(elem, key, callback) {
  if (!elem) {
    return;
  }
  elem.started = elem.started || {};
  if (!elem.started[key]) {
    elem.started[key] = true;
    callback(elem);
  }
};

helpers.viewportWidth = function viewportWidth() {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
};

helpers.scrollY = function scrollY() {
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
};

helpers.isDesktop = function isDesktop() {
  return helpers.viewportWidth() >= DESKTOP_WIDTH;
};

helpers.isJSWindow = function isJSWindow() {
  return window.opener !== null;
};

helpers.getStyle = function getStyle(elem, prop) {
  var val = '';
  if (document.defaultView && document.defaultView.getComputedStyle) {
    val = document.defaultView.getComputedStyle(elem, '').getPropertyValue(prop);
  } else if (elem.currentStyle) {
    prop = prop.replace(/\-(\w)/g, function upperCase(match, c) {
      return c.toUpperCase();
    });
    val = elem.currentStyle[prop];
  }
  return val;
};

helpers.pagehide = function pageHide(func) {
  if ('onpagehide' in window) {
    helpers.addEvent(window, 'pagehide', func);
  } else {
    helpers.addEvent(window, 'unload', func);
  }
};

module.exports = helpers;
