import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from './auth';

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
				<Route exact path="/" component={() => <h1>Bem vindo ao code plus em js</h1>} />
				<PrivateRoute exact path="/dashboard" component={() => <h1>Olá Mundo</h1>} />
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
