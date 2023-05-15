import React, { Component } from 'react';
import buildUrlFor_theOddsApi from '../logic/buildUrl.js';
import filterOddsApiData from '../logic/filterOddsApiData.js';
import ContestBlock from './ContestBlock.js';
class SportTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _game_array: [],
        };
        this.fetchLiveAndUpcomingGames_theOddsApi = this.fetchLiveAndUpcomingGames_theOddsApi.bind(this);
        this.handleClickLiveGameDisplay = this.handleClickLiveGameDisplay.bind(this);
      }
    async handleClickLiveGameDisplay()
    {
        const sportField = this.props.oddsApiSportKey;
        const endpoint = "scores";
        const currentDateTime = new Date();
        currentDateTime.setHours(0, 0, 0, 0);
        const isoCurrentDateTime = currentDateTime.toISOString().substring(0, 19) + 'Z';
        let liveAndUpcomingContests = await this.fetchLiveAndUpcomingGames_theOddsApi(sportField, endpoint, isoCurrentDateTime);

        //TODO: only want the first set of contests, not all future contests
        let filteredGameArrayData = filterOddsApiData(this.props.sportName, liveAndUpcomingContests);
        this.setState({
            _game_array: filteredGameArrayData,
        });
        
    }
    async fetchLiveAndUpcomingGames_theOddsApi(sport, endpoint, dateIsoString)
    {
        //endpoint should be 'scores'
        let additionalParams = {};
        const fullAPI = buildUrlFor_theOddsApi(sport, endpoint, dateIsoString, additionalParams);
        //Check cache first
        const cachedResponse = sessionStorage.getItem(fullAPI);
        if (cachedResponse) {
          const data = JSON.parse(cachedResponse);
          return data;
        }
        else
        {
            const externResponse = await fetch(fullAPI)
            .then(async (response) => {
                const data = await response.json();
                // check for error response
                if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
                };
                //Store in the cache
                sessionStorage.setItem(fullAPI, JSON.stringify(data));
                return data;
            }).catch((error) => {
                //this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
            return externResponse;
        }
    }

  render() {
    let arrayContestBlocks = [];
    for(let game of this.state._game_array)
    {
        let contestBlock = <ContestBlock
                            key={game.id}
                            game={game}
                            ></ContestBlock>
        arrayContestBlocks.push(contestBlock);
    }
    return (
        <div>
            Sport Template for {this.props.sportName}
            <ul>
                <li>
                    Live Games - TODO
                    <button onClick={this.handleClickLiveGameDisplay}>Click to Display</button>
                </li>
                <li>
                    Upcoming Games - TODO
                </li>
            </ul>
            <div>
                {arrayContestBlocks}
            </div>
        </div>
    );
  }
}

export default SportTemplate;