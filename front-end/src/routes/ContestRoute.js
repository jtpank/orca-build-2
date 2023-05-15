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
      <div className="splash-header">
            <p>Contest Route for {this.props.contest_game_id}</p>
      </div>
    );
  }
}

export default ContestRoute;
