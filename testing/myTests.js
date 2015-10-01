/**
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
 * along with this program. If not, see <http:*www.gnu.org/licenses/>.
 * 
 * email me at: webmaster@pwipw.com
 * source code: https://github.com/maxgalloway/Abacus_for_the_Rest_of_Us
 */
module( "calculator module", {
    setup: function() {
        ok(calculator , 'first check is calc is defined');
        strictEqual(calculator.clear() , 0, 'clear should yield "0"');
    }
});

test('test add' , function(){
    strictEqual(calculator.enterNumber('9') , '9');
    strictEqual(calculator.enterNumber('9'), '99');
    
    strictEqual(calculator.enterNumber('.') , '99.');
    strictEqual(calculator.enterNumber('5') , '99.5');
    
    strictEqual(calculator.enterOperator('+') , 99.5);
    strictEqual(calculator.enterNumber('1') , '1');
    strictEqual(calculator.enterOperator('=') , 100.5);
    
    strictEqual(calculator.enterOperator('+') , 100.5);
    strictEqual(calculator.enterNumber('3') , '3');
    strictEqual(calculator.enterOperator('+') , 103.5);
    strictEqual(calculator.enterNumber('42.5') , '42.5');
    strictEqual(calculator.enterOperator('=') , 146);
});

test('test subtract' , function(){
    strictEqual(calculator.enterNumber('9') , '9');
    strictEqual(calculator.enterNumber('9'), '99');
    
    strictEqual(calculator.enterNumber('.') , '99.');
    strictEqual(calculator.enterNumber('5') , '99.5' , 'tenths');
    
    strictEqual(calculator.enterOperator('-') , 99.5);
    strictEqual(calculator.enterNumber('1') , '1');
    strictEqual(calculator.enterOperator('=') , 98.5);
    
    strictEqual(calculator.enterOperator('-') , 98.5);
    strictEqual(calculator.enterNumber('3') , '3');
    strictEqual(calculator.enterOperator('-') , 95.5);
    strictEqual(calculator.enterNumber('42.5') , '42.5');
    strictEqual(calculator.enterOperator('=') , 53);
});

test('test multiply' , function(){
    strictEqual(calculator.enterNumber('9') , '9');
    strictEqual(calculator.enterNumber('9'), '99');
    
    strictEqual(calculator.enterNumber('.') , '99.');
    strictEqual(calculator.enterNumber('5') , '99.5');
    
    strictEqual(calculator.enterOperator('x') , 99.5);
    strictEqual(calculator.enterNumber('1') , '1');
    strictEqual(calculator.enterOperator('=') , 99.5);
    
    strictEqual(calculator.enterOperator('x') , 99.5);
    strictEqual(calculator.enterNumber('3') , '3');
    strictEqual(calculator.enterOperator('x') , 298.5);
    strictEqual(calculator.enterNumber('42.5') , '42.5');
    strictEqual(calculator.enterOperator('=') , 12686.25);
});

test('test divide' , function(){
    strictEqual(calculator.enterNumber('9') , '9');
    strictEqual(calculator.enterNumber('9'), '99');
    
    strictEqual(calculator.enterNumber('.') , '99.');
    strictEqual(calculator.enterNumber('5') , '99.5');
    
    strictEqual(calculator.enterOperator('/') , 99.5);
    strictEqual(calculator.enterNumber('1') , '1');
    strictEqual(calculator.enterOperator('=') , 99.5);
    
    strictEqual(calculator.enterOperator('/') , 99.5);
    strictEqual(calculator.enterNumber('3') , '3');
    strictEqual(calculator.enterOperator('/') , 33.167);
    strictEqual(calculator.enterNumber('42.5') , '42.5');
    strictEqual(calculator.enterOperator('=') , .780);
});