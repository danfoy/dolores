const { expect } = require('chai');
const ApexPlaylist = require('../../commands/map/ApexPlaylist');

describe('@ApexPlaylist', function() {

    it('throws if not provided two arrays as arguments', function() {
        expect(()=>new ApexPlaylist()).to.throw;
        expect(()=>new ApexPlaylist(1, 2)).to.throw;
        expect(()=>new ApexPlaylist('one', 'two')).to.throw;
    });

    it('returns an Array', function() {
        expect(new ApexPlaylist(['kc', 'we'], [20, 30]))
            .to.be.a('array');
    })
})
