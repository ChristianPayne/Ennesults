module.exports = 
{
    isUserInList : (username, list) => 
    {
        return list.some((value) => {
            if(value.getUsername().toLowerCase() == username.toLowerCase())
            {
                return true;
            }
        });
    },
    userIndexInList : (username, list) =>
    {
        let foundIndex = -1;
        list.some((value, index) => {
            if(value.getUsername().toLowerCase() == username.toLowerCase())
            {
                foundIndex = index;
            }
        });
        return foundIndex;
    }
}