import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logUserAsAdmin } from "../../store/user";

const Home = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        localStorage.removeItem("isAdmin");
    }, []);

    const handleClick = () => {
        localStorage.setItem("isAdmin", true);
        dispatch(logUserAsAdmin());
    };

    return <Link onClick={handleClick} to="/employees">Enter</Link>;
};

export default Home;
