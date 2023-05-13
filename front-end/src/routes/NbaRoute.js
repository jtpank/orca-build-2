import React from 'react';
import {Link} from 'react-router-dom';
import ContestTable from '../components/ContestTable';
import LiveChart from '../components/LiveChart';
import OddsTable from '../components/OddsTable';
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
      _dateSelect: {},
      _pre_game_h2h: [],
      _current_home_team: "",
      _current_away_team: "",
      _live_chart_odds_data: [],
      _live_chart_current_date: {},

    };
    this.getNbaData_balldontlie = this.getNbaData_balldontlie.bind(this);
    this.getNbaData_theoddsapi = this.getNbaData_theoddsapi.bind(this);
    this.handleDisplayLiveOddsData = this.handleDisplayLiveOddsData.bind(this);
    this.handleSelectDate = this.handleSelectDate.bind(this);
    this.handleToggleCalendar = this.handleToggleCalendar.bind(this);
  }

  async getNbaData_balldontlie(dateObj) {

    //Api setup
    const baseAPI = 'https://www.balldontlie.io/api/v1/games?';
    const year = dateObj.getFullYear();
    // const season = today.getFullYear();
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);

    //default to 'last year'
    let season = dateObj.getFullYear() - 1;
    if(month >= 9 && month <= 12)
    {
      //otherwise set to 'this year'
      season = dateObj.getFullYear();
    }
    const day = ('0' + dateObj.getDate()).slice(-2);
    const date = `${year}-${month}-${day}`;
    const fullAPI = baseAPI + 'seasons[]=' + season + '&' + 'dates[]=' + date;

    //check date is not in future
    const today = new Date();
    if(dateObj > today)
    {
      console.log('future date not available');
      return;
    }

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
  async handleDisplayLiveOddsData(homeTeam, awayTeam, date) 
  {
    this.setState({
      _pre_game_h2h: []
    })
    let dataDict = await this.getNbaData_theoddsapi(date);
    //after get data, parse it for the corresponding games
    //so we only search for commence_time in a certain range
    let dataArray = dataDict.data;
    console.log(dataArray);
    for(let i = 0; i < dataArray.length; i++)
    {
      let dataDict = dataArray[i];
      if(dataDict.home_team == homeTeam && dataDict.away_team == awayTeam)
      {
        this.setState({
          _pre_game_h2h: dataDict.bookmakers,
          _current_home_team: homeTeam,
          _current_away_team: awayTeam,
        });
      }
    }

  }
  async getNbaData_theoddsapi(dateObj) {
    const oddsAPI = 'https://api.the-odds-api.com/v4/sports/basketball_nba/odds-history';
    const formattedStartDate = dateObj.toISOString().substring(0, 19) + 'Z';
    //want to search in range [formattedDate, formattedDate+24 hours)
    const apiKey = process.env.REACT_APP_ODDS_API_API_KEY;
    const fullAPI = `${oddsAPI}?apiKey=${apiKey}&regions=us&markets=h2h,spreads&oddsFormat=american&date=${formattedStartDate}`;
    //Check cache first
    const cachedResponse = sessionStorage.getItem(fullAPI);
    if (cachedResponse) {
      const data = JSON.parse(cachedResponse);
      //Store in the cache
      sessionStorage.setItem(fullAPI, JSON.stringify(data));
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
        };
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
    this.setState({
      _dateSelect: date,
      _live_chart_current_date: date,
    });
    let awaitData = await this.getNbaData_balldontlie(dateObj);
  }
  handleToggleCalendar() {
    this.setState((prevState) => ({
      _showCalendar: !prevState._showCalendar, // toggle the showCalendar state
    }));
  }



  render() {
    const { _game_array, _live_chart_render, _pre_game_h2h,_current_away_team, _current_home_team } = this.state;
    const teamLogos = getNbaTeamLogoPaths();
    // const cacheSizeInBytes = JSON.stringify(sessionStorage).length;
    // const cacheSizeInMB = (cacheSizeInBytes / (1024 * 1024)).toFixed(2);
    // console.log(`Session storage cache size: ${cacheSizeInMB} MB`);
    return (
      <div className="splash-header">
        <div className="contest-div-container-external">
        <div className='all-contest-data-container'>
          <p>Nba route</p>
          <p><Link to="/">Home</Link></p>
            <div className="contest-container-flex">
              <div className="dropdown-container dropdown-width">
                <button onClick={this.handleToggleCalendar}>
                  Click to select a date
                </button>
                {this.state._showCalendar && (
                  <div className="calendar-dropdown">
                    <Calendar onChange={this.handleSelectDate} />
                  </div>
                )}
              </div>
              {_live_chart_render ? (
                  <div className='live-chart-container'>
                    <LiveChart
                    preGameH2h={this.state._pre_game_h2h}
                    currentAwayTeam={this.state._current_away_team}
                    currentHomeTeam={this.state._current_home_team}
                    ></LiveChart>
                  </div>
                ) : null}
            </div>
              <div className='contest-div-container'>
                {_game_array.length > 0 && 
                _game_array.map((game) => (
                  <ContestTable
                    key={game.id}
                    teamLogos={teamLogos} 
                    game={game}
                    date={this.state._dateSelect}
                    handleDisplayLiveOddsData={this.handleDisplayLiveOddsData} 
                  />
                ))}
              </div>
            {(this.state._pre_game_h2h && this.state._pre_game_h2h.length > 0)  ? (
              <div className='odds-table-container'>
                <OddsTable
                  preGameH2h={this.state._pre_game_h2h}
                  currentAwayTeam={this.state._current_away_team}
                  currentHomeTeam={this.state._current_home_team}
                />
              </div>
              ) : null}
          </div>

        </div>
      </div>
    );
  }
}

export default NbaRoute;
