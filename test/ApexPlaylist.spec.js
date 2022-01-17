const { expect } = require('chai');
const ApexPlaylist = require('../commands/map/ApexPlaylist');

describe('@ApexPlaylist', function() {

    it('throws if requested date is out of bounds', function() {
        const seasonData = {
            maps: ["Storm Point", "World's Edge"],
            mapDurations: [90, 60, 60, 120, 90, 120],
            startTime: "2021-11-02T12:00:00Z",
            endTime: "2022-02-08T12:00:00Z",
        };

        // This date is out of bounds
        expect(function() { new ApexPlaylist(seasonData).getMapByDate(new Date('2022-02-09T12:00:00Z'))})
            .to.throw();

        // This date is not out of bounds
        expect(function() { new ApexPlaylist(seasonData).getMapByDate(new Date('2022-01-09T12:00:00Z'))})
            .to.not.throw();
    });

    it("provides correct values for Season 11 'Escape'", function() {

        // Values for Season 11
        const seasonData = {
            maps: ["Storm Point", "World's Edge"],
            mapDurations: [90, 60, 60, 120, 90, 120],
            startTime: "2021-11-02T12:00:00Z",
        };

        // Exactly on rotation
        expect(new ApexPlaylist(seasonData).getMapByDate(new Date('2022-01-11T12:00:00Z')))
        .to.equal("World's Edge");

        // Half an hour into a map rotation
        expect(new ApexPlaylist(seasonData).getMapByDate(new Date('2022-01-11T12:30:00Z')))
            .to.equal("World's Edge");

        // Dates from a day manually tracking rotations
        expect(new ApexPlaylist(seasonData).getMapByDate(new Date('2022-01-11T13:00:00Z')))
            .to.equal("Storm Point");

        expect(new ApexPlaylist(seasonData).getMapByDate(new Date('2022-01-11T15:00:00Z')))
            .to.equal("World's Edge");

        expect(new ApexPlaylist(seasonData).getMapByDate(new Date('2022-01-11T17:00:00Z')))
            .to.equal("Storm Point");

        expect(new ApexPlaylist(seasonData).getMapByDate(new Date('2022-01-11T18:30:00Z')))
            .to.equal("World's Edge");

        expect(new ApexPlaylist(seasonData).getMapByDate(new Date('2022-01-11T20:00:00Z')))
            .to.equal("Storm Point");

        expect(new ApexPlaylist(seasonData).getMapByDate(new Date('2022-01-11T22:00:00Z')))
            .to.equal("World's Edge");

        expect(new ApexPlaylist(seasonData).getMapByDate(new Date('2022-01-12T00:00:00Z')))
            .to.equal("Storm Point");

        expect(new ApexPlaylist(seasonData).getMapByDate(new Date('2022-02-11T01:30:00Z')))
            .to.equal("World's Edge");

        expect(new ApexPlaylist(seasonData).getMapByDate(new Date('2022-01-12T03:00:00Z')))
            .to.equal("Storm Point");

        expect(new ApexPlaylist(seasonData).getMapByDate(new Date('2022-02-11T04:00:00Z')))
            .to.equal("World's Edge");
    });

});
