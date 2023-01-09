import Event from '../classes/Event.js';

const meta ={
    name: 'ready',
    once: true,
};

async function action(client) {
    console.info('Discord Client ready');
};

export default new Event(meta, action);
