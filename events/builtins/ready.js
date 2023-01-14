import Event from '../Event.js';

const meta ={
  name: 'ready',
  once: true,
};

async function action() {
  console.info('Client ready');
};

export default new Event(meta, action);
