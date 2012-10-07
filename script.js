    var tally , operator , temp , isClear;
    
    setup();

    function setup(){

        var numbers = document.getElementsByClassName('number');
        var operators = document.getElementsByClassName('operator');
        
        for (var i = 0; i < numbers.length; i++) {
            numbers[i].onclick = function(j) { return function() { update(j); }; } (numbers[i].value);
        }
        
        for( var i = 0; i < operators.length; i++){
            operators[i].onclick = function(j){ return function() { evaluate(j); }; } (operators[i].value);
        }
        
        document.getElementById('clear').onclick = reset;
           
        reset();

    }


    function update(lastDigit){
        temp = (10 * temp) + parseInt(lastDigit);
        output(temp);

    }

    

    function evaluate(operate){

        if( isClear ){
            tally = temp;
            isClear = false;

        } else {

            switch (operator){

                case '+':
                    tally += temp;
                    break;

                case '-':
                    tally -= temp;
                    break;

                case 'x':
                    tally *= temp;
                    break;

                case '/':
                    tally /= temp;
                    break;

            }
        }

        output(tally);
        temp = 0;
        operator = operate;
    }
    
    function reset(){
        tally = 0;
        operator = '+';
        temp = 0;
        isClear = true; 
        output(0);
    }
    
    function output( val ){
        document.getElementById('out').innerHTML = val;
    }

                        