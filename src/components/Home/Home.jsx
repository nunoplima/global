import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logUserAsAdmin } from "../../store/user";
import Circle from "../../assets/images/circle.png";
import Curve from "../../assets/images/curve.png";

const Home = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        localStorage.removeItem("isAdmin");
    }, []);

    const handleClick = () => {
        localStorage.setItem("isAdmin", true);
        dispatch(logUserAsAdmin());
    };

    return (
        <>
            <div className="hero">
                <div className="container">
                    <div className="hero-text-container">
                        <h1 className="hero-text title">Make your team the best it can be</h1>
                        <Link onClick={handleClick} className="hero-button title" to="/employees">Enter</Link>
                    </div>
                </div>
            </div>
        
            <div className="content-container">
                <div className="content-subtitle">
                    <hr/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam commodo, felis at hendrerit vulputate, felis arcu pellentesque risus, at egestas erat diam et tellus</p>
                </div>

                <div className="content-inner-container">
                    <div className="content-image"></div>
                    <div className="content-info-container">
                        <div className="content-info">
                            <h2 className="title">Augmented reality</h2>
                            <hr/>
                            <p>Nullam et sapien cursus, venenatis felis sit amet, commodo risus. Aenean non metus porta, aliquet ipsum dapibus, feugiat risus. Fusce imperdiet semper lectus, in placerat lacus congue at. Nunc tincidunt, tellus eu faucibus ullamcorper</p>
                            <div className="purple-button title">Learn More</div>
                        </div>
                    </div>
                    <img src={Curve} alt="curve" className="curve" />
                    <img src={Circle} alt="circle" className="circle" />
                </div>
            </div>
        </>
    )
};

export default Home;
