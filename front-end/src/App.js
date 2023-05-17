import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from "./routes/Header";
import Splash from "./routes/Splash";
import Footer from "./routes/Footer";
import NbaRoute from './routes/NbaRoute';
import NflRoute from './routes/NflRoute';
import ContestRoute from './routes/ContestRoute';
import buildUrlFor_customApi from './logic/buildUrl.js';
import filterOddsApiData from './logic/filterOddsApiData.js';
import './styles/styles.css';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      _game_array: [],
      _contest_game_id: "",
    }
    this.shouldRenderHeader  = this.shouldRenderHeader.bind(this);
    this.fetchLiveAndUpcomingGames_customApi  = this.fetchLiveAndUpcomingGames_customApi.bind(this);
    this.handleFetchAndFilter_customApi  = this.handleFetchAndFilter_customApi.bind(this);
    this.setContestGameId = this.setContestGameId.bind(this);
  }
  shouldRenderHeader() {
    if (typeof window !== 'undefined') {
      const { pathname } = window.location;
      return pathname !== '/';
    }
    return false;
  }
  async fetchLiveAndUpcomingGames_customApi(sport, endpoint, dateIsoString)
  {
      //endpoint should be 'scores'
      let additionalParams = {};
      const fullAPI = `http://localhost:5000/api/get/live-nba-scores-data?sport=${sport}&date=${dateIsoString}`;
      // const fullAPI = buildUrlFor_customApi(sport, endpoint, dateIsoString, additionalParams);
      //Check cache first
      const cachedResponse = sessionStorage.getItem(fullAPI);
      if (cachedResponse) {
        const data = JSON.parse(cachedResponse);
        return data;
      }
      else
      {
          const externResponse = await fetch(fullAPI)
          .then(async (response) => {
              const data = await response.json();
              // check for error response
              if (!response.ok) {
              // get error message from body or default to response statusText
              const error = (data && data.message) || response.statusText;
              return Promise.reject(error);
              };
              //Store in the cache
              sessionStorage.setItem(fullAPI, JSON.stringify(data.data));
              return data.data;
          }).catch((error) => {
              //this.setState({ errorMessage: error.toString() });
              console.error('There was an error!', error);
          });
          return externResponse;
      }
  }
  async handleFetchAndFilter_customApi(sportField, endpoint, isoCurrentDateTime)
  {
      let liveAndUpcomingContests = await this.fetchLiveAndUpcomingGames_customApi(sportField, endpoint, isoCurrentDateTime);

      //TODO: only want the first set of contests, not all future contests
      let filteredGameArrayData = filterOddsApiData(this.props.sportName, liveAndUpcomingContests);
      this.setState({
          _game_array: filteredGameArrayData,
      });
      
  }
  setContestGameId(contestId)
  {
    this.setState({
      _contest_game_id: contestId,
    })
  }

  render() {
    return (
        <BrowserRouter>
        <div className="App">
          <div className='entire-container'>
            <div className='row'>
            {/* <Header/> */}
            </div>
            <div className='row'>
                <Routes>
                  <Route path="/" element={<Splash/>}/>
                  <Route path="/nba" element={
                    <NbaRoute
                    sportName={"NBA"}
                    oddsApiSportKey={"basketball_nba"}
                    game_array={this.state._game_array}
                    setContestGameId={this.setContestGameId}
                    handleFetchAndFilter_customApi={this.handleFetchAndFilter_customApi}
                    />}>
                  </Route>
                  <Route path="/nba/contest-link" element={
                    <ContestRoute
                    contest_game_id={this.state._contest_game_id}
                    ></ContestRoute>}/>
                  
                  <Route path="/nfl" element={
                    <NflRoute
                    sportName={"NFL"}
                    oddsApiSportKey={"americanfootball_nfl"}
                    game_array={this.state._game_array}
                    setContestGameId={this.setContestGameId}
                    handleFetchAndFilter_customApi={this.handleFetchAndFilter_customApi}
                    />}>
                  </Route>
                  <Route path="/nfl/contest-link" element={
                    <ContestRoute
                    contest_game_id={this.state._contest_game_id}
                    ></ContestRoute>}/>

                </Routes>
            </div>
            <div className='row'>
            {/* <Footer /> */}
            </div>
          </div>
        </div>
        </BrowserRouter>
    );
  }
}

export default App
