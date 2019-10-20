import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from './services/auth';

import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Estabelecimentos from './pages/estabelecimentos';
import Usuarios from './pages/users';
import Importacao from './pages/importacao';

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
				<PrivateRoute exact path="/dashboard/usuarios" component={Usuarios} />
				<PrivateRoute exact path="/dashboard/estabelecimentos" component={Estabelecimentos} />
				<PrivateRoute exact path="/dashboard/importacao" component={Importacao} />
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
