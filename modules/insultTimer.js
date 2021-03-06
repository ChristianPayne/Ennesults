const chat = require('./core').chat;

const { insults, settings } = require('../helpers/files').files;

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
    // addUserToInsultTargets(tags.username);
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
    if(insultInterval)
    {
        chat('Okay, okay. I\'m calm. I\'m good...');
    }
    else
    {
        chat('I\'m calm already, sheeeeeesh.');
    }
    clearTimeout(insultInterval);
}

// Does all the work to get and say a random insult at specified user. If no user is given, pick someone random.
function sayRandomInsult (targetedUser = undefined)
{
    const { formatInsult, getInsultableUsers } = require('./chat');

    const insultTargets = getInsultableUsers();

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
            } while (insultTargets[randTargetIndex] === lastUserInsulted);

            chosenUser = insultTargets[randTargetIndex];
        }
        else //Use the supplied user as the target.
        {
            chosenUser = insultTargets.find((value)=>{
                if(targetedUser === value.getUsername())
                {
                    return value;
                }
                else
                {
                    return false;
                }
            });
        }

        if(chosenUser === undefined)
        {
            chat("I can't provoke someone that who's not evenne here. FailFish");
            return;
        }
        else
        {
            // Format the insult message and say it.
            chat(formatInsult(randInsult, chosenUser.getUsername(), settings.channel));
        }
        

        // Set the last user insulted to the one we just picked.
        lastUserInsulted = chosenUser;
        // Set the last insult to the one we just picked.
        lastInsultUsed = randInsult;
    }
    else
    {
        console.log('CONSOLE: No one is here for me to insult or everyone is lurking.');
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
    startInsultTimer, 
    stopInsultTimer,
    sayRandomInsult
};