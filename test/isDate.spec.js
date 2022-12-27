import { expect } from 'chai';
import isDate from '../utils/isDate.js';

describe('util.isDate(target)', function() {

    it('returns true when target is an instance of Date', function() {
        expect(isDate(new Date())).to.be.true;
    });

    it('returns false when the target is not an instance of Date', function() {
        expect(isDate('foo')).to.be.false;
        expect(isDate(12)).to.be.false;
        expect(isDate('2022-01-11T12:00:00Z')).to.be.false;
    });
});
