import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import '../styles/styles.css';
import 'react-calendar/dist/Calendar.css';
class ContestRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  render() {

    return (
        <div>
            <div className="splash-header">
                    <p>Contest Route for {this.props.contest_game_id}</p>
            </div>
            <div>
                <ul>
                    <li>
                        Pre Game Odds Data - TODO
                    </li>
                    <li>
                        Live Betting Charts for specific bookie - TODO
                    </li>
                    <li>
                        Nuggets / Analysis - TODO
                    </li>
                    <li>
                        Historical Database Tool - TODO
                    </li>
                </ul>
            </div>
      </div>
    );
  }
}

export default ContestRoute;
