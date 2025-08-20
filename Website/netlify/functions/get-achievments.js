import fetch from 'node-fetch';

exports.handler = async (event, context) => {
    // Die benötigten Parameter aus der URL deiner Website auslesen
    const { apiKey, steamId, appId } = event.queryStringParameters;
    
    // Die URL für die Steam-API zusammenbauen
    const steamUrl = `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key=${apiKey}&steamid=${steamId}&appid=${appId}`;
    
    try {
        const response = await fetch(steamUrl);
        const data = await response.json();
        
        return {
            statusCode: 200,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch data from Steam' })
        };
    }
};