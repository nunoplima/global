import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "../Home/Home";
import Employees from "../Employees/Employees";
import EmployeeForm from "../EmployeeForm/EmployeeForm";
import NotFound from "../NotFound/NotFound";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { logUserAsAdmin } from "../../store/user";
import "./App.css";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const isAdmin = localStorage.getItem("isAdmin");
		if (isAdmin) dispatch(logUserAsAdmin());
	}, []);

    return (
		<>
			<NavBar />
			<main>
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
