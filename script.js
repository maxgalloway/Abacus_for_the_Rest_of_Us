//  The calculator pseudoClass represents a four-function calculator.
//  The following both defines and constructs the singleton calculator object.

var calculator = new function(){
    
//  that is an internal representation of the calculator.
//  By defining it as a var inside the pseudoclass, it
//  and its properties, and its methods are invisible 
//  to the outside world.
                
    var that = {};
    
//  The calculator's init method takes only a dom node, screen.
//  This screen will be accessed by the inner calculator, that,
//  to display the numeric output.    
    
    this.init = function(screen){ 
        
//      to ensure that methods requiring the display are not fired without
//      it first being initialized, all of that's methods and properties
//      are defined in this function (which requires screen as a parameter)

        if( typeof screen === 'object'){
        
            that = {

                tally : 0, // the result of all operations since a clear

                operator : '+', // the last operator pressed

                temp : 0, // the number being entered by user

                isClear : true, // a flag, indicated whether there has been output

                display : screen, // init needs to be called bef

//              The evaluate function performs a computation. 
//              First, it performs the stored operation on temp and tally.
//              Then it stores the given operation for the next evaluation.        

                evaluate : function(operate){

//                  Special condition if there has not been output yet.

                    if( this.isClear ){

                        this.tally = this.temp;
                        this.isClear = false;

                    } else {

//                  Perform the stored operation on tally and temp

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

                        }
                    }

//                  In either case, update the display, and prepare for next input

                    this.output(this.tally); // show the new tally
                    this.temp = 0; // reset temp
                    this.operator = operate; // get ready to perform the given operation
                },

//              The update function will take string representing a single digit, and 
//              append it to what the user has entered so far, both on the screen and
//              internally.        

                update : function(lastDigit){
                    this.temp = (10 * this.temp) + parseInt(lastDigit);
                    this.output(this.temp);
                },


//              The output function sets the calculator's screen to the given value.
//              The value, val should be a number. 

                output : function ( val ){

                    if( typeof val === 'number'){
                        this.display.innerHTML = val;
                    }
                },

//              The reset function clears the calculator's instance variables, and 
//              wipes the screen.

                reset : function(){
                    this.tally = 0;
                    this.operator = '+';
                    this.temp = 0;
                    this.isClear = true; 
                    this.output(0);
                }

            }; // end that
            
        } // end check on screen
        
}; // end init

//  These are the calculator's publicly facing methods.

//  Enter number is called when a user presses a digit, and takes that 
//  digit as a param. If possible, enterNumber will pass that digit 
//  to the inner calculator's update method.

    this.enterNumber = function(num){
        if( 'update' in that ){
            that.update(num);
        }
    };

//  Enter operator is called when a user presses an operator, and takes that 
//  operator as a param. If possible, enterOperator will pass that operator 
//  to the inner calculator's evaluate method.

    this.enterOperator = function(opp){
        if( 'evaluate' in that ){
            that.evaluate(opp);
        }
    };
 
//  Clear is called when a user presses the clear button, and takes 
//  no params. If possible, clear will call the inner calculator's 
//  reset method.
  
    this.clear = function(){
        if( 'reset' in that ){
            that.reset();
        }
    };
    
}; // end calculator definition

//    This is where the setup for the calculator happens. It's all 
//    inside an anonymous function, so  the vars and the functions 
//    will go away at the end. 
//    (But if it defines getElementsByClassName, that will not.)

(function(){
    
//  First, I will check if document.getElementsByClassName is natifley 
//  defined, and define it myself if not.
    
    checkGetClass();
    
//  Second, run setup routine, in which page elements are bound to
//  calculator methods.
    
    
//  Start by calling the calcuator's init method, passing
//  in an output element to be the display.

    calculator.init(document.getElementById('out'));
    
 
//  Move onto binding the numbers' click
//  event to the calculator's update method.

    var numbers = document.getElementsByClassName('number');
    
    for (var i = 0; i < numbers.length; i++) {

//      clicking a number will update the display and the temp variable

        numbers[i].onclick = function(){
              calculator.enterNumber(this.value); // this = a number btn
        }
    }

    var operators = document.getElementsByClassName('operator');
    
    for( var k = 0; k < operators.length; k++){
        
//      clicking an operator will make the calculator perform an operation.

        operators[k].onclick = function(){
              calculator.enterOperator(this.value); // this = a function btn
        }

    }

//  lastly, bind the clear function to the clear buttons' click event

    document.getElementById('clear').onclick = function(){
          calculator.clear();
    }
    
    function checkGetClass(){
        
        if (!('getElementsByClassName' in document)){
            
//         The following implementation is thanks to:
//         http://ejohn.org/blog/getelementsbyclassname-speed-comparison/#js-4
        
            document.getElementsByClassName = function(className, parentElement) {
                if (Prototype.BrowserFeatures.XPath) {
                    var q = ".//*[contains(concat(' ', @class, ' '), ' " + className + " ')]";
                    return document._getElementsByXPath(q, parentElement);
                } else {
                    var children = ($(parentElement) || document.body).getElementsByTagName('*');
                    var elements = [], child;
                    for (var i = 0, length = children.length; i < length; i++) {
                    child = children[i];
                    if (Element.hasClassName(child, className))
                        elements.push(Element.extend(child));
                    }
                    return elements;
                }
            }; 
            // end implementation
            
      } // end if
      
    } // end checkGetClass
    
})(); // end the anonymouse function, and invoke it
