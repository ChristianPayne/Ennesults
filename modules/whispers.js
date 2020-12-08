// TODO: Integrate this.

// Speak on whisper
function onWhisper(from, userstate, message,)
{
    // Don't listen to my own messages..
    if (self) return;
    
    settings.usersAllowedToWhisper.forEach((value, index) => {
        if(from.includes(value.toLowerCase()))
        {
            console.log(`[WHISPER FROM] ${from} to say : ${message}`);
            chat(message);
        }
    });
    

    // Do your stuff.
}