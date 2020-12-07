// Script requirements
const { isMod } = require("./chat");

// Command requirements
const Test = require("../commands/test");
const SimpleChat = require("../commands/simpleChat");
const Consent = require("../commands/consent");
const Orders = require("../commands/orders");
const Help = require("../commands/help");
const RevokeConsent = require("../commands/revokeconsent");

// A list of all commands that are currently available.
const commands = {
    // test : new Test(),
    // chat : new SimpleChat(),
    orders : new Orders(),
    help : new Help(),
    consent : new Consent(),
    revokeConsent : new RevokeConsent(),
}

// Get all of the keys for our commands.
function getCommandKeys () { return Object.keys(commands); }

// Is called from the listener.
function onCommand (channel, tags, message)
{
    const args = message.slice(1).split(' ');
    const command = args.shift().toLowerCase();
    const argsString = args.join(' ');

    const props = {
        channel : channel,
        args : args,
        command : command,
        message : message,
        tags : tags,
        argsString : argsString
    }

    // Execute the command.
    executeCommand(command, args, props);
}

// Find and execute the command.
function executeCommand (name, args, props)
{
    // Loop over all the keys in the commands object.
    getCommandKeys().forEach((value, index) =>
    {
        // This command needs mod but the user doesn't have it.
        if(commands[value].needsMod && !isMod(props)) return;

        // Check to see if that command matches.
        if(commands[value].isCommandOrAlias(name))
        {
            // Execute commands[value] and pass the args and message properties.
            commands[value].execute(args, props);
        }
    });
}

// Warn if names or aliases are the same.
getCommandKeys().forEach((value1) => {
    // console.log('Value 1 ' + value1);
    for (let i = 0; i < getCommandKeys().length; i++) 
    {
        if(value1 === getCommandKeys()[i]) continue;
        // console.log('   Value 2 ' + getCommandKeys()[i]);

        // Check to see if the names are the same.
        if(commands[getCommandKeys()[i]].isCommandOrAlias(commands[value1].name))
        {
            console.log(`WARNING: ${value1} is the same name as ${getCommandKeys()[i]}`);
        }

        // Check to see if the aliases are the same.
        for (let x = 0; x < commands[getCommandKeys()[i]].aliases.length; x++) 
        {
            if(commands[getCommandKeys()[i]].isCommandOrAlias(commands[value1].aliases[x]))
            {
                console.log(`WARNING: ${value1} has the same alias as ${commands[getCommandKeys()[i]].name}`);
            }
        }
    }
});

    // const {username} = messageProperties.tags;

    // switch (name)
    // {
    //     case 'orders':
    //     {
    //         chat(`Orders: !provoke, !calmdown, !addennesult, !rmennesult, !consent, !revokeconsent, !targets, !addoverride, !addcomeback, !stats, !addignore, !removeignore`);
    //         break;
    //     }
        
    //     case 'provoke':
    //     {
    //         if(args.length > 0)
    //         {
    //             let targetedUser = args[0].startsWith('@') ? args[0].substring(1) : args[0];
                
    //             if(checkInsultability(targetedUser))
    //             {
    //                 provoke(targetedUser);
    //             }
    //             else
    //             {
    //                 chat(`/me @${targetedUser} is not able to be insulted.`);
    //                 break;
    //             }
    //         }

    //         if(checkInsultability(username))
    //         {
    //             provoke(username);
    //         }

    //         break;
    //     }

    //     case 'color': 
    //     {
    //         if(args[0] == undefined)
    //         {
    //             let colorChat = "/me color options are: ";
    //             colors.forEach((element) => {
    //                 colorChat+= element + ", ";
    //             });
    //             chat(colorChat);
    //             return;
    //         }

    //         let correctColor = false;
    //         colors.forEach((element) => {
    //             if (args[0].toLowerCase() === element.toLowerCase())
    //             {
    //                 correctColor = true;
    //             }
    //         });

    //         if(correctColor)
    //         {
    //             // console.log('/color ' + argsArray[0]);
    //             chat(`/color ${args[0]}`);
    //             chat(`/me My color has been changed to ${args[0]}.`);
    //         }
    //         else
    //         {
    //             chat(`/me ${args[0]} is not a color Twitch supports.`);
    //         }
    //         break;
    //     }

    //     case 'calmdown':
    //     {
    //         stopInsultTimer();
    //         break;
    //     }

    //     case 'c':
    //     case 'fuckmeupfam':
    //     case 'consent':
    //     {
    //         let consentTarget;
    //         console.log(args[0]);
    //         if(args[0] !== undefined)
    //         {
    //             if(isMod(messageProperties))
    //             {
    //                 if(args[0].startsWith('@'))
    //                 {
    //                     consentTarget = args[0].substring(1).toLowerCase();
    //                 }
    //                 else
    //                 {
    //                     consentTarget = args[0].toLowerCase();
    //                 }
    //             }
    //             else
    //             {
    //                 chat(`/me Consenting for someone else needs mod permissions.`);
    //                 break;
    //             }
    //         }
    //         else
    //         {
    //             consentTarget = username;
    //         }

            
    //         if(!consenters.includes(consentTarget))
    //         {
    //             consenters.push(consentTarget);
    //             chat(`/me ${consentTarget} has consented.`);
    //             saveConsentFile();
    //             addUserToInsultList(consentTarget);
    //         }
    //         else
    //         {
    //             chat(`/me @${consentTarget}, you have already given consent.`);
    //         }
    //         break;
    //     }

    //     case 'rc':
    //     case 'stahp':
    //     case 'unconsent':
    //     case 'revokeconsent':
    //     {
    //         let consentTarget;
    //         if(args[0])
    //         {
    //             if(isMod(messageProperties))
    //             {
    //                 if(args[0].startsWith('@'))
    //                 {
    //                     consentTarget = args[0].substring(1).toLowerCase();
    //                 }
    //                 else
    //                 {
    //                     consentTarget = args[0].toLowerCase();
    //                 }
    //             }
    //             else
    //             {
    //                 chat(`/me Revoking consent for someone else needs mod permissions.`);
    //                 break;
    //             }
    //         }
    //         else
    //         {
    //             consentTarget = username;
    //         }

            
    //         if(consenters.includes(consentTarget))
    //         {
    //             insultTargets.splice(insultTargets.indexOf(consentTarget));
    //             consenters.splice(consenters.indexOf(consentTarget), 1);
    //             saveConsentFile();
    //             chat(`/me ${consentTarget}, fine, I'll go easy on you.`);
    //         }
    //         else
    //         {
    //             chat(`@${consentTarget} has not consented.`);
    //         }
    //         break;
    //     }

    //     case 'ae':
    //     case 'addennesult':
    //     {
    //         if(isMod(messageProperties))
    //         {
    //             addInsult(args.join(' '));
    //         }
    //         else
    //         {
    //             chat("You need to be mod to add an ennesult.");
    //         }
    //         break;
    //     }

    //     case 're':
    //     case 'rmennesult':
    //     {
    //         if(isMod(messageProperties))
    //         {
    //             removeInsult(args.join(' '));
    //         }
    //         else
    //         {
    //             chat("You need to be mod to remove an ennesult.");
    //         }
    //         break;
    //     }

    //     case 't':
    //     case 'targets':
    //         {
    //             if(insultTargets.length > 0)
    //             {
    //                 chat(`@${username} Current targets are: ${insultTargets}`);
    //             }
    //             else
    //             {
    //                 chat(`@${username} There are no current targets.`);
    //             }
    //             break;
    //         }

    //     case 'ao':
    //     case 'addoverride':
    //         {
    //             if(isMod(messageProperties))
    //             {
    //                 addCorrectionOverride(args[0]);
    //                 chat('/me Override added.');
    //             }
    //             else
    //             {
    //                 chat('/me You need to be mod to add an override.');
    //             }
    //             break;
    //         }

    //     case 'ac':
    //     case 'addcomeback':
    //         {
    //             if(isMod(messageProperties))
    //             {
    //                 addComebackAndSave(args.join(' '));
    //             }
    //             else
    //             {
    //                 chat('/me You need to be mod to add a comeback.');
    //             }
    //             break;
    //         }
        
    //     case 'ai':
    //     case 'addignore':
    //         {
    //             if(isMod(messageProperties))
    //             {
    //                 addToIgnoreList(args[0]);
    //             }
    //             else
    //             {
    //                 chat('/me You need to be mod to add to the ignore list.');
    //             }
    //             break;
    //         }

    //     case 'ri':
    //     case 'removeignore':
    //         {
    //             if(isMod(messageProperties))
    //             {
    //                 removeFromIgnoreList(args[0]);
    //             }
    //             else
    //             {
    //                 chat('/me You need to be mod to remove from the ignore list.');
    //             }
    //             break;
    //         }

    //     case 'stats':
    //         {
    //             chat(`There are ${insults.length} ennsults, ${comebacks.length} comebacks and ${insultTargets.length} targets.`);
    //             break;
    //         }

    //     case 'lurk':
    //         {
    //             setTimeout(() => 
    //             {
    //                 if(!lurkers.includes(username))
    //                 {
    //                     lurkers.push(username);
    //                     console.log(`CONSOLE: Pushed ${username} into the lurkers array.`);
    //                 }
    //                 else
    //                 {
    //                     console.log(`CONSOLE: ${username} has already been added to the lurkers array.`);
    //                 }
    //             }, settings.lurkTimer);
    //             break;
    //         }

    //     case 'test':
    //         {
    //             chat(JSON.stringify(allUsersInChat));
    //             break;
    //         }

    //     case 'muk':
    //         {
    //             chat("Muk");
    //         } 
        
    //     case '':
    //     case 'bang':
    //         {
    //             chat('BANG!');
    //             break;
    //         }

    //     default:
    //             break;
    // }


module.exports = {executeCommand, commands, onCommand, getCommandKeys}