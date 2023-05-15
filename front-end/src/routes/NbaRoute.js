import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import SportTemplate from '../components/SportTemplate';
import '../styles/styles.css';
import 'react-calendar/dist/Calendar.css';
class NbaRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  render() {

    return (
      <div className="splash-header">
        <div className="contest-div-container-external">
        <div className='all-contest-data-container'>
          <p>Nba route</p>
          <p><Link to="/">Home</Link></p>
        </div>
        <div>
            <SportTemplate
            sportName={this.props.sportName}
            oddsApiSportKey={this.props.oddsApiSportKey}
            game_array={this.props.game_array}
            handleFetchAndFilter_theOddsApi={this.props.handleFetchAndFilter_theOddsApi}
            ></SportTemplate>
        </div>
        </div>
        
      </div>
    );
  }
}

export default NbaRoute;
