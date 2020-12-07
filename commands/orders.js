// Basic requirements
const Command = require('./command.js');
// Custom requirements


// Extends from the base Command class.
class Orders extends Command
{

    // Name command and aliases in params or super params. 
    constructor() {
        super('orders', ['commands']);
    }

    // Executes command when called.
    execute (args, props)
    {
        super.execute();

        // Require is called when we call the command.
        const commands = require('../modules/commands.js');
        let ordersString = 'Orders:';
        commands.getCommandKeys().forEach((value, index) => 
        {
            if(index < commands.getCommandKeys().length - 1)
            {
                ordersString += ` !${value},`;
            }
            else
            {
                ordersString += ` !${value}.`;
            }
        });
        // console.log();
        this.chat(ordersString);
    }
}

module.exports = Orders;