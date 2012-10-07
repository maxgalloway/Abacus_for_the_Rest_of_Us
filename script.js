var calculator = {
    tally : 0,

    operator : '+',

    temp : 0,

    isClear : true,

    setup : function(){
        var numbers = document.getElementsByClassName('number');
        var operators = document.getElementsByClassName('operator');

        for (var i = 0; i < numbers.length; i++) {
            
            numbers[i].onclick = function(){calculator.update(this.value)};
        }

        for( var k = 0; k < operators.length; k++){
            operators[k].onclick = function(){calculator.evaluate(this.value)};
        }

        document.getElementById('clear').onclick = function(){calculator.reset()};
    },
    
    output : function ( val ){
        document.getElementById('out').innerHTML = val;
    },

    update : function(lastDigit){
        this.temp = (10 * this.temp) + parseInt(lastDigit);
        this.output(this.temp);
    },

    evaluate : function(operate){
        if( this.isClear ){
            this.tally = this.temp;
            this.isClear = false;

        } else {

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

        this.output(this.tally);
        this.temp = 0;
        this.operator = operate;
    },

    reset : function(){
        console.log(typeof this);
               console.log(this.tally);
        console.log(this.temp);
        this.tally = 0;
        this.operator = '+';
        this.temp = 0;
        this.isClear = true; 
        console.log(this.tally);
        console.log(this.temp);
        calculator.output(0);
    }

};

calculator.setup();

//var tally , operator , temp , isClear;
//    
//    setup();
//
//    function setup(){
//
//        var numbers = document.getElementsByClassName('number');
//        var operators = document.getElementsByClassName('operator');
//        
//        for (var i = 0; i < numbers.length; i++) {
//            numbers[i].onclick = function(j) { return function() { update(j); }; } (numbers[i].value);
//        }
//        
//        for( var i = 0; i < operators.length; i++){
//            operators[i].onclick = function(j){ return function() { evaluate(j); }; } (operators[i].value);
//        }
//        
//        document.getElementById('clear').onclick = reset;
//           
//        reset();
//
//    }
//
//
//    function update(lastDigit){
//        temp = (10 * temp) + parseInt(lastDigit);
//        output(temp);
//
//    }
//
//    
//
//    function evaluate(operate){
//
//        if( isClear ){
//            tally = temp;
//            isClear = false;
//
//        } else {
//
//            switch (operator){
//
//                case '+':
//                    tally += temp;
//                    break;
//
//                case '-':
//                    tally -= temp;
//                    break;
//
//                case 'x':
//                    tally *= temp;
//                    break;
//
//                case '/':
//                    tally /= temp;
//                    break;
//
//            }
//        }
//
//        output(tally);
//        temp = 0;
//        operator = operate;
//    }
//    
//    function reset(){
//        tally = 0;
//        operator = '+';
//        temp = 0;
//        isClear = true; 
//        output(0);
//    }
//    
//    function output( val ){
//        document.getElementById('out').innerHTML = val;
//    }

                        