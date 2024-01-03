
function getBaseDomain(): string
{
    if((window.location.hostname).indexOf("localhost") + 1)
    {
        return "XXXXXXXXXXXXXXXXXXXXX";
    } else 
    {
        return "XXXXXXXXXXXXXXXXXXXXX";
    }
}

export const constant = {
    baseDomain : getBaseDomain()
}