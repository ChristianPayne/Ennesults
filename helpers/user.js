class User 
{
    constructor (username)
    {
        this.username = username;
        this.isConsented = this.getConsented(this.username);
        this.isLurking = true;
        this.forceLurk = false;
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
        if(this.timeSinceLastMessage == 0)
        {
            this.isLurking = true;
        }else{
            const { settings } = require('./files').files;
            if(this.timeSinceLastMessage() >= (settings.lurkTimer * 1000)){
                this.isLurking = true;
                // console.log(`lastMessageTime: ${this.lastMessageTime}`);
            }else{
                this.isLurking = false;
            }
        }

        if(this.forceLurk)
        {
            this.isLurking = true;
            console.log(`${this.getUsername()} is forcing a lurk.`);
        }

        return this.isLurking;
    }

    setIsLurking (forceLurk = true)
    {
        if(forceLurk === true)
        {
            console.log(`${this.getUsername()} set force lurk to ${forceLurk}`);
        }
        this.forceLurk = forceLurk;
    }

    updateLastMessageTime ()
    {
        this.lastMessageTime = Date.now();

        // Sets forceLurk to false.
        this.setIsLurking(false);
    }

    timeSinceLastMessage ()
    {
        return Date.now() - this.lastMessageTime;
    }
}

module.exports = User;