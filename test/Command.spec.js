import { expect } from 'chai';
import Command from "../classes/Command.js";

describe('Command', function(){
    it('throws if command data not provided', function() {
        expect(()=> new Command({}, ()=>{})).to.throw();
        expect(()=> new Command({name: 4}, ()=>{})).to.throw();
    });

    it('throws if command action not provided', function() {
        expect(()=> new Command({name:'test'}))
            .to.throw('Command action not provided');
        expect(()=> new Command({name:'test'}, null))
            .to.throw('Command action not provided');
    });

    it('has a data.name property', function() {
        const testData = {name: 'testName'};
        const testCommand = new Command(testData, ()=>{});
        expect(testCommand.data.name).to.equal(testData.name);
    });

    it('has an execute function', function() {
        const testFunction = ()=>{return true};
        const testCommand = new Command({name: 'test'}, testFunction);
        expect(testCommand.execute).to.eql(testFunction);
    });
});
