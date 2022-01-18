const { expect } = require('chai');
const ApexMap = require('../../commands/map/ApexMap');

describe('@ApexMap', function() {
    it('returns an object', function() {
        expect(new ApexMap(20, 'we', 30))
            .to.deep.equal({offset: 20, map: 'we', duration: 30});
    });
});
