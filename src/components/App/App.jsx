import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "../Home/Home";
import Employees from "../Employees/Employees";
import EmployeeForm from "../EmployeeForm/EmployeeForm";
import NotFound from "../NotFound/NotFound";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {

    return (
		<>
            <ToastContainer />
			<NavBar />
			<main className="container">
				<Switch>
					<Route path="/employees/:employeeId" component={EmployeeForm}/>
					<Route path="/employees" component={Employees} />
					<Route path="/home" component={Home} />
					<Route path="/not-found" component={NotFound} />
					<Redirect from="/" exact to="/home" />
					<Redirect to="/not-found" />
				</Switch>
			</main>
			<Footer />
		</>
    );
}

export default App;
