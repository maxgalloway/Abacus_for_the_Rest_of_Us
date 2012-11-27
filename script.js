//  The calculator pseudoClass represents a four-function calculator.
//  The following both defines and constructs the singleton calculator object.

var calculator = new function(){
    
//  model pseudoclass is an internal representation of 
//  the calculator's state.
//  
//  By defining it as a var inside the pseudoclass, it
//  and its properties, and its methods are invisible 
//  to the outside world.   
        
    var model = {

        tally : 0, // running total since last clear

        operator : '+', // last operator pressed

        temp : 0, // number, as it entered by user

        isClear : true, // flag indicates whether there has been output
        
//      The evaluate function performs a computation. 
//      First, it performs the stored operation on temp and tally.
//      Then it stores the given operation for the next evaluation.
//        
//      Returns the state to show to user.

        evaluate : function(operate){

//          Special condition if there has not been output yet.

            if( this.isClear ){

                this.tally = this.temp;
                this.isClear = false;

            } else {

//              Perform the stored operation on tally and temp

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

//          In either case, update the display, and prepare for next input

            this.temp = 0; // reset temp
            this.operator = operate; // get ready to perform the given operation
            
            return this.tally; // user sees result of computation
        },

//      The update function will take string representing a single digit, and 
//      append it to what the user has entered so far, both on the screen and
//      internally.
//      Returns the state to show to user.        

        update : function(lastDigit){
            this.temp = (10 * this.temp) + parseInt(lastDigit);
            return this.temp; // user sees number entered thus far
        },


//      The reset function clears the calculator's instance variables, and 
//      wipes the screen.

        reset : function(){
            this.tally = 0;
            this.operator = '+';
            this.temp = 0;
            this.isClear = true; 
            return 0;
        }

    }; // end model
    
//  view is the representation of the screen. 
    
    var view = {
        
//      the object holding the output.
        
        display : {innerHTML : "0"}, 
        
//      method to set display to given number
        
        output : function( val ){ 
            
            if( typeof val === 'number' ){
                
                this.display.innerHTML = val;
            }
        },
        
//      Sets sets given object to be the new display. 
//      Copies the old output into new display.
        
        setDisplay : function( newScreen ){ // function
            
            if( typeof newScreen === 'object' ){
                
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

    this.enterNumber = function(num){
        
        
        if( 'update' in model ){
            
//          Pass response from model's update method to the view
            view.output( model.update(num) );
        }
    };

//  Enter operator is called when a user presses an operator, and takes that 
//  operator as a param. If possible, enterOperator will pass that operator 
//  to the inner calculator's evaluate method.

    this.enterOperator = function(opp){
        
        if( 'evaluate' in model ){
            
//          Pass response from model's evaluate method to the view            
            view.output( model.evaluate(opp) );
        }
    };
 
//  Clear is called when a user presses the clear button, and takes 
//  no params. If possible, clear will call the inner calculator's 
//  reset method.
  
    this.clear = function(){
        
        if( 'reset' in model ){
            
//          Pass response from model's reset method to the view            
            view.output( model.reset() );
        }
    };
    
//  Set Display takes an object, and set it to be the 
//  Calculator's new output field.
    
    this.setDisplay = function( obj ){
        
      view.setDisplay(obj);  
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

    calculator.setDisplay(document.getElementById('out'));
    
 
//  Move onto binding the numbers' click
//  event to the calculator's update method.

    var numbers = document.getElementsByClassName('number');
    
    for (var i = 0; i < numbers.length; i++) {

//      clicking a number will update the display and the temp variable

        numbers[i].onclick = function(){
              calculator.enterNumber(this.value); // this = a number btn
        };
    }

    var operators = document.getElementsByClassName('operator');
    
    for( var k = 0; k < operators.length; k++){
        
//      clicking an operator will make the calculator perform an operation.

        operators[k].onclick = function(){
              calculator.enterOperator(this.value); // this = a function btn
        };

    }

//  lastly, bind the clear function to the clear buttons' click event

    document.getElementById('clear').onclick = function(){
          calculator.clear();
    };
    
    function checkGetClass(){
        
        if (!('getElementsByClassName' in document)){
            
//         The following implementation is thanks to:
//         http://ejohn.org/blog/getelementsbyclassname-speed-comparison/#js-3
        
            document.getElementsByClassName = function (searchClass,node,tag) {
                var classElements = new Array();
                if ( node == null )
                    node = document;
                if ( tag == null )
                    tag = '*';
                var els = node.getElementsByTagName(tag);
                var elsLen = els.length;
                var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
                for (i = 0, j = 0; i < elsLen; i++) {
                    if ( pattern.test(els[i].className) ) {
                    classElements[j] = els[i];
                    j++;
                    }
                }
                return classElements;
            };

            // end implementation
            
      } // end if
      
    } // end checkGetClass
    
})(); // end the anonymous function, and invoke it
