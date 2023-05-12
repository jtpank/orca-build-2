import React from 'react';
import {Link} from 'react-router-dom';
import ContestTable from '../components/ContestTable';
import LiveChart from '../components/LiveChart';
import Calendar from 'react-calendar';
import '../styles/styles.css';
import 'react-calendar/dist/Calendar.css';
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
    //can only fetch IF the selectData states passed checks...
    //TODO:
    //Season could incrue bugs IF the month is around december 2022 for example
    const baseAPI = 'https://www.balldontlie.io/api/v1/games?';
    const today = dateObj;
    const year = today.getFullYear();
    const season = today.getFullYear() - 1;
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const date = `${year}-${month}-${day}`;
    const fullAPI = baseAPI + 'seasons[]=' + season + '&' + 'dates[]=' + date;
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
    const teamLogos = {
        ATL: require('../nba_logos/ATL.png'),
        BKN: require('../nba_logos/BOS.png'),
        BOS: require('../nba_logos/BOS.png'),
        CHA: require('../nba_logos/ATL.png'),
        CHI: require('../nba_logos/ATL.png'),
        CLE: require('../nba_logos/ATL.png'),
        DAL: require('../nba_logos/ATL.png'),
        DEN: require('../nba_logos/DEN.png'),
        DET: require('../nba_logos/ATL.png'),
        GSW: require('../nba_logos/ATL.png'),
        HOU: require('../nba_logos/ATL.png'),
        IND: require('../nba_logos/ATL.png'),
        LAC: require('../nba_logos/ATL.png'),
        LAL: require('../nba_logos/ATL.png'),
        MEM: require('../nba_logos/ATL.png'),
        MIA: require('../nba_logos/ATL.png'),
        MIL: require('../nba_logos/ATL.png'),
        MIN: require('../nba_logos/ATL.png'),
        NOP: require('../nba_logos/ATL.png'),
        NYK: require('../nba_logos/ATL.png'),
        OKC: require('../nba_logos/ATL.png'),
        ORL: require('../nba_logos/ATL.png'),
        PHI: require('../nba_logos/PHI.png'),
        PHX: require('../nba_logos/PHX.png'),
        POR: require('../nba_logos/ATL.png'),
        SAC: require('../nba_logos/ATL.png'),
        SAS: require('../nba_logos/ATL.png'),
        TOR: require('../nba_logos/ATL.png'),
        UTA: require('../nba_logos/ATL.png'),
        WAS: require('../nba_logos/ATL.png'),
      };
    const { _game_array, _live_chart_render } = this.state;
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

