const { isDate } = require('../../util');

module.exports = class ApexPlaylist {
    constructor (seasonData) {
        this.maps = seasonData.maps;
        this.durations = seasonData.mapDurations;
        this.startTime = new Date(seasonData.startTime);
        this.endTime = new Date(seasonData.endTime);
        this.rotations = this.getRotations();
    };

    get currentMap() {
        const currentIndex = this.getPlaylistIndex();
        const thisRotation = this.rotations[currentIndex];
        const nextRotation = currentIndex + 1 === this.rotations.length
            ? this.rotations[0]
            : this.rotations[currentIndex + 1];
        return {
            map: thisRotation.map,
            duration: thisRotation.duration,
            timeRemaining: nextRotation.offset - this.getOffset()
        };
    };

    get nextMap() {
        const currentMapIndex = this.getPlaylistIndex();
        // Indexes need to loop if we're at the end of the playlist
        const nextMapIndex = currentMapIndex + 1 < this.rotations.length
            ? currentMapIndex + 1
            : 0
        const nextMap = this.rotations[nextMapIndex];
        return {
            map: nextMap.map,
            duration: nextMap.duration
        };
    };

    get playlistTotalDuration() {
        return this.rotations.reduce( (accumulator, currentItem) => {
            return accumulator + currentItem.duration;
        }, 0);
    };

    getRotations() {
        let timeAccumulator = 0;
        let rotations = []
        this.durations.forEach( (duration) => {
            this.maps.forEach( (map) => {
                const thisRotation = {
                    offset: timeAccumulator,
                    map: map,
                    duration: duration
                };
                timeAccumulator += duration;
                return rotations.push(thisRotation);
            });
        });
        return rotations;
    };

    getOffset(target = new Date()) {
        // times are converted to minutes
        const targetTime = (target.getTime() / 1000 / 60);
        const startTime = (this.startTime.getTime() / 1000 / 60);
        const offset = Math.floor(( ( targetTime - startTime ) % this.playlistTotalDuration ));
        if (Number.isNaN(offset)) throw new Error(`Unable to get requested offset; got '${offset}'`);
        return offset;
    };

    getPlaylistIndex(target = new Date()) {
        const offset = this.getOffset(target);
        return this.rotations.findIndex(map => map.offset + map.duration > offset);
    };

    getMapByDate(target) {
        if (!target) throw new Error(`Target date is required and not provided`);
        if (!isDate(target)) target = new Date(target);
        if (!isDate(target)) throw new Error(`Unable to parse date from ${target}`);
        if (target > this.endTime) throw new Error('Requested date is out of bounds for this season');
        return this.rotations[this.getPlaylistIndex(target)].map;
    };
};
