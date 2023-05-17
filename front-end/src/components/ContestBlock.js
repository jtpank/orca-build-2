import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class ContestBlock extends Component {
    constructor(props) {
        super(props);
      this.handleClick = this.handleClick.bind(this);
      }
      handleClick()
      {
        this.props.setContestGameId(this.props.game.id);
      }
  render() {
    const { game } = this.props;
    return (
        <Link to="contest-link" onClick={this.handleClick} className="contest-block-link">
          <div className="contest-block">
          <p>Commence time: {game.commence_time}</p>
          <p>Home Team: {game.home_team} | {game.home_team_score}</p>
          <p>Away Team: {game.away_team} | {game.away_team_score}</p>
          </div>
        </Link>
    );
  }
}

export default ContestBlock;