import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimes, faUserCircle } from '@fortawesome/free-solid-svg-icons'

const Employee = ({ employee, onDelete }) => {
    const { id, name, birthdate, address, status, position, created, updated, photoUrl } = employee;

    const formatDate = date => moment(date).format("MMMM Do YYYY");
    
    return (
        <div className="card">
            <div className="card-header">
                <div className="card-header-image">
                    <img src={photoUrl} alt="employee" />
                    {/* <FontAwesomeIcon icon={faUserCircle} /> */}
                </div>
                <div className="card-header-text">
                    <h4>{name}</h4>
                    <p>Employee ID: {id}</p>
                </div>
                <div className="card-header-buttons">
                    <Link to={`/employees/${id}`}>
                        <FontAwesomeIcon icon={faPen}/>
                    </Link>
                    <FontAwesomeIcon icon={faTimes} onClick={() => onDelete(id)}/>
                </div>
            </div>
            <div className="card-body">
                <p>Birthdate: {formatDate(birthdate)}</p>
                <p>Address: {address}</p>
                <p>Status: {status}</p>
                <p>Position: {position}</p>
                <p>Created: {formatDate(created)}</p>
                <p>Updated: {formatDate(updated)}</p>
            </div>
        </div>
    );
};

export default Employee;
