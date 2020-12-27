// TODO: Integrate this.
const core = require('./core');
const { files } = require('./files');

// Speak on whisper
function onWhisper(from, _userstate, message, self)
{
    // Don't listen to my own messages..
    if (self) return;

    files.settings.usersAllowedToWhisper.forEach((value, index) => {
        if(from.includes(value.toLowerCase()))
        {
            console.log(`[WHISPER FROM] ${from} to say : ${message}`);
            core.chat(message);
        }
    });
}

module.exports = {
    onWhisper
}