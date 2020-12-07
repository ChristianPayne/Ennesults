// TODO: Integrate this.
// TODO: Make this into a function instead of a listener.

// Speak on whisper
client.on("whisper", (from, userstate, message, self) => 
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
});