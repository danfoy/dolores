const ApexMap = require('./ApexMap');

/**
 * Generates an array of ApexMaps
 *
 * @class RotationsList
 */
class ApexPlaylist {
    /**
     *Creates an instance of RotationsList.
     * @param {array} maps
     * @param {array} durations
     * @memberof RotationsList
     */
    constructor(maps, durations) {
        if (!Array.isArray(maps) && !Array.isArray(durations))
            throw new Error('Both arguments must be Arrays');
        let timeAccumulator = 0;
        let rotations = [];
        durations.forEach( (duration) => {
            maps.forEach( (map) => {
                const thisRotation = new ApexMap(timeAccumulator, map, duration)
                timeAccumulator += duration;
                rotations.push(thisRotation);
            });
        });

        return rotations;
    }
};

module.exports = ApexPlaylist;
