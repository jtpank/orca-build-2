import React, { Component } from 'react';

class ContestBlock extends Component {
    constructor(props) {
        super(props);
      }
  render() {
    const { game } = this.props;
    return (
        <div>
            <p>Commence time: {game.commence_time}</p>
            <p>Home Team: {game.home_team}</p>
            <p>Away Team: {game.away_team}</p>
            <p>Scores: {game.scores}</p>

        </div>
    );
  }
}

export default ContestBlock;