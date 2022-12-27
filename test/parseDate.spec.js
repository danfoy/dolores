import { expect } from 'chai';
import parseDate from '../utils/parseDate.js';

describe('util.parseDate(target)', function() {

    it('throws if target is not supplied', function() {
        expect(()=>parseDate()).to.throw;
    });

    it('throws if the target is an invalid date ISO string', function() {
        expect(()=>parseDate('foo')).to.throw;
        expect(()=>parseDate('2022-13-11T12:00:00Z')).to.throw;
    });

    it('returns the target if it is already an instance of Date', function() {
        const dateExample = new Date('2021-01-21T03:00:00Z');
        const dateCopy = new Date('2021-01-21T03:00:00Z');
        expect(parseDate(dateExample)).to.deep.equal(dateCopy);
    });

    it('returns an instance of Date if target is a valid date ISO string', function() {
        expect(parseDate('2022-01-11T12:00:00Z').getMonth()).to.equal(0);
    });
});
