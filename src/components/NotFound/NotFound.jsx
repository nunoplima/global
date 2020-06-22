import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
    <div className="not-found-container">
        <h1>Error 404 - Not Found</h1>
        <Link className="not-found-button" to="/">Home</Link>
    </div>
);

export default NotFound;
