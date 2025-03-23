import {formatCurrency} from '../js/money.js';

describe('test suite: formatCurrency',()=>{
    it('works with 0',()=>{
        expect(formatCurrency(0)).toEqual('0.00');
    }); 
});