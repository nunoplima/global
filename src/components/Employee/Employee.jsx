import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimes } from "@fortawesome/free-solid-svg-icons";

const Employee = ({ employee, onDelete }) => {
    const { id, name, birthdate, address, status, position, created, updated, photoUrl } = employee;

    const formatDate = date => moment(date).format("MMMM Do YYYY");
    
    return (
        <div data-test="component-employee" className="card-container">
            <div className="card">

                <div className="card-header">
                    <div className="card-header-image">
                        <img src={photoUrl} alt="employee" />
                    </div>
                    <div className="card-header-text-container">
                        <h4 className="title card-header-text">{name}</h4>
                        <p className="card-header-text">Employee ID: <span>{id}</span></p>
                    </div>
                    <div className="card-header-buttons-container">
                        <Link className="card-header-buttons" to={`/employees/${id}`}>
                            <FontAwesomeIcon icon={faPen} size="xs"/>
                        </Link>
                        <div data-test="delete-button" className="card-header-buttons" onClick={() => onDelete(id)}>
                            <FontAwesomeIcon icon={faTimes} size="sm" />
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <p>Birthdate: <span>{formatDate(birthdate)}</span></p>
                    <p>Address: <span>{address}</span></p>
                    <p>Status: <span>{status}</span></p>
                    <p>Position: <span>{position}</span></p>
                    <p>Created: <span>{formatDate(created)}</span></p>
                    <p>Updated: <span>{formatDate(updated)}</span></p>
                </div>
            </div>
        </div>
    );
};

export default Employee;
