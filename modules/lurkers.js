// Users
const User = require('../helpers/user');

const { chat } = require('./core');

// Runtime array of lurkers in chat.
const lurkers = [];

function onMessage (_channel, tags, _message)
{
    let foundUser = false;
    lurkers.some((value) => {
        if(value.getUsername() === tags.username)
        {
            chat(`Its been ${value.timeSinceLastMessage() / 1000} seconds since ${tags.username} last spoke.`);
            value.updateLastMessageTime();
            foundUser = true;
        }
    });

    if(!foundUser)
    {
        lurkers.push(new User(tags.username));
    }
}

function getLurkers ()
{
    return lurkers;
}

module.exports = {
    onMessage,
    getLurkers
}