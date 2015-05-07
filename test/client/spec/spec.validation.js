var validation = require('../../../index').validation,
    $ = require('jquery'),
    util = require('../lib/util');

describe('Validation', function () {

    beforeEach(function () {
        $('#test-container').append('<div id="content" />');
    });

    it ('exports a function', function () {
        validation.should.be.a('function');
    });

    describe('summary', function () {

        beforeEach(function () {
            $('#content').append('<div class="validation-summary" tabindex="-1">');
            validation();
        });

        it('adds focus to the validation summary', function () {
            document.activeElement.should.equal(document.getElementsByClassName('validation-summary')[0]);
        });

    });

    describe('form error groups', function () {

        beforeEach(function () {
            $('#content').append('<div class="validation-summary" tabindex="-1">');
            $('.validation-summary').append('<ul><li><a id="error" href="#input-group">Error</a></li></ul>');
            $('#content').append('<div id="input-group" tabindex="-1">');
        });

        describe('input group', function () {

            beforeEach(function () {
                validation();
            });

            it('adds focus to the input group when a validation message is clicked', function () {
                util.triggerEvent(document.getElementById('error'), 'click');
                document.activeElement.should.equal(document.getElementById('input-group'));
            });

        });

        describe('input element', function () {

            beforeEach(function () {
                $('#input-group').append('<input type="text">');
                validation();
            });

            it('adds focus if there only one input', function () {
                util.triggerEvent(document.getElementById('error'), 'click');
                document.activeElement.should.equal(document.getElementsByTagName('input')[0]);
            });

        });

        describe('textarea element', function () {

            beforeEach(function () {
                $('#input-group').append('<textarea>');
                validation();
            });

            it('adds focus if there is only one textarea', function () {
                util.triggerEvent(document.getElementById('error'), 'click');
                document.activeElement.should.equal(document.getElementsByTagName('textarea')[0]);
            });

        });

        describe('select element', function () {

            beforeEach(function () {
                $('#input-group').append('<select>');
                validation();
            });

            it('adds focus if there is only one select', function () {
                util.triggerEvent(document.getElementById('error'), 'click');
                document.activeElement.should.equal(document.getElementsByTagName('select')[0]);
            });

        });

        describe('more than one "input" in a group', function () {

            beforeEach(function () {
                $('#input-group').append('<input type="text">');
                $('#input-group').append('<input type="text">');
                validation();
            });

            it('leaves focus on the input group', function () {
                util.triggerEvent(document.getElementById('error'), 'click');
                document.activeElement.should.equal(document.getElementById('input-group'));
            });

        });

    });

});
