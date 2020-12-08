const chat = require('./core').chat;

const { insults, settings } = require('./files').files;

// Runtime number of how many seconds passed since last insult.
const insultTimePassed = 0;
// Runtime number of how many lines of chat have passed since last insult.
const chatLinesPassed = 0;
// Runtime variable of the last user that was insulted.
let lastUserInsulted;
// Runtime variable of the last insult used.
let lastInsultUsed;
// Runtime variable of the last interval that was set.
let insultInterval = null;

// Listener for messages.
function onMessage (_channel, tags, _message)
{
    addUserToInsultTargets(tags.username);
}
// Listener for people joining the channel.
function onJoin (_channel, username)
{
    addUserToInsultTargets(username);
}
// Listener for people leaving the channel.
function onPart (_channel, username)
{
    removeUserFromInsultTargets(username);
}
// Adds a user to the insult list if they aren't already in it.
function addUserToInsultTargets (username)
{
    // Get the current insult targets array.
    const { consenters, insultTargets } = require('./chat');

    if(consenters.includes(username))
    {
        // Checks the list for their name already.
        if(insultTargets.includes(username))
        {
            return;
        }
        else
        {
            insultTargets.push(username);
            console.log(`CONSOLE: ${username} has become a target.`);
        }
    }
}
// Removes a user from the insult list if they are on it.
function removeUserFromInsultTargets (username)
{
    // Get the current insult targets array.
    const { insultTargets } = require('./chat');

    let removedUserIndex = insultTargets.indexOf(username);
    if(removedUserIndex !== -1)
    {
        insultTargets.splice(removedUserIndex, 1);
        console.log(`CONSOLE: ${username} was removed from the insults list.`);
    }
}

// Starts the insult timer if there isnt already one running.
function startInsultTimer ()
{
    if(insultInterval) return;

    insultInterval = setInterval(() => 
    {
        sayRandomInsult();
    }, settings.insultIntervalTime * 1000);
}

// Stops the insult timer if there is one running.
function stopInsultTimer ()
{
    clearTimeout(insultInterval);
    chat('Okay, okay. I\'m calm. I\'m good...');
}

// Does all the work to get and say a random insult at specified user. If no user is given, pick someone random.
function sayRandomInsult (targetedUser = undefined)
{
    const { insultTargets, formatInsult } = require('./chat');

    // Make sure that we have at least one target.
    if(insultTargets.length > 0)
    {
        // Make sure we aren't getting the same insult as last time.
        let randInsult;
        let chosenUser;
        do
        {
            randInsult = getRandomInsult();
        } while(randInsult === lastInsultUsed)

        // Check to make sure that we are not picking the same person as last insult.
        if(targetedUser === undefined)
        {
            let randTargetIndex;
            
            do {
                randTargetIndex = Math.floor(Math.random() * insultTargets.length);
                if(insultTargets.length <= 1)
                {
                    break;
                }
            } while (checkInsultability(insultTargets[randTargetIndex]) && insultTargets[randTargetIndex] === lastUserInsulted);

            chosenUser = insultTargets[randTargetIndex];
        }
        else //Use the supplied user as the target.
        {
            chosenUser = targetedUser;
        }
        
        // Format the insult message and say it.
        chat(formatInsult(randInsult, chosenUser, settings.channel));

        // Set the last user insulted to the one we just picked.
        lastUserInsulted = chosenUser;
        // Set the last insult to the one we just picked.
        lastInsultUsed = randInsult;
    }
    else
    {
        console.log('CONSOLE: No one is here for me to insult...');
    }
}
// Returns a random insult from the list of insults.
function getRandomInsult ()
{
    if(!insults.length > 0)
        return;
    
    const randomIndex = Math.floor(Math.random() * (insults.length));
    const chosenInsult = insults[randomIndex];
    return chosenInsult;
}

module.exports = {
    onMessage, 
    onJoin, 
    onPart, 
    startInsultTimer, 
    stopInsultTimer,
    sayRandomInsult
};