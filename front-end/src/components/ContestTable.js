import React, { Component } from 'react';

class ContestTable extends Component {
    constructor(props) {
        super(props);
        this.handleDisplayClick = this.handleDisplayClick.bind(this);
      }
    handleDisplayClick() {
        let date = this.props.date;
        let homeTeam = this.props.game.home_team.full_name;
        let awayTeam = this.props.game.visitor_team.full_name;
        this.props.handleDisplayLiveOddsData(homeTeam, awayTeam, date);
    }
  render() {
    const { teamLogos, game } = this.props;
    return (
        <div>
        <table className='contest-table' key={game.id}>
            <thead>
            <tr>
                <th>Team</th>
                <th>Score</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                <div className='contest-table-body'>
                    <img src={teamLogos[game.home_team.abbreviation]} alt={game.home_team.full_name} />
                    <p>{game.home_team.abbreviation}</p>
                </div>
                </td>
                <td>{game.home_team_score}</td>
            </tr>
            <tr>
                <td>
                <div className='contest-table-body'>
                    <img src={teamLogos[game.visitor_team.abbreviation]} alt={game.visitor_team.full_name} />
                    <p>{game.visitor_team.abbreviation}</p>
                </div>
                </td>
                <td>{game.visitor_team_score}</td>
            </tr>
            </tbody>
        </table>
        <button onClick={this.handleDisplayClick} >Display Live Odds Data!</button>
        </div>
    );
  }
}

export default ContestTable;