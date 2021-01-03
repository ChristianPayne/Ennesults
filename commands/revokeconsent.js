// Basic requirements
const Command = require('./command.js');
// Custom requirements
const { consenters } = require('../helpers/files.js').files;
const { saveJSONFile } = require('../helpers/files.js');
const { userIndexInList } = require('../helpers/helpers.js');

// Extends from the base Command class.
class RevokeConsent extends Command
{

    // Name command and aliases in params or super params. 
    constructor() {
        super('revokeconsent', ['rc']);
        this.setDescription('Stops the bot from interacting with you.');
    }

    // Executes command when called.
    execute (args, props)
    {
        super.execute();

        let consentTarget;
        if(args[0] !== undefined)
        {
            const { isMod } = require('../modules/chat.js');
            // Check to see if the command was sent from a mod to change the consent of someone else.
            if(isMod(props))
            {
                if(args[0].startsWith('@'))
                {
                    consentTarget = args[0].substring(1).toLowerCase();
                }
                else
                {
                    consentTarget = args[0].toLowerCase();
                }
            }
            else
            {
                this.chat(`/me Revoking consent for someone else needs mod permissions.`);
            }
        }
        else
        {
            consentTarget = props.tags.username;
        }

        
        if(consenters.includes(consentTarget))
        {
            // insultTargets.splice(insultTargets.indexOf(consentTarget));
            consenters.splice(consenters.indexOf(consentTarget), 1);
            saveJSONFile('./files/consenters.json', consenters);
            this.chat(`/me ${consentTarget}, fine, I'll go easy on you.`);

            const { allUsersInChat } = require('../modules/chat');
            const userIndex = userIndexInList(consentTarget, allUsersInChat);
            if(userIndex >= 0)
            {
                allUsersInChat[userIndex].isConsented = false;
            }
        }
        else
        {
            this.chat(`/me @${consentTarget} has not consented yet.`);
        }
    }
}

module.exports = RevokeConsent;