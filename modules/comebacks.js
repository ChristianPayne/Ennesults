const core = require('./core.js');

core.client.on('message', (channel, tags, message, self) => 
{
    if(!message.startsWith('!'))
    {
        // Look for people @ing
        if(message.toLowerCase().includes("@ennesults") && tags.username !== 'ennesults')
        {
            if(checkInsultability(tags.username))
            {
                sayRandomComeback(tags.username);
            }
            else
            {
                console.log(`${username} is not insultable.`);
            }
        }
        return;
    }
});