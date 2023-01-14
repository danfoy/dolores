import Event from '../Event.js';

const meta = {
  name: 'dbReady',
  once: true,
};

function action() {
  console.info('Database ready');
};

export default new Event(meta, action);
