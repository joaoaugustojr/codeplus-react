import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from './auth';

import Home from './pages/home';
import Dashboard from './pages/dashboard';

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => (isAuthenticated() ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />)}
		/>
	);
};
const HomeLogin = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated() ? <Redirect to={{ pathname: '/dashboard' }} /> : <Component {...props} />}
		/>
	);
};

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<HomeLogin exact path="/" component={Home} />
				<PrivateRoute exact path="/dashboard" component={Dashboard} />
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
