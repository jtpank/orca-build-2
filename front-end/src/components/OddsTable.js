import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
class OddsTable extends Component {
    constructor(props) {
        super(props);
      }
  render() {
    return (
        <div>
            <table className='odds-data-class'>
                  <thead>
                    <tr>
                      <th>Bookmaker</th>
                      <th>{this.props.currentHomeTeam} Moneyline</th>
                      <th>{this.props.currentAwayTeam} Moneyline</th>
                      <th>{this.props.currentHomeTeam} Spread</th>
                      <th>{this.props.currentHomeTeam} Spread Odds</th>
                      <th>{this.props.currentAwayTeam} Spread</th>
                      <th>{this.props.currentAwayTeam} Spread Odds</th>
                    </tr>
                  </thead>
                  <tbody>
                    { this.props.preGameH2h.length > 0 ? (
                      this.props.preGameH2h.map((bookmaker) => (
                        <tr key={uuidv4()}>
                          <td>{bookmaker.title}</td>
                          <td>{bookmaker.markets[0]?.outcomes[0].price ?? "N/A"}</td>
                          <td>{bookmaker.markets[0]?.outcomes[1].price ?? "N/A"}</td>
                          <td>{bookmaker.markets[1]?.outcomes[0].point ?? "N/A"}</td>
                          <td>{bookmaker.markets[1]?.outcomes[0].price ?? "N/A"}</td>
                          <td>{bookmaker.markets[1]?.outcomes[1].point ?? "N/A"}</td>
                          <td>{bookmaker.markets[1]?.outcomes[1].price ?? "N/A"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr key={uuidv4()}>
                        <td colSpan="3">Loading...</td>
                      </tr>
                    )}
                  </tbody>
        </table>
        </div>
    );
  }
}

export default OddsTable;