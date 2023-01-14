import { expect } from 'chai';

import DbChannel from "../db/DbChannel.js";
import config from '../config.js';

const testData = {
  guilds: [
    {
      alias: 'home',
      id: "700749903013609572",
      channels: [
        {
          alias: 'logging',
          id: "705184339247497286"
        },
        {
          alias: 'startupLog',
          id: '1062037995257090108',
          tags: [
            'startupLog',
          ],
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
          tags: [
            'startupLog',
          ],
        },
      ],
    },
  ],
};

// const testChannel = new DbChannel

describe('DbChannel', function() {
  describe('constructor', function() {
    it('throws if Client missing', function() {
      const testData = {
        alias: 'startupLog',
        id: '1062037995257090108',
        tags: [
          'startupLog',
        ],
      };

    });
  });
});
