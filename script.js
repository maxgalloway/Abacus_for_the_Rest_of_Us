//  The calculator class represents a four-function calculator.
//  The following both defines and constructs the singleton calculator object.

var calculator = new function(){
    
//  What immediately follows would be the constructor in class-oriented
//  languages. (But in javascript, the whole class definition is in 
//  the constructor.)
    
//  First, initialize the calculator's instance variables

    this.tally = 0; // the last value output by a computation
    this.operator = '+'; // the current operator
    this.temp = 0; // the number being built by user input
    this.isClear = true; // tells whether the screen has been cleared
    
    var that = this; // use 'that' in places where 'this' is not in scope

//  Second, run setup routine, in which page elements are bound to
//  calculator methods. 
//  We will start by binding the numbers' click
//  event to the calculator's update method.

    var numbers = document.getElementsByClassName('number');
    
    for (var i = 0; i < numbers.length; i++) {

//      clicking a number will update the display and the temp variable

        numbers[i].onclick = function(){
            that.update(this.value); // that=calc this=number
        }
    }

    var operators = document.getElementsByClassName('operator');
    
    for( var k = 0; k < operators.length; k++){
        
//      clicking an operator will make the calculator perform an operation.

        operators[k].onclick = function(){
            that.evaluate(this.value); // that=calc this=opp
        }

    }

//  lastly, bind the clear function to the clear buttons' click event

    document.getElementById('clear').onclick = function(){
        that.reset(); // that=calc this=clear button
    }
    
//  This is the end of the would-be constructor. Now onto the 
//  instance methods!
    
//  The output function sets the calculator's screen to the given value.
//  The value, val should be a number. 
//
    this.output = function ( val ){
        if( typeof val === 'number'){
            document.getElementById('out').innerHTML = val;
        }
    };

//  The update function will take string representing a single digit, and 
//  append it to what the user has entered so far, both on the screen and
//  internally.
//
    this.update = function(lastDigit){
        this.temp = (10 * this.temp) + parseInt(lastDigit);
        this.output(this.temp);
    };

//  The evaluate function performs a computation. 
//  First, it performs the stored operation on temp and tally.
//  Then it stores the given operation for the next evaluation.
//
    this.evaluate = function(operate){
        
//      Special condition if there has not been output yet.

        if( this.isClear ){
            this.tally = this.temp;
            this.isClear = false;

        } else {
            
//          Peform the stored operation on tally and temp

            switch (this.operator){

                case '+':
                    this.tally += this.temp;
                    break;

                case '-':
                    this.tally -= this.temp;
                    break;

                case 'x':
                    this.tally *= this.temp;
                    break;

                case '/':
                    this.tally /= this.temp;
                    break;

//              no default action.
            }
        }

        this.output(this.tally); // show the new tally
        this.temp = 0; // reset temp
        this.operator = operate; // get ready to perform the given operation
    };
    
//  The reset function clears the calculator's instance variables, and 
//  wipes the screen.
//
    this.reset = function(){
        this.tally = 0;
        this.operator = '+';
        this.temp = 0;
        this.isClear = true; 
        this.output(0);
    };

};
