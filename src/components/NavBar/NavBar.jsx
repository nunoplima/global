import React from "react";
import { withRouter } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/images/logo.png";

const NavBar = ({ history }) => {
    const { pathname } = history.location;

    return (
        <header className={pathname !== "/home" ? "solid" : ""}>
            <div className="container navbar">
                <Link to="/">
                    <img className="logo" src={Logo} alt="logo" />
                </Link>
                
                <ul className="navigation">
                    <NavLink className="link title" to="/">
                        <li className="title">Home</li>
                    </NavLink>

                    <li className="title">Absences</li>
                    
                    <NavLink className="link title" activeClassName="selected" exact to="/employees">
                        <li>Employees</li>
                    </NavLink>
                    
                    {pathname !== "/home" && (
                        <NavLink className="link title" activeClassName="selected" exact to="/employees/new">
                            <li>New Employee</li>
                        </NavLink>
                    )}
                </ul>
            </div>
        </header>
    );
};

export default withRouter(NavBar);
