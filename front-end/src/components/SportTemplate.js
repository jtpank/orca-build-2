import React, { Component } from 'react';
import ContestBlock from './ContestBlock.js';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

class SportTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        
      }
    async componentDidMount()
    {
        const sportField = this.props.oddsApiSportKey;
        const endpoint = "scores";
        const currentDateTime = new Date();
        currentDateTime.setHours(0, 0, 0, 0);
        const isoCurrentDateTime = currentDateTime.toISOString().substring(0, 19) + 'Z';
        this.props.handleFetchAndFilter_customApi(sportField, endpoint, isoCurrentDateTime);
    }


  render() {
    let arrayContestBlocks = [];
    for(let game of this.props.game_array)
    {
        let contestBlock = <ContestBlock
                            key={game.id}
                            game={game}
                            contest_game_id={this.props.contest_game_id}
                            setContestGameId={this.props.setContestGameId}
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
                <li>
                    Past Games - TODO
                </li>
            </ul>
            <div className="contest-container-flex">
                <div className="dropdown-container dropdown-width">
                    <button onClick={this.props.handleToggleCalendar}>
                        Click to select a date
                    </button>
                    {this.props.showCalendar && (
                        <div className="calendar-dropdown">
                        <Calendar onChange={this.props.handleSelectDate} />
                        </div>
                    )}
                </div>
            </div>
            <div>
                {arrayContestBlocks}
            </div>
        </div>
    );
  }
}

export default SportTemplate;