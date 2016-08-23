'use strict';

var anchorButton = require('../../../index').anchorButton;
var helpers = require('../../../index').helpers;

var $ = require('jquery'),
    util = require('../lib/util');

describe('Anchor button', function () {

    it('exports a function', function () {
        anchorButton.should.be.a('function');
    });

    describe('adds role="button"', function () {

        beforeEach(function () {
            $('#test-container').append('<a href="#NOLINK" id="a1" class="button">Click me</a>');
            $('#test-container').append('<a href="#NOLINK" id="a2">Click me</a>');
            anchorButton();
        });

        it('only to anchors with class button', function () {
            $('#a1').attr('role').should.equal('button');
            (typeof $('#a2').attr('role')).should.equal('undefined');
        });

    });

    describe('can be triggered by the space bar', function () {

        var clicked;

        beforeEach(function () {
            $('#test-container').append('<a href="#NOLINK" id="a1" class="button">Click me</a>');
            $('#test-container').append('<a href="#NOLINK" id="a2">Click me</a>');
            $('#test-container').append('<a href="#NOLINK" id="a3" class="other">Click me</a>');
            clicked = sinon.stub();
            sinon.stub(helpers, 'preventDefault');
            sinon.stub(helpers, 'target').returns({
                click: clicked
            });
            anchorButton();
        });

        afterEach(function () {
            helpers.preventDefault.restore();
            helpers.target.restore();
        });

        it('with class button', function () {
            util.triggerKeyboardEvent(document.getElementById('a1'), 'keydown', { keyCode: 32 } );
            helpers.preventDefault.should.have.been.calledOnce;
            clicked.should.have.been.calledOnce;
        });

        it('only fires once', function () {
            anchorButton();
            util.triggerKeyboardEvent(document.getElementById('a1'), 'keydown', { keyCode: 32 } );
            helpers.preventDefault.should.have.been.calledOnce;
            clicked.should.have.been.calledOnce;
        });

        it('with only class button', function () {
            util.triggerKeyboardEvent(document.getElementById('a2'), 'keydown', { keyCode: 32 });
            util.triggerKeyboardEvent(document.getElementById('a3'), 'keydown', { keyCode: 32 });
            helpers.preventDefault.should.not.have.been.called;
            clicked.should.not.have.been.called;
        });

    });

});
