import { expect } from 'chai';
import isParseableDate from '../utils/isParseableDate.js';

describe('util.isParseableDate(target)', function() {

    it('returns true when passed a date', function() {
        expect(isParseableDate(new Date())).to.be.true;
    });

    it('returns true when passed an ISO date string', function() {
        expect(isParseableDate('2022-01-11T12:00:00Z')).to.be.true;
    });

    it('returns false when passed an invalid ISO date string', function() {
        expect(isParseableDate('foo')).to.be.false;
    });
});
