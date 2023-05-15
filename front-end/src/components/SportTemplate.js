import React, { Component } from 'react';

class SportTemplate extends Component {
    constructor(props) {
        super(props);
      }
  render() {
  
    return (
        <div>
            Sport Template for {this.props.name}
            <ul>
                <li>
                    Live Games - TODO
                </li>
                <li>
                    Upcoming Games - TODO
                </li>
            </ul>
        </div>
    );
  }
}

export default SportTemplate;