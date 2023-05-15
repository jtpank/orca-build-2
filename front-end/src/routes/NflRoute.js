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
            sportName={"NFL"}
            oddsApiSportKey={"americanfootball_nfl"}
            ></SportTemplate>
        </div>
        </div>
      </div>
    );
  }
}

export default NflRoute;
