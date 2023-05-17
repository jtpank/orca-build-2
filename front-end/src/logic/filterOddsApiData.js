export default function filterOddsApiData(sport, data) {
    //data is an array [obj1,obj2,...] where each obj is as follows:
    //{"id":"0e7b3192b263a571917d8996f42c5024",
    // "sport_key":"americanfootball_nfl",
    // "sport_title":"NFL",
    // "commence_time":"2023-09-08T00:20:00Z",
    // "completed":false,
    // "home_team":"Kansas City Chiefs",
    // "away_team":"Detroit Lions",
    // "scores":null,
    // "last_update":null}
    //

    //we want id,commence_time, home_team, away_team, scores
    //stored in an array of games
    let returnArrayOfParsedGames = [];
    if(data.length > 0)
    {
        for(let i = 0; i < data.length; i++)
        {
            let game = data[i];
            let tempObj = {
                "id": game["odds_api_game_id"],
                "commence_time": game["commence_time"],
                "home_team": game["home_team"],
                "away_team": game["away_team"],
                "home_team_score": game["home_team_score"],
                "away_team_score": game["away_team_score"],
                "completed": game["completed"],
            }
            returnArrayOfParsedGames.push(tempObj);
        }
    }
    return returnArrayOfParsedGames;

}