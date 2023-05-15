export default function buildUrlFor_theOddsApi(sport, endpoint, dateIsoString, additionalParams)
{
    const server_api_1 = `http://localhost:8000/api/fetch-api1-data?sport=${sport}&endpoint=${endpoint}&date=${dateIsoString}`;
    // const oddsAPI = `https://api.the-odds-api.com/v4/sports/${sport}/${endpoint}`;
    // const apiKey = process.env.REACT_APP_ODDS_API_API_KEY;
    // //the following are defaults
    // const fullAPI = `${oddsAPI}?apiKey=${apiKey}&dateFormat=iso&date=${dateIsoString}`;
    return server_api_1;
}