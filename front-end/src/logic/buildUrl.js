export default function buildUrlFor_theOddsApi(sport, endpoint, dateIsoString, additionalParams)
{
    const oddsAPI = `https://api.the-odds-api.com/v4/sports/${sport}/${endpoint}`;
    const apiKey = process.env.REACT_APP_ODDS_API_API_KEY;
    //the following are defaults
    const fullAPI = `${oddsAPI}?apiKey=${apiKey}&dateFormat=iso&date=${dateIsoString}`;
    return fullAPI;
}