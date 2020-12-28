module.exports = 
{
    isUserInList : (username, list) => 
    {
        return list.some((value) => {
            if(value.username.toLowerCase() == username.toLowerCase())
            {
                return true;
            }
        });
    }
}