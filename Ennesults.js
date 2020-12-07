// Requirements
// const { format } = require('path');


// Other scripts
let files = require("./modules/files.js");
let core = require("./modules/core.js");
let chat = require("./modules/chat.js");
let commands = require('./modules/commands.js');


// // Runtime Variables
// let insultInterval = null;
// let checkInsultability = chatScript.checkInsultability;
// const allUsersInChat = chatScript.allUsersInChat;
// // const insultTargets = [];
// const insultTargets = chatScript.insultTargets;

// const lurkers = [];
// const insultTimePassed = 0;
// const chatLinesPassed = 0;

// // Memory
// let lastUserInsulted;
// let lastInsultUsed;
// let lastComebackUsed;


//#region Commands

// Look for commands OLD
// core.client.on('message', (channel, tags, message, self) => 
// {
    // const {username} = tags;
    
    // if(self) return;
    
    // As soon as someone types, check to see if they are inside of the insult list.
    // addUserToViewerList(username);
    // addUserToInsultList(username);
    // removeLurker(username);
// });
// List of all commands that can be run.

//#endregion
/*

//#region Bot functionality


function addToIgnoreList (username)
{
    username = username.toLowerCase();

    if(username.startsWith('@'))
    {
        username = username.substring(1);
    }

    if(ignoreList.includes(username))
    {
        console.log(`CONSOLE: ${username} is already in the ignore list.`);
        chat(`/me ${username} has already been added to the ignore list.`);
    }
    else
    {
        ignoreList.push(username);
        saveIgnoreFile();
        removeFromInsultList(username);
        chat(`/me ${username} has been added to the ignore list.`);
    }
    
}

function removeFromIgnoreList (username)
{
    username = username.toLowerCase();

    if(username.startsWith('@'))
    {
        username = username.substring(1);
    }

    let removedIgnoreIndex = ignoreList.indexOf(username);

    if(removedIgnoreIndex !== -1)
    {
        ignoreList.splice(removedIgnoreIndex, 1);
        saveIgnoreFile();
        chat(`/me ${username} successfully removed from ignore list.`);
    }
    else
    {
        chat(`/me Could not find ${username} in the list of ignored users.`);
    }
}

function saveIgnoreFile ()
{
    fs.writeFile('./Assets/ignore.json', JSON.stringify(ignoreList), (error) => {
        if(error)
        {
            console.log('ERROR: Ignore file write error! ' + error);
        }
        else
        {
            console.log('CONSOLE: Ignore file write confirmed.');
        }
    });
}

function startInsultTimer ()
{
    chat("Brace yourselves...");
    insultInterval = setInterval(() => 
    {
        sayRandomInsult();
    }, settings.insultIntervalTime * 1000);
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

function replaceChatVariables(chatMessage, userReplacement, channelReplacement)
{
    let modifiedText = chatMessage;

    if(chatMessage.includes('{user}'))
    {
        // console.log('Replaced {user} for username.');
        modifiedText = modifiedText.replace(/{user}/g, `@${userReplacement}`);
    }

    if(chatMessage.includes('{channel}'))
    {
        // console.log('Replaced {channel} for channel.');
        modifiedText = modifiedText.replace(/{channel}/g, `@${channelReplacement}`);
    }

    return(modifiedText);
}

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

function addUserToViewerList (username)
{
    if(!allUsersInChat.includes(username))
    {
        allUsersInChat.push(username);
    }
}

function saveConsentFile ()
{
    fs.writeFile('./Assets/consenters.json', JSON.stringify(consenters), (error) => {
        if(error)
        {
            console.log('ERROR: Consent file write error! ' + error);
        }
        else
        {
            console.log('CONSOLE: Consent file write confirmed.');
        }
    });
}

function saveInsultFile ()
{
    fs.writeFile('./Assets/insults.json', JSON.stringify(insults), (error)=>
    {
        error ? console.log("ERROR: " + error) : console.log('CONSOLE: Saved insults to file.');
    });
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

function addCorrectionOverride(keyword)
{
    if(!correctionOverrides.includes(keyword.toLowerCase()))
    {
        correctionOverrides.push(keyword.toLowerCase());
        fs.writeFile('./Assets/correction_overrides.json', JSON.stringify(correctionOverrides), (error)=>
        {
            error ? console.log("ERROR" + error) : console.log('CONSOLE: Saved correction overrides to file.');
        });
    }
    else
    {
        chat("/me Override already added.");
    }
}

function addInsult (insult)
{
    if(!insults.includes(insult))
    {
        insults.push(insult);
        saveInsultFile();
        chat(`/me Ennesult added: ${insult}`);
    }
    else
    {
        chat("/me That ennesult has already been added.");
    }
}

function removeInsult (insult)
{
    let removedInsultIndex = insults.indexOf(insult);

    if(removedInsultIndex !== -1)
    {
        insults.splice(removedInsultIndex, 1);
        saveInsultFile();
        chat("/me Ennesult successfully removed.");
    }
    else
    {
        chat('/me Could not find that ennesult.');
        console.log(`${insult}`);
    }
}

function isMod (messageProperties)
{
    if(messageProperties.tags.mod || messageProperties.channel.includes(messageProperties.tags.username))
    {
        return true;
    }
    else
    {
        return false;
    }
}

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

function removeLurker (username)
{
    let removedLurkerIndex = lurkers.indexOf(username);

    if(removedLurkerIndex !== -1)
    {
        lurkers.splice(removedLurkerIndex, 1);
    }
    else
    {
        // console.log(`${username} was not found in the lurkers list.`);
    }
}


// 'en' correction
client.on("message", (_channel, tags, message, self) => 
{
    if(self || message.startsWith('!') || checkInsultability(tags.username)) return;
    
    if(message.toLowerCase().includes('en'))
    {
        let skip = false;
        // Check to make sure we don't need to ignore this word.
        correctionOverrides.forEach(element => {
            if(message.toLowerCase().includes(element))
            {
                console.log("CONSOLE: " + element + " was flagged.");
                skip = true;
            }
        });

        if(skip)
        {
            return;
        }

        let randomNum = Math.random();
        if(randomNum <= settings.enCorrectionPercentage)
        {
            let correctedMessage = "";
            correctedMessage = message.toLowerCase().replace("en", "ENNE");
            chat(`Correction: *${correctedMessage}*`);
        }
        else
        {
            console.log("CONSOLE: Skipping 'en' correction.");
        }
    }
});

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
//#endregion

//#region Experimental


// Was testing some notice functionality.
client.on("notice", (channel, msgid, message) => {
    // Do your stuff.
    console.log(msgid);
    if(msgid == 'color_changed')
    {
        // chat('Color changed successfully.');
    }
});


//#endregion

*/