const { isDate, parseDate } = require('../../util');
const ApexPlaylist = require('./ApexPlaylist');

module.exports = class ApexSeason {
    constructor (seasonData) {
        this.maps = seasonData.maps;
        this.durations = seasonData.mapDurations;
        this.startTime = parseDate(seasonData.startTime);
        this.endTime = parseDate(seasonData.endTime);
        this.playlist = new ApexPlaylist(this.maps, this.durations);
    };

    get currentMap() {
        const currentIndex = this.getPlaylistIndex();
        const thisRotation = this.playlist[currentIndex];
        const nextRotation = currentIndex + 1 === this.playlist.length
            ? this.playlist[0]
            : this.playlist[currentIndex + 1];
        return {
            map: thisRotation.map,
            duration: thisRotation.duration,
            timeRemaining: nextRotation.offset - this.getOffset()
        };
    };

    get nextMap() {
        const currentMapIndex = this.getPlaylistIndex();
        // Indexes need to loop if we're at the end of the playlist
        const nextMapIndex = currentMapIndex + 1 < this.playlist.length
            ? currentMapIndex + 1
            : 0
        const nextMap = this.playlist[nextMapIndex];
        return {
            map: nextMap.map,
            duration: nextMap.duration
        };
    };

    get playlistTotalDuration() {
        return this.playlist.reduce( (accumulator, currentItem) => {
            return accumulator + currentItem.duration;
        }, 0);
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
        return this.playlist.findIndex(map => map.offset + map.duration > offset);
    };

    getMapByDate(target) {
        if (!target) throw new Error(`Target date is required and not provided`);
        if (!isDate(target)) target = new Date(target);
        if (!isDate(target)) throw new Error(`Unable to parse date from ${target}`);
        if (target > this.endTime) throw new Error('Requested date is out of bounds for this season');
        return this.playlist[this.getPlaylistIndex(target)].map;
    };
};
