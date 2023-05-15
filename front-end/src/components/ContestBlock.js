import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class ContestBlock extends Component {
    constructor(props) {
        super(props);
      }
  render() {
    const { game } = this.props;
    return (
        <div className="contest-block">
            <p>Commence time: {game.commence_time}</p>
            <p>Home Team: {game.home_team}</p>
            <p>Away Team: {game.away_team}</p>
            <p>Scores: {game.scores}</p>
            <p>
            <Link to="test-link">Test-link</Link>
            </p>

        </div>
    );
  }
}

export default ContestBlock;