module( "calculator module", {
    setup: function() {
        ok(calculator , 'first check is calc is defined');
        strictEqual(calculator.clear() , 0, 'clear should yield "0"');
    }
});

test('test plus' , function(){
    strictEqual(calculator.enterNumber('9') , '9', '"0" "9"="9"');
    strictEqual(calculator.enterNumber('9'), '99' , '"9" + "9" = "99"');
    strictEqual(calculator.enterOperator('+') , 99 , '"99" = 99');
    strictEqual(calculator.enterNumber('1') , '1' , '"99" + "+" + "1" = "1"');
    strictEqual(calculator.enterOperator('=') , 100 , 'add to 100');
    ok(true , 'kalookaley');
});
