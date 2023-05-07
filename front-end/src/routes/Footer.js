import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class Footer extends React.Component {

    render() {
        return (
        <div className="m">
        <section
            className="">
            <div className="">
            <span>Get connected with us on social networks:</span>
            </div>
            <div>
            <a href="#" className="me-4 text-reset">
            
            </a>
            <a href="#" className="me-4 text-reset">
                <FontAwesomeIcon icon="fa-brands fa-twitter" />
            </a>
            <a href="#" className="me-4 text-reset">
                <FontAwesomeIcon icon="fa-brands fa-google" />
            </a>
            <a href="#" className="me-4 text-reset">
                <FontAwesomeIcon icon="fa-brands fa-instagram" />
            </a>
            <a href="#" className="me-4 text-reset">
                <FontAwesomeIcon icon="fa-brands fa-linkedin" />
            </a>
            </div>
        </section>

        <div className="text-center p-4">
            © 2021 Copyright:
            <a className="text-reset">copyright.com</a>
        </div>
        </div>
        );
    }
}

export default Footer;