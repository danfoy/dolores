import { expect } from 'chai';
import DbGuild from '../db/DbGuild.js';
import config from '../config.js';

const exampleGuild = config.db.guilds[0];

// {
//   alias: 'home',
//   id: "700749903013609572",
//   channels: [
//     ...
//     {
//       alias: 'startupLog',
//       id: '1062037995257090108',
//       tags: [
//         'startupLog',
//       ],
//     },
//   ],
// },

const dummyDbManager = {
  client: true,
};

const dummyDbGuild = new DbGuild(dummyDbManager, exampleGuild);

describe('DbGuild', function() {

  it('aliases the root client', function() {
    expect(dummyDbGuild.client).to.be.true;
  });

  it('saves the name as an alias property', function() {
    expect(dummyDbGuild.alias).to.equal('home');
  })

  it('has an array of DbChannels', function() {
    expect(dummyDbGuild.dbChannels.length).to.be.gt(1);
  });
});
