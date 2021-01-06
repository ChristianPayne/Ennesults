class User 
{
    constructor (username)
    {
        this.username = username;
        this.isConsented = this.getConsented(this.username);
        this.isLurking = false;
        this.lastMessageTime = 0;
        // this.updateLastMessageTime();
        this.isInsultable = false;
    }

    // Call this when you go to insult someone.
    checkInsultability ()
    {
        if(!this.getConsented())
        {
            // console.log(`${this.getUsername()} is not consented.`); 
            this.isInsultable = false;
            return false;
        } 

        if(this.getIsLurking())
        {
            // console.log(`${this.getUsername()} is lurking.`);
            this.isInsultable = false;
            return false;
        } 
        
        // TODO: Check ignore list too.
        
        this.isInsultable = true;
        // console.log(`${this.getUsername()} is insultable.`);
        return true;
    }

    getUsername ()
    {
        return this.username;
    }

    getConsented(username)
    {
        const { consenters } = require('./files').files;

        if(consenters.includes(username))
        {
            this.isConsented = true;
        }

        return this.isConsented;
    }

    getIsLurking ()
    {
        const { settings } = require('./files').files;
        if(this.timeSinceLastMessage() >= (settings.lurkTimer * 1000)){
            this.isLurking = true;
            // console.log(`lastMessageTime: ${this.lastMessageTime}`);
        }else{
            this.isLurking = false;
        }
        return this.isLurking;
    }

    updateLastMessageTime ()
    {
        this.lastMessageTime = Date.now();
    }

    timeSinceLastMessage ()
    {
        return Date.now() - this.lastMessageTime;
    }
}

module.exports = User;