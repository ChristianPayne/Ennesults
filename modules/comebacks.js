const { chat } = require('../modules/core');
const { comebacks, settings } = require('../helpers/files').files;
const { getUserFromUsername, replaceChatVariables } = require('../helpers/helpers');
// TODO: Integrate this.

let lastComebackUsed;

function onMessage(channel, tags, message) 
{
    // Look for people @ing
    if(!message.toLowerCase().includes("@ennesults"))
        return;

    if(tags.username === 'ennesults')
        return;

    // Get the user from the username.
    const user = getUserFromUsername(tags.username);
    
    if(!user)
    {
        console.log("Can not get user from username.");
        return;
    }
    
    sayRandomComeback(user);
}

function sayRandomComeback(user)
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
        
        let comeback = replaceChatVariables(chosenComeback, user.username, settings.channel);

        // if(user.checkInsultability())
        // {
            chat(comeback);
        // }
        
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

module.exports = { onMessage }