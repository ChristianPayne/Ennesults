require('dotenv').config();
const tmi = require('tmi.js');
const { settings } = require('../helpers/files').files;

// Connect with credentials
const client = new tmi.Client({
    options: { debug: true },
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username : process.env.BOT_USERNAME,
        password : process.env.BOT_PASSWORD
    },
    channels: [ settings.channel ]
});
client.connect();

// How to say something in the chat.
function chat (message)
{
    // FIXME: This is hard coded to one channel.
    client.say(client.channels[0], message);
}


module.exports = {
    client,
    chat
};