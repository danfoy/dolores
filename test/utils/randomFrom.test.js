import { expect } from 'chai';
import randomFrom from '../../utils/randomFrom.js';

describe('util.randomFrom(list, quantity, options)', function() {

    it('throws when input is not an array', function() {
        expect(()=>randomFrom({sampletype: "object"})).to.throw;
    });

    describe('Single item mode', function() {
        it('returns a single item in its original type', function() {
            expect(randomFrom([1, 2, 3])).to.be.a('number');
            expect(randomFrom([true, true, true])).to.be.a('boolean');
            expect(randomFrom(['one', 'two', 'three'])).to.be.a('string');
        });
    });

    describe('Multiple item mode', function() {
        it('returns a list of items', function() {
            expect(randomFrom([1, 2, 3], 2)).to.be.an('array');
        });
        it('returns large arrays in non-subtractive mode', function() {
            expect(randomFrom([1,2], 25, {subtractive: false})).to.be.lengthOf(25);
        });
        it('only contains items from the input', function() {
            expect(randomFrom([1,2], 25, {subtractive: false})).to.include.members([1,2]);
            expect(randomFrom([1,2], 25, {subtractive: false})).to.not.include(undefined);
        });

        it("doesn't return duplicates in subtractive mode", function() {
            function checkDuplicates() {
                const results = [];
                for (let i = 0; i < 100; i++) {
                    results.push(randomFrom([1, 2, 3], 2))
                };
                return results.filter(result => result[0] == result[1]);
            };

            expect(checkDuplicates()).to.be.empty;
        });

        it('throws when subtractive and requesting > input size', function() {
            expect(()=>randomFrom(['item1', 'item2'], 2, {subtractive: true})).to.throw;
        });
    });
});
