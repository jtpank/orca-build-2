export default function buildUrlFor_theOddsApi(sport, endpoint, dateIsoString, additionalParams)
{
    const server_api_1 = `http://localhost:8000/api/fetch-api1-data?sport=${sport}&endpoint=${endpoint}&date=${dateIsoString}`;
    return server_api_1;
}