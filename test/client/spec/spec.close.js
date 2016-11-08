'use strict';

var closeWindow = require('../../../index').close,
    util = require('../lib/util');

var helpers = require('../../../index').helpers;

var $ = require('jquery');

describe('Close Window', function () {
    var originalClose = window.close;
    beforeEach(function () {
        $('#test-container').append('<div id="close">Close</div>');
        window.close = sinon.stub();
    });

    afterEach(function () {
        window.close = originalClose;
    });

    it('exports a function', function () {
        closeWindow.should.be.a('function');
    });

    describe('when window was opened by JS', function () {

        beforeEach(function () {
            sinon.stub(helpers, 'isJSWindow').returns(true);
            closeWindow();
        });

        afterEach(function () {
            helpers.isJSWindow.restore();
        });

        it('adds a button to container', function () {
            $('#test-container #close button').length.should.equal(1);
            $('#test-container #close button').text().should.contain('Close');
        });

        it('calls window.close() when close button clicked', function () {
            util.triggerEvent(document.getElementById('close-button'), 'click');
            window.close.should.have.been.calledOnce;
        });

    });

    describe('when window was not opened by JS', function () {

        beforeEach(function () {
            sinon.stub(helpers, 'isJSWindow').returns(false);
            closeWindow();
        });

        afterEach(function () {
            helpers.isJSWindow.restore();
        });

        it('does not add a button to container', function () {
            $('#test-container #close button').length.should.equal(0);
        });

        it('does not call window.close() when clicked', function () {
            util.triggerEvent(document.getElementById('close'), 'click');
            window.close.should.not.have.been.called;
        });

    });

    describe('clicking outside of the button', function () {

        beforeEach(function () {
            sinon.stub(helpers, 'isJSWindow').returns(true);
            closeWindow();
        });

        afterEach(function () {
            helpers.isJSWindow.restore();
        });

        it('does not call window.close() when containing div is clicked', function () {
            util.triggerEvent(document.getElementById('close'), 'click');
            window.close.should.not.have.been.called;
        });

    });

});
