import React from 'react';
import {Outlet} from 'react-router-dom';
import '../styles/styles.css';
class Splash extends React.Component {
    // {this.props.is_logged_in ? (<h1>Welcome {this.props.email} </h1>) : (<h1>Welcome </h1>)}
    render() {
        return (
        <div className=''>
            <div className=''>
                
            </div>
            
            <div>
            </div>

            <div className='centered-div '>
            <button className="kave-btn" type='submit'>
                    <span className="kave-line"></span>
                    <span className="button-text">Coming Soon!</span>
                </button>
            </div>

            <div className="row-splash">
            <Outlet></Outlet>
            </div>
        </div>
        );
    }
}

export default Splash;