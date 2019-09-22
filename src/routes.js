import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from './auth';

import Home from './pages/home';

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => (isAuthenticated() ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />)}
		/>
	);
};

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<PrivateRoute exact path="/dashboard" component={() => <h1>Olá Mundo</h1>} />
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
