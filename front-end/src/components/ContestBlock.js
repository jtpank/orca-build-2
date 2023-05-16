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
      <Link to="test-link" onClick={this.handleClick} className="contest-block-link">
        <div className="contest-block">
        <p>Commence time: {game.commence_time}</p>
        <p>Home Team: {game.home_team}</p>
        <p>Away Team: {game.away_team}</p>
        <p>Scores: {game.scores}</p>
        </div>
      </Link>
    );
  }
}

export default ContestBlock;