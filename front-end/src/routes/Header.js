import React from 'react';
import {Link} from 'react-router-dom';
class Header extends React.Component {
    render() {
        return(
            <div className='splash-header'>
                <div className='link-header-div'>
                    <Link className='link-header-button' to="/">OrcaBets</Link>
                </div>
            </div>

        );
    }
}

export default Header;
