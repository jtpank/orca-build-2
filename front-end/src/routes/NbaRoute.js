import React from 'react';
import {Link} from 'react-router-dom';
import ContestTable from '../components/ContestTable';
import LiveChart from '../components/LiveChart';
import Calendar from 'react-calendar';
import '../styles/styles.css';
import 'react-calendar/dist/Calendar.css';
import getNbaTeamLogoPaths from '../logic/getNbaTeamLogoPaths';
class NbaRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _game_array: [],
      _live_chart_render: false,
      _showCalendar: false,
    };
    this.getNbaData_balldontlie = this.getNbaData_balldontlie.bind(this);
    this.handleDisplayLiveOddsData = this.handleDisplayLiveOddsData.bind(this);
    this.handleSelectDate = this.handleSelectDate.bind(this);
    this.handleToggleCalendar = this.handleToggleCalendar.bind(this);
  }

  async getNbaData_balldontlie(dateObj) {

    //Api setup
    const baseAPI = 'https://www.balldontlie.io/api/v1/games?';
    const today = dateObj;
    const year = today.getFullYear();
    const season = today.getFullYear() - 1;
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const date = `${year}-${month}-${day}`;
    const fullAPI = baseAPI + 'seasons[]=' + season + '&' + 'dates[]=' + date;

    //Check cache first
    const cachedResponse = sessionStorage.getItem(fullAPI);
    if (cachedResponse) {
      const data = JSON.parse(cachedResponse);
      let game_array = data.data;
      this.setState({
        _game_array: game_array,
      });
      return data;
    }
    const externResponse = await fetch(fullAPI)
      .then(async (response) => {
        const data = await response.json();
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        let game_array = data.data;
        this.setState({
          _game_array: game_array,
        });
        //Store in the cache
        sessionStorage.setItem(fullAPI, JSON.stringify(data));
        return data;
      })
      .catch((error) => {
        //this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
      });
    return externResponse;
  }
  async handleDisplayLiveOddsData(teamID) {
    const oddsAPI = 'https://api.the-odds-api.com/v4/sports/basketball_nba/odds';
    const apiKey = process.env.REACT_APP_ODDS_API_API_KEY;
    const fullAPI = `${oddsAPI}?apiKey=${apiKey}&regions=us&markets=h2h&oddsFormat=american&team=${teamID}`;
    
    const externResponse = await fetch(fullAPI)
      .then(async (response) => {
        const data = await response.json();
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        };
        console.log(data);
        this.setState({
            _live_chart_render: true,
          });
        return data;
      })
      .catch((error) => {
        //this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
      });
    return externResponse;
  }
  async handleSelectDate(date) {
    const month = date.getMonth(); //getMonth() returns 0-based index
    const day = date.getDate();
    const year = date.getFullYear();
    let dateObj = new Date(year, month, day)
    let awaitData = await this.getNbaData_balldontlie(dateObj);
  }
  handleToggleCalendar() {
    this.setState((prevState) => ({
      _showCalendar: !prevState._showCalendar, // toggle the showCalendar state
    }));
  };
  render() {
    const { _game_array, _live_chart_render } = this.state;
    const teamLogos = getNbaTeamLogoPaths();
    return (
      <div className="splash-header">
        <div className="contest-div-container-external">
          <p>Nba route</p>
          <p><Link to="/">Home</Link></p>
            <div className="dropdown-container">
              <button onClick={this.handleToggleCalendar}>
                Click to select a date
              </button>
              {this.state._showCalendar && (
                <div className="calendar-dropdown">
                  <Calendar onChange={this.handleSelectDate} />
                </div>
              )}
            </div>
            <div className='contest-div-container'>
                {_game_array.length > 0 &&
                    _game_array.map((game) => (
                        <ContestTable
                        key={game.id}
                        teamLogos={teamLogos} 
                        game={game} 
                        handleDisplayLiveOddsData={this.handleDisplayLiveOddsData} 
                        />
                    ))
                }
            </div>
            {_live_chart_render && 
                <LiveChart

                ></LiveChart>
            }
        </div>
      </div>
    );
  }
}

export default NbaRoute;

