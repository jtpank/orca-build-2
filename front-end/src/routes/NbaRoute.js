import React from 'react';
class NbaRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.getNbaData_balldontlie = this.getNbaData_balldontlie.bind(this);
    }
    async getNbaData_balldontlie() 
    {
        //can only fetch IF the selectData states passed checks...
        const baseAPI = "https://www.balldontlie.io/api/v1/games?";
        const season = "2022";
        const date = "2023-05-09";
        const fullAPI = baseAPI + "seasons[]=" + season + "&" + "dates[]=" + date; 
        const externResponse = await fetch(fullAPI)
        .then(async response => {
            const data = await response.json();
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            console.log(data);
            return data;
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
        return externResponse;
    }
    render() {
        return(
            <div className='splash-header'>
                <div className='link-header-div'>
                    <p>Nba route</p>
                    <button 
                    onSelect={() => this.getNbaData_balldontlie}
                    >
                    Click to display current game data!
                    </button>
                </div>
            </div>

        );
    }
}

export default NbaRoute;