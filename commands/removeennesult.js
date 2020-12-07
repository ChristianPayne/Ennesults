// Basic requirements
const Command = require('./command.js');

// Extends from the base Command class.
class RemoveEnnesult extends Command
{

    // Name command and aliases in params or super params. 
    constructor() {
        super('removeennesult', ['re']);
        this.needsMod = true;
        this.setDescription('!removeennesult <Ennesult> will remove the ennesult from the bot.');
    }

    // Executes command when called.
    execute (args, props)
    {
        super.execute();

        const { insults } = require("../modules/files.js").files;
        const { saveJSONFile } = require("../modules/files.js");

        if(!props.argsString)
        {
            this.chat('/me Ennesult can not be empty.');
            return;
        }

        let removedInsultIndex = insults.indexOf(props.argsString);

        if(removedInsultIndex !== -1)
        {
            insults.splice(removedInsultIndex, 1);
            saveJSONFile('./files/insults.json', insults);
            this.chat("/me Ennesult successfully removed.");
        }
        else
        {
            this.chat('/me Could not find that ennesult.');
            console.log(`${props.argsString}`);
        }
    }
}

module.exports = RemoveEnnesult;