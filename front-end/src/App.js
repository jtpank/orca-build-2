import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from "./routes/Header";
import Splash from "./routes/Splash";
import Footer from "./routes/Footer";
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    
    }
    this.shouldRenderHeader  = this.shouldRenderHeader.bind(this);
  }
  shouldRenderHeader() {
    if (typeof window !== 'undefined') {
      const { pathname } = window.location;
      return pathname !== '/';
    }
    return false;
  }

  render() {
    return (
        <BrowserRouter>
        <div className="App">
          <div className='entire-container'>
            <div className='row'>
            <Header
                />
            </div>
            <div className='row'>
                <Routes>
                  <Route path="/" element={<Splash/>}/>
                </Routes>
            </div>
            <div className='row'>
            <Footer />
            </div>
          </div>
        </div>
        </BrowserRouter>
    );
  }
}

export default App
