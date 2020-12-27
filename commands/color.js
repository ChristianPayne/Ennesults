// Basic requirements
const Command = require('./command.js');

// Extends from the base Command class.
class Color extends Command
{

    // Name command and aliases in params or super params. 
    constructor() {
        super('color', []);
        this.setDescription('!color <Twitch color> changes the color of the bot to the selected color.');
    }

    // Executes command when called.
    execute (args, props)
    {
        super.execute();

        let { colors } = require("../helpers/files.js").files;

        if(args[0] == undefined)
            {
                let colorChat = "/me color options are: ";
                colors.forEach((element) => {
                    colorChat+= element + ", ";
                });
                this.chat(colorChat);
                return;
            }

            let correctColor = false;
            colors.forEach((element) => {
                if (args[0].toLowerCase() === element.toLowerCase())
                {
                    correctColor = true;
                }
            });

            if(correctColor)
            {
                this.chat(`/color ${args[0]}`);
                this.chat(`/me My color has been changed to ${args[0]}.`);
            }
            else
            {
                this.chat(`/me ${args[0]} is not a color Twitch supports.`);
            }
    }
}

module.exports = Color;