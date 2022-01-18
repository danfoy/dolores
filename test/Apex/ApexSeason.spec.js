const { expect } = require('chai');
const { isDate } = require('../../util');
const ApexSeason = require('../../commands/map/ApexSeason');

const seasonData = {
    maps: ["Storm Point", "World's Edge"],
    mapDurations: [90, 60, 60, 120, 90, 120],
    startTime: "2021-11-02T12:00:00Z",
    endTime: "2022-02-08T12:00:00Z",
};

describe('@ApexSeason', function() {

    // I have found an error, but I will need to refactor before I can test
    // This entry was reporting -972 minutes remaining
    // it('this unknown error', function() {
    //     const seasonData = {
    //     maps: ["Storm Point", "World's Edge"],
    //     mapDurations: [90, 60, 60, 120, 90, 120],
    //     startTime: "2021-11-02T12:00:00Z",
    // };
    //     expect(new ApexPlaylist(seasonData).getMapByDate(new Date('2022-01-17T04:12:00Z')))
    //         .timeRemaining.to.be.gt(0);
    // });

    describe('.startTime', function() {
        it('returns a Date', function() {
            expect(isDate(new ApexSeason(seasonData).startTime)).to.be.true;
        });
    });

    describe('.endTime', function() {
        it('returns a Date', function() {
            expect(isDate(new ApexSeason(seasonData).endTime)).to.be.true;
        });
    });

    describe('.rotations', function() {
        it('returns an array', function() {
            expect(new ApexSeason(seasonData).playlist)
                .to.be.an('array');
        });
    });

    it("provides correct values for Season 11 'Escape'", function() {

        const seasonData = {
            maps: ["Storm Point", "World's Edge"],
            mapDurations: [90, 60, 60, 120, 90, 120],
            startTime: "2021-11-02T12:00:00Z",
            endTime: "2022-02-08T12:00:00Z",
        };

        // Exactly on rotation
        expect(new ApexSeason(seasonData).getMapByDate('2022-01-11T12:00:00Z'))
        .to.equal("World's Edge");

        // Half an hour into a map rotation
        expect(new ApexSeason(seasonData).getMapByDate('2022-01-11T12:30:00Z'))
            .to.equal("World's Edge");

        // Dates from a day manually tracking rotations
        expect(new ApexSeason(seasonData).getMapByDate('2022-01-11T13:00:00Z'))
            .to.equal("Storm Point");

        expect(new ApexSeason(seasonData).getMapByDate('2022-01-11T15:00:00Z'))
            .to.equal("World's Edge");

        expect(new ApexSeason(seasonData).getMapByDate('2022-01-11T17:00:00Z'))
            .to.equal("Storm Point");

        expect(new ApexSeason(seasonData).getMapByDate('2022-01-11T18:30:00Z'))
            .to.equal("World's Edge");

        expect(new ApexSeason(seasonData).getMapByDate('2022-01-11T20:00:00Z'))
            .to.equal("Storm Point");

        expect(new ApexSeason(seasonData).getMapByDate('2022-01-11T22:00:00Z'))
            .to.equal("World's Edge");

        expect(new ApexSeason(seasonData).getMapByDate('2022-01-12T00:00:00Z'))
            .to.equal("Storm Point");

        expect(new ApexSeason(seasonData).getMapByDate('2022-01-11T01:30:00Z'))
            .to.equal("World's Edge");

        expect(new ApexSeason(seasonData).getMapByDate('2022-01-12T03:00:00Z'))
            .to.equal("Storm Point");

        expect(new ApexSeason(seasonData).getMapByDate('2022-01-11T04:00:00Z'))
            .to.equal("World's Edge");
    });

    describe('.getMapByDate(target)', function() {

        it('throws if date not provided', function() {
            expect(()=>new ApexSeason(seasonData).getMapByDate())
                .to.throw;
        });

        it('throws if requested date is out of bounds', function() {

            // This date is out of bounds
            expect(function() { new ApexSeason(seasonData).getMapByDate('2022-02-09T12:00:00Z')})
                .to.throw();

            // This date is not out of bounds
            expect(function() { new ApexSeason(seasonData).getMapByDate('2022-01-09T12:00:00Z')})
                .to.not.throw();
        });

         it('accepts a Date object as a parameter', function() {
            expect(new ApexSeason(seasonData).getMapByDate(new Date('2022-01-11T04:00:00Z')))
            .to.equal("World's Edge");
        });

        it('accepts an ISO date string as a parameter', function() {
            expect(new ApexSeason(seasonData).getMapByDate('2022-01-11T04:00:00Z'))
            .to.equal("World's Edge");
        });
    });

});
