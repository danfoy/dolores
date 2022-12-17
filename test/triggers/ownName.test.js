const { expect } = require('chai');
const ownName = require('../../triggers/ownName');

describe('ownName trigger', function() {

    it('is triggered by dolores', function() {
        const message = 'hello dolores';
        expect(ownName.isMatch(message)).to.be.true;
    });

    it('is triggered by delores typo', function() {
        const message = 'delores, whats up?';
        expect(ownName.isMatch(message)).to.be.true;
    });

    it('is not triggered by other names', function() {
        const message = 'hi arnold';
        expect(ownName.isMatch(message)).to.be.false;
    });
});
