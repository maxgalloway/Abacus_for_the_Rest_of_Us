/**
 * The calculator pseudoClass represents a four-function calculator. The
 * following both defines and constructs the singleton calculator object.
 * 
 * @author Max Galloway-Carson
 * @version 1.0
 * 
 * Note that I will be using yuidoc throughout
 * http://yui.github.com/yuidoc/syntax/index.html
 * 
 * This file is part of Abacus For The Rest Of Us Copyright (C) 2013 Max
 * Galloway-Carson
 * 
 * Abacus For The Rest Of Us is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http:*www.gnu.org/licenses/>.
 * 
 * email me at: maxvgc@gmail.com
 */

var calculator = (function() {

    'use strict';

    var model, view, controller;

    /**
     * model pseudoclass is an internal representation of the calculator's
     * state.
     */
    model = {

        /**
         * running total since last clear
         * 
         * @property tally
         * @type Number
         * @default 0
         */
        tally : 0,

        /**
         * last operator pressed
         * 
         * @property operator
         * @type String
         * @default '+"
         */
        operator : '+',

        /**
         * number, as it entered by user
         * 
         * @property temp
         * @type String
         * @default ''
         */
        temp : '',

        /**
         * flag indicates whether there has been output
         * 
         * @property isClear
         * @type Boolean
         * @default true
         */
        isClear : true,

        /**
         * The evaluate function performs a computation. First, it performs the
         * stored operation on temp and tally. Then it stores the given
         * operation for the next evaluation.
         * 
         * @method evaluate
         * @param {String}
         *            operate the operator that was pressed
         * @return {String} Returns the state to show to user.
         */
        evaluate : function(operate) {

            // Special condition if there has not been output yet.

            var tempN = parseFloat(this.temp);

            if (this.isClear) {

                this.tally = tempN;
                this.isClear = false;

            } else {

                // Perform the stored operation on tally and temp

                switch (this.operator) {

                case '+':
                    this.tally += tempN;
                    break;

                case '-':
                    this.tally -= tempN;
                    break;

                case 'x':
                    this.tally *= tempN;
                    break;

                case '/':
                    this.tally /= tempN;
                    break;

                }
            }

            // In either case, update the display, and prepare for
            // next input

            this.temp = '0'; // reset temp
            this.operator = operate; // get ready to perform
            // the given operation

            if (isNaN(this.tally)) {
                this.reset();
            }

            return this.tally; // user sees result of computation
        },

        /**
         * The update function will take string representing a single digit, and
         * append it to what the user has entered so far, both on the screen and
         * internally.
         * 
         * @method update
         * @param {String} lastDigit: the value of the button being pressed
         * @return {String} Returns the state to show to user.
         */

        update : function(lastDigit) {

            // wipe out display to prevent leading zero
            if (this.temp === '0') {
                this.temp = '';
            }

            // concat display with new input
            this.temp += lastDigit;

            return this.temp; // user sees number entered thus far
        },

        /**
         * The reset function clears the calculator's instance variables, and
         * wipes the screen.
         * 
         * @method reset
         * @return {Number} zero: the blank screen
         */
        reset : function() {
            this.tally = 0;
            this.operator = '+';
            this.temp = '0';
            this.isClear = true;
            return 0;
        }

    }; // end model

    /**
     * view is the representation of the screen.
     */
    view = {

        /**
         * the object holding the output.
         * 
         * @property display
         * @type String
         * @default '0
         */
        display : {
            innerHTML : '0'
        },

        /**
         * set display to given number
         * 
         * @method output
         * @param {any}
         * @return {null}
         */
        output : function(val) {

            this.display.innerHTML = val;
            return;
        },
        /**
         * Sets sets given object to be the new display. Copies the old output
         * into new display.
         * 
         * @method setDisplay
         * @param {Object} node that will be new display
         * @return {null}
         */
        setDisplay : function(newScreen) { // function

            if (typeof newScreen === 'object') {

                newScreen.innerHTML = this.display.innerHTML;

                this.display = newScreen;
            }

            return;
        }
    }; // end view

    // These are the calculator's publicly facing methods.
    // They should be consided the controller.

    // Enter number is called when a user presses a digit, and takes that
    // digit as a param. If possible, enterNumber will pass that digit
    // to the inner calculator's update method.

    controller = {
        enterNumber : function(num) {

            if (typeof model.update === 'function') {

                // Pass response from model's update method to
                // the view
                view.output(model.update(num));
            }
        },

        // Enter operator is called when a user presses an operator,
        // and takes that operator as a param. If possible, enterOperator
        // will pass that operator to the inner calculator's
        // evaluate method.

        enterOperator : function(opp) {

            if (typeof model.evaluate === 'function') {

                // Pass response from model's evaluate method to
                // the view
                view.output(model.evaluate(opp));
            }
        },

        // Clear is called when a user presses the clear button, and
        // takes no params. If possible, clear will call the inner
        // calculator's reset method.

        clear : function() {

            if (typeof model.reset === 'function') {

                // Pass response from model's reset method to
                // the view
                view.output(model.reset());
            }
        },

        // Set Display takes an object, and set it to be the
        // Calculator's new output field.

        setDisplay : function(obj) {

            view.setDisplay(obj);
        }
    };

    return controller;

}()); // end calculator definition

// This is where the setup for the calculator happens. It's all
// inside an anonymous function, so the vars and the functions
// will go away at the end.

(function() {

    'use strict';

    var numbers, operators, i, k, request;
console.log(window.applicationCache.status);
    // First, create click handlers for the buttons

    // function takes a number button dom element, and
    // attaches calc's enterNumber method to its click event
    function bindNum(obj) {
        obj.onclick = function() {
            calculator.enterNumber(this.value); // 'this' is obj (a num btn)
        };
    }

    // function takes a function button dom element, and
    // attaches calc's enterOperator method to its click event
    function bindOpp(obj) {
        obj.onclick = function() {
            calculator.enterOperator(this.value); // 'this' is obj (a fn btn)
        };
    }

    // Second, run setup routine, in which page elements are bound to
    // calculator methods.

    // Start by calling the calcuator's init method, passing
    // in an output element to be the display.

    /* jslint browser:true */

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

    document.getElementById('clear').onclick = function() {
        calculator.clear();
    };

    // Try to install app in firefox os if it is not already installed
    // I have no error handlers, and only handle the first success,
    // because there is nothing to be done in other cases.

    request = navigator.mozApps.getSelf();

    request.onsuccess = function() {
        if (!request.result) { // not installed yet, try to

            var req2 = navigator.mozApps.install(location.protocol + '//' + location.host
                    + '/manifest.webapp');
            
            req2.onerror = function (a) {
                console.log('did not install');
                console.log(a);
            }
            
            req2.onsuccess = function (a){
                console.log('we have installed.');
                console.log(a);
            }

        } // otherwise the app is already installed, so do nothing
    };

}()); // end the anonymous init function, and invoke it
