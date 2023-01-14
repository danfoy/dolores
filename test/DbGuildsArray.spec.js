import { expect } from 'chai';
import DbGuild from '../db/DbGuild.js';
import DbGuildsArray from "../db/DbGuildsArray.js";

describe('DbGuildsArray', function() {
  const dummyGuildsData = [
    {
      alias: 'home',
      id: "700749903013609572",
      channels: [
        {
        alias: 'startupLog',
        id: '1062037995257090108',
        tags: ['startupLog'],
        },
      ],
    },
    {
      alias: 'dolores-test',
      id: '1062069617008332860',
      channels: [
        {
          alias: 'login',
          id: '1062085173841244272',
          tags: ['startupLog'],
        },
      ],
    },
  ];
  const dummyDbManager = {
    client: true,
  };
  const dummyDbGuildsArray = new DbGuildsArray(dummyDbManager, ...dummyGuildsData);

  it('aliases the Client from dbManager', function() {
    expect(dummyDbGuildsArray.client).to.equal(true);
  });

  it('extends Array', function() {
    expect(dummyDbGuildsArray instanceof Array).to.be.true;
  });

  it('contains instances of DbGuild', function() {
    dummyDbGuildsArray.forEach(guild => {
      expect(guild instanceof DbGuild).to.be.true}
    );
  });
})
