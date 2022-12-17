const { expect } = require('chai');

describe('util.isParseableDate(target)', function() {
    const isParseableDate = require('../../utils/isParseableDate');

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
