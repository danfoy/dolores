const { expect } = require('chai');
const ApexSeason = require('../../commands/map/ApexSeason');
const ApexPlaylist = require('../../commands/map/ApexPlaylist');

describe('@ApexPlaylist', function() {

    const season11 = {
        id: 11,
        name: 'Escape',
        maps: ["Storm Point", "World's Edge"],
        mapDurations: [90, 60, 60, 120, 90, 120],
        startTime: "2021-11-02T12:00:00Z",
        endTime: "2022-02-08T12:00:00Z",
    };

    it('returns an Array', function() {
        expect(new ApexPlaylist(new ApexSeason(season11)))
            .to.be.an('array');
    });

    it('throws if not provided with required ApexSeason properties', function() {
        expect(()=>new ApexPlaylist({})).to.throw
    });
});
