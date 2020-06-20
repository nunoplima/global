import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/images/logo.png";

import { useSelector } from "react-redux";

const NavBar = () => {
    const { isAdmin } = useSelector((state) => state.user);
    return (
        <div className={isAdmin ? "solid" : ""}>
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
                    
                    {isAdmin && (
                        <NavLink className="link title" activeClassName="selected" exact to="/employees/new">
                            <li>New Employee</li>
                        </NavLink>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default NavBar;
