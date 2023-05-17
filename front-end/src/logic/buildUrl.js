export default function buildUrlFor_customApi(sport, endpoint, dateIsoString, additionalParams)
{
    const server_api_1 = `http://localhost:5000/api/get/live-nba-scores-data?sport=${sport}&endpoint=${endpoint}&date=${dateIsoString}`;
    return server_api_1;
}