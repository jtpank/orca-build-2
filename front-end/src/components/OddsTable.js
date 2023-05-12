import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
class OddsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortColumn: '',
            sortOrder: 'asc'
        }
      }
      handleSort = (sortColumn) => {
        let sortOrder = 'asc';
        if (this.state.sortColumn === sortColumn && this.state.sortOrder === 'asc') {
          sortOrder = 'desc';
        }
      
        this.setState({
          sortColumn: sortColumn,
          sortOrder: sortOrder
        });
      
        this.props.preGameH2h.sort((a, b) => {
          let aValue = this.getSortValue(a, sortColumn);
          let bValue = this.getSortValue(b, sortColumn);
          if (sortOrder === 'desc') {
            [aValue, bValue] = [bValue, aValue];
          }
          if (aValue === 'N/A') {
            return 1;
          } else if (bValue === 'N/A') {
            return -1;
          } else {
            return aValue - bValue;
          }
        });
      }
      getSortValue = (bookmaker, sortColumn) => {
        switch (sortColumn) {
          case 'homeMoneyline':
            return bookmaker.markets[0]?.outcomes[0].price ?? 'N/A';
          case 'awayMoneyline':
            return bookmaker.markets[0]?.outcomes[1].price ?? 'N/A';
          case 'homeSpread':
            return bookmaker.markets[1]?.outcomes[0].point ?? 'N/A';
          case 'homeSpreadOdds':
            return bookmaker.markets[1]?.outcomes[0].price ?? 'N/A';
          case 'awaySpread':
            return bookmaker.markets[1]?.outcomes[1].point ?? 'N/A';
          case 'awaySpreadOdds':
            return bookmaker.markets[1]?.outcomes[1].price ?? 'N/A';
          default:
            return '';
        }
      }
  render() {
    this.props.preGameH2h.sort((a, b) => {
        let aValue = this.getSortValue(a, this.state.sortColumn);
        let bValue = this.getSortValue(b, this.state.sortColumn);
        if (this.state.sortOrder === 'desc') {
          [aValue, bValue] = [bValue, aValue];
        }
        if (aValue === 'N/A') {
          return 1;
        } else if (bValue === 'N/A') {
          return -1
        }
    });
    return (
        <div>
            <p>Click on a header to sort!</p>
            <table className='odds-data-class'>
                  <thead>
                    <tr>
                      <th>Bookmaker</th>
                      <th onClick={() => this.handleSort('homeMoneyline')}>{this.props.currentHomeTeam} Moneyline</th>
                      <th onClick={() => this.handleSort('awayMoneyline')}>{this.props.currentAwayTeam} Moneyline</th>
                      <th onClick={() => this.handleSort('homeSpread')}>{this.props.currentHomeTeam} Spread</th>
                      <th onClick={() => this.handleSort('homeSpreadOdds')}>{this.props.currentHomeTeam} Spread Odds</th>
                      <th onClick={() => this.handleSort('awaySpread')}>{this.props.currentAwayTeam} Spread</th>
                      <th onClick={() => this.handleSort('awaySpreadOdds')}>{this.props.currentAwayTeam} Spread Odds</th>
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