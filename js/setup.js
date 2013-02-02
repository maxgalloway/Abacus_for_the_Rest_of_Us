/**
 * This is where the setup for the calculator happens. It's all inside an
 * anonymous function, so the vars and the functions will go away at the end.
 */

/*global calculator:false , localStorage:false*/

(function () {

    'use strict';

    var numbers, operators, i, k;

    // First, create click handlers for the buttons

    /**
     * bundNum takes a number button dom element, and attaches calc's
     * enterNumber method to its click event
     * 
     * @param {Object}
     *            obj is a dom node of a number button
     * @return {Boolean} just true
     */
    function bindNum(obj) {
        obj.onclick = function () {
            calculator.enterNumber(this.value); // 'this' is obj (a num btn)
        };

        return true;
    }

    /**
     * bundOpp takes a function button dom element, and attaches calc's
     * enterOperator method to its click event
     * 
     * @param {Object} obj is a dom node of a function button
     * @return {Boolean} just true
     */
    function bindOpp(obj) {
        obj.onclick = function () {
            calculator.enterOperator(this.value); // 'this' is obj (a fn btn)
        };

        return true;
    }

    // Second, run setup routine, in which page elements are bound to
    // calculator methods.

    // Start by calling the calcuator's init method, passing
    // in an output element to be the display.

    /*jslint browser:true*/

    calculator.setDisplay(document.getElementById('out'));

    // Move onto binding the numbers' click
    // event to the calculator's update method.

    numbers = document.getElementsByClassName('number');

    for (i = 0; i < numbers.length; i += 1) {

        // clicking a number will update the display and
        // the temp variable

        bindNum(numbers[i]);
    }

    operators = document.getElementsByClassName('operator');

    for (k = 0; k < operators.length; k += 1) {

        // clicking an operator will make the calculator
        // perform an operation.

        bindOpp(operators[k]);

    }

    // lastly, bind the clear function to the clear buttons' click event

    document.getElementById('clear').onclick = function () {
        calculator.clear();
    };

    /**
     * Try to install app from firefox if it is not already installed.
     * 
     * Note that I have no error handlers, and only handle the first success,
     * because there is nothing to be done in other cases. To do this, the
     * special firefox function and localStorage need to be available.
     * 
     * From https://developer.mozilla.org/en-US/docs/DOM/Apps.getSelf Note: Due
     * to Bug 806597, request.result incorrectly returns null even when an app
     * is running on Desktop and Firefox for Android.
     * 
     * Because of this bug, I will defer to a flag that I will set in
     * localStorage to inform me if the app is already installed.
     */
    (function () {

        var request, req2;

        if (typeof navigator.mozApps.getSelf === 'function'
                && typeof navigator.mozApps.install === 'function'
                && localStorage
                && localStorage.getItem('alreadyInstalled') !== '1') {

            request = navigator.mozApps.getSelf();

            request.onsuccess = function () {
                // not installed yet, try to
                if (!request.result) {

                    req2 = navigator.mozApps.install(location.protocol + '//' + location.host
                            + '/manifest.webapp');

                    req2.onsuccess = function () {
                        localStorage.setItem('alreadyInstalled', '1');
                    };

                } // otherwise the app is either already installed or cannot 
                  // be, so do nothing
            };
        }
    }());

}()); // end the anonymous init function, and invoke it