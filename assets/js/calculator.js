/**
 * The calculator object represents a four-function calculator. The
 * following both defines and constructs the singleton calculator object.
 *
 * @author Max Galloway
 * @version 1.0.1
 * @module calculator
 *
 * This file is part of Abacus For The Rest Of Us Copyright (C) 2015 Max
 * Galloway
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
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * email me at: webmaster@pwipw.com
 * source code: https://github.com/maxgalloway/Abacus_for_the_Rest_of_Us
 */

/*jslint white: true*/

var calculator = (function () {

    'use strict';

    var model, view, controller;

    /**
     * model pseudoclass is an internal representation of the calculator's
     * state.
     *
     * @class model
     */
    model = (function () {

        /**
         * running total since last clear
         *
         * @property tally
         * @type Number
         * @default 0
         */
        var tally = 0,

            /**
             * last operator pressed
             *
             * @property operator
             * @type String
             * @default '+"
             */
                operator = '+',

            /**
             * number, as it entered by user
             *
             * @property temp
             * @type String
             * @default ''
             */
                temp = '',

            /**
             * flag indicates whether there has been output
             *
             * @property isClear
             * @type Boolean
             * @default true
             */
                isClear = true,

            /**
             * The reset function clears the calculator's instance variables, and
             * wipes the screen.
             *
             * @method reset
             * @return {Number} zero: the blank screen
             */
                reset = function () {
                tally = 0;
                operator = '+';
                temp = '0';
                isClear = true;
                return 0;
            };

//      return an object, exposing the following methods to the rest of the calculator object
        return {
            /**
             * The evaluate function performs a computation. First, it performs the
             * stored operation on temp and tally. Then it stores the given
             * operation for the next evaluation.
             *
             * @method evaluate
             * @param {String} operate the operator that was pressed
             * @return {Number} Returns the state to show to user.
             */
            evaluate: function (operate) {

                var tempN = parseFloat(temp);

                // Special condition if there has not been output yet.

                if (isClear) {

                    tally = tempN;
                    isClear = false;

                } else {

                    // Perform the stored operation on tally and temp

                    switch (operator) {

                        case '+':
                            tally += tempN;
                            break;

                        case '-':
                            tally -= tempN;
                            break;

                        case 'x':
//                            multiply by thousands then divide by them to fix a rounding bug
                            tally = Math.round(((1000 * tally) * (tempN * 1000)) / 1000) / 1000;
                            break;

                        case '/':
//                          divide and round to three decimals

                            tally = Math.round((1000 * tally) / tempN) / 1000;
                            break;

                    }
                }

                // In either case, update the display, and prepare for
                // next input

                temp = '0'; // reset temp
                operator = operate; // get ready to perform
                // the given operation

                if (isNaN(tally)) {
                    reset();
                }

                return tally; // user sees result of computation
            },

            /**
             * The update function will take string representing a single digit, and
             * append it to what the user has entered so far, both on the screen and
             * internally.
             *
             * @method update
             * @param {String} lastDigit the value of the button being pressed
             * @return {String} Returns the state to show to user.
             */

            update: function (lastDigit) {

                // wipe out display to prevent leading zero
                if (temp === '0') {
                    temp = '';
                }

                // concat display with new input
                temp += lastDigit;

                return temp; // user sees number entered thus far
            },

            /**
             * The reset function clears the calculator's instance variables, and
             * wipes the screen.
             *
             * @method reset
             * @return {Number} zero: the blank screen
             */
            reset: function () {
                return reset();
            }
        };
    }()); // end model

    /**
     * view is the representation of the screen.
     *
     * @class view
     */
    view = (function () {

        /**
         * the object holding the output.
         *
         * @property display
         * @type Object
         * @default '0
         */
        var display = {
            innerHTML: '0'
        };

//      return an object, exposing the following methods to the rest of the calculator object
        return {
            /**
             * set display to given number
             *
             * @method output
             * @param {String} val
             * @return {String}
             */
            output: function (val) {

                display.innerHTML = val;
                return null;
            },
            /**
             * Sets sets given object to be the new display. Copies the old output
             * into new display.
             *
             * @method setDisplay
             * @param {Object} newScreen node that will be new display
             * @return {Boolean} indicate success of operation
             */
            setDisplay: function (newScreen) { // function

                if (typeof newScreen === 'object') {

                    newScreen.innerHTML = display.innerHTML;

                    display = newScreen;

                    return true;

                }

                return false;
            }
        };
    }()); // end view

    /**
     * These are the calculator's publicly facing methods. Together, the
     * constitute the controller.
     *
     * @class controller
     */
    controller = {

        /**
         * Enter number is called when a user presses a digit, and takes that
         * digit as a param. If possible, enterNumber will pass that digit to
         * the inner calculator's update method.
         *
         * @method enterNumber
         * @param {String} num is a string representing a number.
         *
         * @return {String} the value to display as a result of this action,
         *         empty string denotes failure
         */
        enterNumber: function (num) {

            var retVal = '';

            if (typeof model.update === 'function') {

                // Pass response from model's update method to
                // the view
                retVal = model.update(num);
                view.output(retVal);
            }

            return retVal;
        },

        /**
         * Enter operator is called when a user presses an operator, and takes
         * that operator as a param. Then, enterOperator will pass that
         * operator to the inner calculator's evaluate method.
         *
         * @method enterOperator
         * @param {String} opp is a string representing a calculator function
         * @return {String} the value to display as a result of this action,
         *         empty string denotes failure
         */
        enterOperator: function (opp) {

            var retVal = '';

            if (typeof model.evaluate === 'function') {

                // Pass response from model's evaluate method to
                // the view

                retVal = model.evaluate(opp);

                if (opp === '=') {
                    view.output(retVal);
                } else {
                    view.output(opp);
                }
            }

            return retVal;
        },

        /**
         * Clear is called when a user presses the clear button, and takes no
         * params. If possible, clear will call the inner calculator's reset
         * method.
         *
         * @method clear
         * @return {String} the value to display as a result of this action,
         *         empty string denotes failure
         */
        clear: function () {

            var retVal = '';

            if (typeof model.reset === 'function') {

                // Pass response from model's reset method to
                // the view
                retVal = model.reset();
                view.output(retVal);
            }

            return retVal;
        },

        /**
         * Set Display takes an object, and set it to be the Calculator's new
         * output field.
         *
         * @method setDisplay
         * @param {Object} obj - a dom node that will be the calculator's new display
         * @return {Boolean} indicates success of operation
         *
         */
        setDisplay: function (obj) {

            return view.setDisplay(obj);
        }
    };

//  expose the controller's methods as the external interface to the calculator
    return controller;

}()); // end calculator definition