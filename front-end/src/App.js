import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from "./routes/Header";
import Splash from "./routes/Splash";
import Footer from "./routes/Footer";
import NbaRoute from './routes/NbaRoute';
import NflRoute from './routes/NflRoute';
import buildUrlFor_theOddsApi from './logic/buildUrl.js';
import './styles/styles.css';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    
    }
    this.shouldRenderHeader  = this.shouldRenderHeader.bind(this);
    this.fetchLiveAndUpcomingGames_theOddsApi  = this.fetchLiveAndUpcomingGames_theOddsApi.bind(this);
  }
  shouldRenderHeader() {
    if (typeof window !== 'undefined') {
      const { pathname } = window.location;
      return pathname !== '/';
    }
    return false;
  }
  async fetchLiveAndUpcomingGames_theOddsApi(sport, endpoint, dateIsoString)
  {
      //endpoint should be 'scores'
      let additionalParams = {};
      const fullAPI = buildUrlFor_theOddsApi(sport, endpoint, dateIsoString, additionalParams);
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
              sessionStorage.setItem(fullAPI, JSON.stringify(data));
              return data;
          }).catch((error) => {
              //this.setState({ errorMessage: error.toString() });
              console.error('There was an error!', error);
          });
          return externResponse;
      }
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
                  <Route path="/nba" element={<NbaRoute
                  fetchLiveAndUpcomingGames_theOddsApi={this.fetchLiveAndUpcomingGames_theOddsApi}
                  />}/>
                  <Route path="/nfl" element={<NflRoute
                  fetchLiveAndUpcomingGames_theOddsApi={this.fetchLiveAndUpcomingGames_theOddsApi}
                  />}/>
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
