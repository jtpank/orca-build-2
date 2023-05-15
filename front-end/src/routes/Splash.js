import React from 'react';
import {Outlet, Link} from 'react-router-dom';
class Splash extends React.Component {
    // {this.props.is_logged_in ? (<h1>Welcome {this.props.email} </h1>) : (<h1>Welcome </h1>)}
    render() {
        return (
        <div className=''>
            <h1>Orcabets Header</h1>
            <div className='link-header-div'>
                <h3>Sports</h3>
                <ul>
                    <li>
                    <Link className='link-header-button' to="/nba">NBA</Link>
                    </li>
                    <li>
                    <Link className='link-header-button' to="/nfl">NFL</Link>
                    </li>
                </ul>
            </div>
            <div className='link-header-div'>
                <h3>Subscribe</h3>
                <ul>
                    <li>
                    Subscribe - TODO
                    </li>
                </ul>
            </div>
            <div className='link-header-div'>
                <h3>About Orcabets</h3>
                <ul>
                    <li>
                    About - TODO
                    </li>
                </ul>
            </div>
            <div>
            </div>
            {/* <div className='centered-div '>
                <div className='centered-div '>
                <button className="kave-btn" type='submit'>
                        <span className="kave-line"></span>
                        <span className="button-text">Coming Soon!</span>
                    </button>
                </div>
            </div> */}

            <div className="row-splash">
            <Outlet></Outlet>
            </div>
        </div>
        );
    }
}

export default Splash;