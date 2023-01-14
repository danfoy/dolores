import { expect } from 'chai';
import sinon from 'sinon';
import ownName, { respond } from '../triggers/ownName.js';

describe('ownName trigger', () => {

  describe('response', () => {

    /**
    * TODO: The command now replies rather than sends a new channel message
    */
    // it('replies to the message channel', () => {
    //   const dummyMessage = { channel: { send: () => 'called'}};
    //   sinon.replace(dummyMessage.channel, "send", sinon.fake(dummyMessage.channel.send));
    //   respond(dummyMessage);
    //   expect(dummyMessage.channel.send.callCount).to.equal(1);
    //   sinon.restore();
    // });
  });

  describe('isMatch method', () => {
    it('is triggered by dolores', () => {
      const message = 'hello dolores';
      expect(ownName.isMatch(message)).to.be.true;
    });

    it('is triggered by delores typo', () => {
      const message = 'delores, whats up?';
      expect(ownName.isMatch(message)).to.be.true;
    });

    it('is not triggered by other names', () => {
      const message = 'hi arnold';
      expect(ownName.isMatch(message)).to.be.false;
    });
  });
});
