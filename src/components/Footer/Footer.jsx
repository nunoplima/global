import React from "react";
import { withRouter } from "react-router-dom"
import Logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faBasketballBall } from "@fortawesome/free-solid-svg-icons";
import FooterCurves from "../../assets/images/curve-1.png";
import FooterCircles from "../../assets/images/circle-footer.png";

const Footer = ({ history }) => {
    console.log(history.location.pathname); // /home or /
    const { pathname } = history.location;
    
    return (
        <div className="footer">
            <div className="footer-container">
                <div className="footer-upper-section">

                    <div className="footer-social-container">
                        <img src={Logo} alt="logo" />
                        <p>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident
                        </p>
                        <div className="footer-social">
                            <FontAwesomeIcon className="social-icn" icon={faFacebookF} size="lg" />
                            <FontAwesomeIcon className="social-icn" icon={faTwitter} size="lg" />
                            <FontAwesomeIcon className="social-icn" icon={faBasketballBall} size="lg" />
                            <FontAwesomeIcon className="social-icn" icon={faLinkedinIn} size="lg" />
                        </div>
                    </div>

                    <div className="footer-links-container">
                        <div className="company">
                            <h4>Company</h4>
                            <p>Home</p>
                            <p>Features</p>
                            <p>Screenshots</p>
                            <p>Pricing</p>
                            <p>Team</p>
                        </div>
                        <div className="help">
                            <h4>Help</h4>
                            <p>Help Center</p>
                            <p>FAQ's</p>
                            <p>Tearms & Conditions</p>
                            <p>Privacy</p>
                            <p>Contacts</p>
                        </div>
                        <div className="solutions">
                            <h4>Solution</h4>
                            <p>Consumer</p>
                            <p>Saas</p>
                            <p>Education</p>
                            <p>Gaming</p>
                            <p>Financial Services</p>
                        </div>
                    </div>

                </div>

                <div className="footer-lower-section">
                    <hr/>
                    <p>&copy;two impulse code test | All rights reverved 2020</p>
                </div>
            </div>

            <img src={FooterCurves} alt="curves" className="footer-curves" />
            {pathname === "/home" && (
                <img
                    src={FooterCircles}
                    alt="circles"
                    className="footer-circles"
                />
            )}
        </div>

    )
};

export default withRouter(Footer);
