import { expect } from 'chai';
import DbChannelsArray from '../db/dbChannelsArray.js'
import DbManager from '../db/DbManager.js';
import config from '../config.js';

const dummyClient = true;
const dummyManager = new DbManager(dummyClient, config);
const dummyDbChannelsArray = new DbChannelsArray(dummyManager, );
const exampleChannelsData = config.db.guilds[0].channels;

