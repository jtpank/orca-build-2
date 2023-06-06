import React from 'react';
import {Link} from 'react-router-dom';
import SportTemplate from '../components/SportTemplate';
import '../styles/styles.css';
import 'react-calendar/dist/Calendar.css';
class NflRoute extends React.Component {
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
          <p>Nfl route</p>
          <p><Link to="/">Home</Link></p>
        </div>
        <div>
            <SportTemplate
            sportName={this.props.sportName}
            oddsApiSportKey={this.props.oddsApiSportKey}
            game_array={this.props.game_array}
            setContestGameId={this.props.setContestGameId}
            handleFetchAndFilter_customApi={this.props.handleFetchAndFilter_customApi}
            handleSelectDate = {this.props.handleSelectDate}
            handleToggleCalendar = {this.props.handleToggleCalendar}
            showCalendar = {this.props.showCalendar}
            ></SportTemplate>
        </div>
        </div>
      </div>
    );
  }
}

export default NflRoute;
