import React, { Component } from 'react';
import filterOddsApiData from '../logic/filterOddsApiData.js';
import ContestBlock from './ContestBlock.js';
class SportTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _game_array: [],
        };
        // this.handleClickLiveGameDisplay = this.handleClickLiveGameDisplay.bind(this);
      }
    async componentDidMount()
    {
        const sportField = this.props.oddsApiSportKey;
        const endpoint = "scores";
        const currentDateTime = new Date();
        currentDateTime.setHours(0, 0, 0, 0);
        const isoCurrentDateTime = currentDateTime.toISOString().substring(0, 19) + 'Z';
        let liveAndUpcomingContests = await this.props.fetchLiveAndUpcomingGames_theOddsApi(sportField, endpoint, isoCurrentDateTime);

        //TODO: only want the first set of contests, not all future contests
        let filteredGameArrayData = filterOddsApiData(this.props.sportName, liveAndUpcomingContests);
        this.setState({
            _game_array: filteredGameArrayData,
        });
        
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
                    {/* <button onClick={this.handleClickLiveGameDisplay}>Click to Display</button> */}
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