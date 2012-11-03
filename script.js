//  The calculator pseudoClass represents a four-function calculator.
//  The following both defines and constructs the singleton calculator object.

var calculator = new function(){
    
//  What immediately follows would be the constructor in class-oriented
//  languages. (But in javascript, the whole class definition is in 
//  the constructor.)
    
//  First, initialize the calculator's instance variables

    var that;
        
    this.init = function(screen){
        
        that = {
        
            tally : 0, // the result of all operations since a clear

            operator : '+', // the last operator pressed

            temp : 0, // the number being entered by user

            isClear : true, // a flag, indicated whether there has been output

            display : screen, // a dom elem to write result

//            The evaluate function performs a computation. 
//            First, it performs the stored operation on temp and tally.
//            Then it stores the given operation for the next evaluation.        

            evaluate : function(operate){

//                Special condition if there has not been output yet.

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

                this.output(this.tally); // show the new tally
                this.temp = 0; // reset temp
                this.operator = operate; // get ready to perform the given operation
            },

    //      The update function will take string representing a single digit, and 
    //      append it to what the user has entered so far, both on the screen and
    //      internally.        

            update : function(lastDigit){
                this.temp = (10 * this.temp) + parseInt(lastDigit);
                this.output(this.temp);
            },


    //      The output function sets the calculator's screen to the given value.
    //      The value, val should be a number. 

            output : function ( val ){

                if( typeof val === 'number'){
                    this.display.innerHTML = val;
                }
            },

    //      The reset function clears the calculator's instance variables, and 
    //      wipes the screen.

            reset : function(){
                this.tally = 0;
                this.operator = '+';
                this.temp = 0;
                this.isClear = true; 
                this.output(0);
            }

        }; // end that
        
        if( !document.getElementsByClassName ){
            
            document.getElementsByClassName(c) = function(c){
                
            };
        }
        
    }; // end init


//  Second, run setup routine, in which page elements are bound to
//  calculator methods. 
//  We will start by binding the numbers' click
//  event to the calculator's update method.



    this.enterNumber = function(num){
        that.update(num);
    };
    
    this.enterOperator = function(opp){
        that.evaluate(opp);
    };
    
    this.clear = function(){
        that.reset();
    };
    
}; // end calculator definition

//    This is where the setup for the calculator happens. It's all 
//    inside an anonymous function, so  the vars and the functions 
//    will go away at the end. 
//    (But if it defines getElementsByClassName, that will not.)

(function(){
    
    checkGetClass();
    
    calculator.init(document.getElementById('out'));

    var numbers = document.getElementsByClassName('number');
    
    for (var i = 0; i < numbers.length; i++) {

//      clicking a number will update the display and the temp variable

        numbers[i].onclick = function(){
//            that.update(this.value); // that=calc this=number
              calculator.enterNumber(this.value);
        }
    }

    var operators = document.getElementsByClassName('operator');
    
    for( var k = 0; k < operators.length; k++){
        
//      clicking an operator will make the calculator perform an operation.

        operators[k].onclick = function(){
//            that.evaluate(this.value); // that=calc this=opp
              calculator.enterOperator(this.value);
        }

    }

//  lastly, bind the clear function to the clear buttons' click event

    document.getElementById('clear').onclick = function(){
//        that.reset(); // that=calc this=clear button
          calculator.clear();
    }
    
    function checkGetClass(){
        
        if (!('getElementsByClassName' in document)){
            
        // The following implementation is thanks to:
        // http://ejohn.org/blog/getelementsbyclassname-speed-comparison/#js-4
        
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
