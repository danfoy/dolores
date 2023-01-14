import { expect } from 'chai';
import sinon from 'sinon';
import Command from '../commands/Command.js';
import { deployGuildCommands } from '../commands/CommandManager.js';

describe('registerCommands', function() {

  it('throws if Client not supplied', function() {
    expect(()=>{registerCommands()}).to.throw('No Client supplied');
    expect(()=>{registerCommands(true)}).to.throw('No Client supplied');
  });

  it('throws if no commands supplied', function() {
    expect(()=>{registerCommands({}, [])}).to.throw('No Commands supplied');
  });

  it('attaches commands to the client', function() {
    const testCommand = new Command({name: "testCommand"}, ()=>{});
    const testClient = {};
    registerCommands(testClient, [testCommand]);
    expect(testClient.commands.size).to.equal((1));
  });
});

describe('deployGuildCommands', function() {

  it('attempts a PUT request', function() {
    const testRest = {put: function(){return false}};
    const testCommand = new Command({name: "testCommand"}, ()=>{});

    sinon.replace(testRest, 'put', sinon.fake.returns(()=>{}));
    deployGuildCommands(testRest, 123, 456, [testCommand]);
    expect(testRest.put.callCount).to.equal(1);

    sinon.restore();
  });

  it('logs failures to the console', function() {
    const testRest = {put: function(){return true}};
    const testCommand = new Command({name: "testCommand"}, ()=>{});

    sinon.replace(testRest, 'put', sinon.fake.throws());
    sinon.replace(console, 'error', sinon.fake.returns(()=>{}));
    deployGuildCommands(testRest, 123, 456, [testCommand]);

    expect(console.error.callCount).to.equal(1);

    sinon.restore();
  });
});
