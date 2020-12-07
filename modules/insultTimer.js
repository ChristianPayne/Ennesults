// TODO: Integrate this.


// const insultTimePassed = 0;
// const chatLinesPassed = 0;

// let lastUserInsulted;
// let lastInsultUsed;

let insultInterval = null;

function onMessage (channel, tags, message)
{
    console.log('Here');
}

function startInsultTimer ()
{
    chat("Brace yourselves...");
    insultInterval = setInterval(() => 
    {
        sayRandomInsult();
    }, settings.insultIntervalTime * 1000);
}

function stopInsultTimer ()
{
    clearTimeout(insultInterval);
    chat('Okay, okay. I\'m calm. I\'m good...');
}

function getRandomInsult ()
{
    if(!insults.length > 0)
        return;
    
    const randomIndex = Math.floor(Math.random() * (insults.length));
    const chosenInsult = insults[randomIndex];
    return chosenInsult;
}

function addUserToInsultList (username)
{
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

function removeFromInsultList (username)
{
    let removedUserIndex = insultTargets.indexOf(username);
    if(removedUserIndex !== -1)
    {
        insultTargets.splice(removedUserIndex, 1);
        console.log(`CONSOLE: ${username} was removed from the insults list.`);
    }
}

// TODO: Move this to the provoke command.
function provoke (targetedUser)
{
    let insultsToSend = 3
    let insultsSent = 0;
    sayRandomInsult(targetedUser);
    // let timer = setInterval(()=>{
    //     sayRandomInsult();
    //     if(insultsSent < 3)
    //     {
    //         clearInterval(timer);
    //         insultsSent = 0;
    //     }
    //     insultsSent++;
    // },3000);

    // if(!insultInterval)
    // {
    //     startInsultTimer();
    // }
}


function sayRandomInsult (targetedUser)
{
    if(insultTargets.length > 0)
    {
        // Make sure we arent getting the same insult as last time.
        let randInsult;
        let chosenUser;
        do
        {
            randInsult = getRandomInsult();
            // console.log("Same insult as last time... Getting a new one.");
            // console.log(`randInsult: ${randInsult} | lastInsultsUsed: ${lastInsultUsed}`);
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
        else
        {
            chosenUser = targetedUser;
        }
        

        chat(replaceChatVariables(randInsult, chosenUser, settings.channel));

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

module.exports = {onMessage};