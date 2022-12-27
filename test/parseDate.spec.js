import { expect } from 'chai';
import  parseDate, { isValidDate } from '../utils/parseDate.js';

describe('parseDate utility', function() {

    it('throws if target is not supplied', function() {
        expect(()=>parseDate()).to.throw;
    });

    it('returns null if the target is not parseable', function() {
        expect(parseDate('foo')).to.be.null;
        expect(parseDate('2022-13-11T12:00:00Z')).to.be.null;
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

describe('isValidDate utility', function() {

    it('returns true when target is an instance of Date', function() {
        expect(isValidDate(new Date())).to.be.true;
    });

    it('returns false when the target is not an instance of Date', function() {
        expect(isValidDate('foo')).to.be.false;
        expect(isValidDate(12)).to.be.false;
        expect(isValidDate('2022-01-11T12:00:00Z')).to.be.false;
    });
});
