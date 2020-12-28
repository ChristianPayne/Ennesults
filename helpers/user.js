
// Implement TimeDate or some other library to handle timestamps and comparisons.

class User 
{
    constructor (username)
    {
        this.username = username;
        this.isInsultable = true;
        this.updateLastMessageTime();
    }

    getUsername ()
    {
        return this.username;
    }

    timeSinceLastMessage ()
    {
        return Date.now() - this.lastMessageTime;
    }

    getInsultable ()
    {
        return this.isInsultable;
    }

    updateLastMessageTime ()
    {
        this.lastMessageTime = Date.now();
    }
}

module.exports = User;