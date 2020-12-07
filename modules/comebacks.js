const core = require('./core.js');
// TODO: Integrate this.

// let lastComebackUsed;

// TODO: Make this into a function, not a listener.
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

function sayRandomComeback(toUser)
{
    setTimeout(() => {
        if(!comebacks.length > 0)
        return;
        
        let randomIndex;
        let chosenComeback;
        
        // Make sure the new comeback is not the same as the one that we had the last time.
        do {
            randomIndex = Math.floor(Math.random() * comebacks.length);
            chosenComeback = comebacks[randomIndex];
        } while (chosenComeback === lastComebackUsed);
        
        

        let comeback = replaceChatVariables(chosenComeback, toUser, settings.channel);

        if(checkInsultability(toUser))
        {
            chat(comeback);
        }
        
        lastComebackUsed = chosenComeback;
    }, 2000);
}

function addComebackAndSave (comeback)
{
    if(!comebacks.includes(comeback))
    {
        comebacks.push(comeback);
        
        fs.writeFile('./Assets/comebacks.json', JSON.stringify(comebacks), (error)=>
        {
            error ? console.log("ERROR: " + error) : console.log('CONSOLE: Saved comebacks to file.');
        });

        chat('/me Comeback has been added.');
    }
    else
    {
        chat("/me Comeback already added.");
    }
}