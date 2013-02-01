//  The calculator pseudoClass represents a four-function calculator.
//  The following both defines and constructs the singleton calculator object.

//  This file is part of Abacus For The Rest Of Us
//  Copyright (C) 2013 Max Galloway-Carson
//    
//  Abacus For The Rest Of Us is free software: you can redistribute it and/or modify
//  it under the terms of the GNU Affero General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//    
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
//  GNU Affero General Public License for more details.
//    
//  You should have received a copy of the GNU Affero General Public License
//  along with this program. If not, see <http://www.gnu.org/licenses/>.
//    
//  email me at: maxvgc@gmail.com

var calculator = (function () {

    'use strict';

    var model,
        view,
        controller;

//  model pseudoclass is an internal representation of
//  the calculator's state.

    model = {

        tally : 0, // running total since last clear

        operator : '+', // last operator pressed

        temp : '', // number, as it entered by user

        isClear : true, // flag indicates whether there has been output

//      The evaluate function performs a computation.
//      First, it performs the stored operation on temp and tally.
//      Then it stores the given operation for the next evaluation.
//
//      Returns the state to show to user.

        evaluate : function (operate) {

//      Special condition if there has not been output yet.

            var tempN = parseFloat(this.temp);

            if (this.isClear) {

                this.tally = tempN;
                this.isClear = false;

            } else {

//              Perform the stored operation on tally and temp

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

//          In either case, update the display, and prepare for
//          next input

            this.temp = '0'; // reset temp
            this.operator = operate; // get ready to perform
            // the given operation

            if (isNaN(this.tally)) {
                this.reset();
            }

            return this.tally; // user sees result of computation
        },

//      The update function will take string representing a single
//      digit, and
//      append it to what the user has entered so far, both on the
//      screen and internally.
//      Returns the state to show to user.

        update : function (lastDigit) {

//          wipe out display to prevent leading zero
            if (this.temp === '0') {
                this.temp = '';
            }

//          concat display with new input
            this.temp += lastDigit;

            return this.temp; // user sees number entered thus far
        },

//      The reset function clears the calculator's instance
//      variables, and wipes the screen.

        reset : function () {
            this.tally = 0;
            this.operator = '+';
            this.temp = '0';
            this.isClear = true;
            return 0;
        }

    }; // end model

//  view is the representation of the screen.

    view = {

//      the object holding the output.

        display : {
            innerHTML : "0"
        },

//      method to set display to given number

        output : function (val) {

            this.display.innerHTML = val;

        },

//      Sets sets given object to be the new display.
//      Copies the old output into new display.

        setDisplay : function (newScreen) { // function

            if (typeof newScreen === 'object') {

                newScreen.innerHTML = this.display.innerHTML;

                this.display = newScreen;
            }
        }
    }; // end view

//  These are the calculator's publicly facing methods.
//  They should be consided the controller.

//  Enter number is called when a user presses a digit, and takes that
//  digit as a param. If possible, enterNumber will pass that digit
//  to the inner calculator's update method.

    controller = {
        enterNumber : function (num) {

            if (typeof model.update === 'function') {

//              Pass response from model's update method to
//              the view
                view.output(model.update(num));
            }
        },

//      Enter operator is called when a user presses an operator,
//      and takes that operator as a param. If possible, enterOperator 
//      will pass that operator to the inner calculator's 
//      evaluate method.

        enterOperator : function (opp) {

            if (typeof model.evaluate === 'function') {

//              Pass response from model's evaluate method to
//              the view
                view.output(model.evaluate(opp));
            }
        },

//      Clear is called when a user presses the clear button, and
//      takes no params. If possible, clear will call the inner
//      calculator's reset method.

        clear : function () {

            if (typeof model.reset === 'function') {

//              Pass response from model's reset method to
//              the view
                view.output(model.reset());
            }
        },

//      Set Display takes an object, and set it to be the
//      Calculator's new output field.

        setDisplay : function (obj) {

            view.setDisplay(obj);
        }
    };

    return controller;

}()); // end calculator definition

// This is where the setup for the calculator happens. It's all
// inside an anonymous function, so the vars and the functions
// will go away at the end.

(function () {

    'use strict';

    var numbers,
        operators,
        i,
        k;

//  First, create click handlers for the buttons

//  function takes a number button dom element, and
//  attaches calc's enterNumber method to its click event
    function bindNum(obj) {
        obj.onclick = function () {
            calculator.enterNumber(this.value); // 'this' is obj (a num btn)
        };
    }

//  function takes a function button dom element, and
//  attaches calc's enterOperator method to its click event
    function bindOpp(obj) {
        obj.onclick = function () {
            calculator.enterOperator(this.value); // 'this' is obj (a fn btn)
        };
    }

//  Second, run setup routine, in which page elements are bound to
//  calculator methods.

//  Start by calling the calcuator's init method, passing
//  in an output element to be the display.

    /*jslint browser:true*/

    calculator.setDisplay(document.getElementById('out'));

//  Move onto binding the numbers' click
//  event to the calculator's update method.

    numbers = document.getElementsByClassName('number');

    for (i = 0; i < numbers.length; i += 1) {

//      clicking a number will update the display and 
//      the temp variable

        bindNum(numbers[i]);
    }

    operators = document.getElementsByClassName('operator');

    for (k = 0; k < operators.length; k += 1) {

//      clicking an operator will make the calculator 
//      perform an operation.

        bindOpp(operators[k]);

    }

//  lastly, bind the clear function to the clear buttons' click event

    document.getElementById('clear').onclick = function () {
        calculator.clear();
    };
    
//  try to install app in firefox os if it is not already installed
    var request = navigator.mozApps.getSelf();
    
    request.onsuccess = function (){
        if(!request.result) { // not installed yet, initiate request
            console.log('not installed yet');
            var request2 = navigator.mozApps.install(location.protocol + '//' + location.host + '/manifest.webapp');
            
            request2.onsuccess = function() {
                console.log('app installed successfully');
              };
              request2.onerror = function() {
                  console.log(location.host);
                console.log('app failed to install');
              };
            
        } else { 
            console.log('already installed');
            navigator.mozApps.mgmt.launch(location.protocol + '//' + location.host + ');
                    var request3 = window.navigator.mozApps.getInstalled();
            request3.onerror = function(e) {
              alert("Error calling getInstalled: " + request3.error.name);
            };
            request3.onsuccess = function(e) {
              alert("Success, number of apps: " + request3.result.length);
              var appsRecord = request3.result;
              console.log(appsRecord);
            };
            }
        
        request.onerror = function () {
            console.log('Error checking installation status: ' + this.error.message);

          };
    };
    

}()); // end the anonymous init function, and invoke it
