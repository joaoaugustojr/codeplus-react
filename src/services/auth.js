import api from './api';
import Alert from 'react-s-alert';

export const TOKEN_KEY = '@adonis-Token';
export const AUTH_LOGIN = '@adonis-Auth';
export const USER_LOGIN = '@adonis-User';

export const loginStart = async (estabelecimento_id, login, senha) => {
	try {
		const res = await api.post('/auth', { estabelecimento_id, login, senha });

		if (res.data.response) {
			localStorage.setItem(TOKEN_KEY, res.data.token.token);
			localStorage.setItem(AUTH_LOGIN, true);
			localStorage.setItem(USER_LOGIN, JSON.stringify(res.data.user));
			Alert.success(res.data.message);
			window.location.href = '/dashboard';
		} else {
			Alert.error(res.data.message);
		}
	} catch (err) {
		Alert.error('Ocorreu um erro inesperado ao fazer login: ' + err.message);
	}
};

export const isAuth = async () => {
	try {
		const res = await api.get('/auth/islogin');
		if (res.data.response) {
			localStorage.setItem(AUTH_LOGIN, true);
			localStorage.setItem(USER_LOGIN, JSON.stringify(res.data.user));
		} else {
			localStorage.removeItem(TOKEN_KEY);
			localStorage.setItem(AUTH_LOGIN, false);
			document.location.reload();
			Alert.error(res.data.message);
		}
	} catch (err) {
		localStorage.removeItem(TOKEN_KEY);
		localStorage.setItem(AUTH_LOGIN, false);
		Alert.error(err.message);
	}
};

export const isAuthenticated = () => {
	const auth = localStorage.getItem(TOKEN_KEY);
	if (auth != null) {
		return auth;
	}
	return false;
};

export const getToken = () => {
	const token = localStorage.getItem(TOKEN_KEY);
	return token;
};

export const getUser = () => {
	const user = localStorage.getItem(USER_LOGIN);
	return user;
};

export const logoutStart = async () => {
	try {
		const res = await api.get('/auth/logout');
		if (res.data.response) {
			localStorage.removeItem(TOKEN_KEY);
			localStorage.removeItem(AUTH_LOGIN);
			localStorage.removeItem(USER_LOGIN);
			window.location.href = '/';
		} else {
			Alert.error(res.data.message);
		}
	} catch (err) {
		Alert.error('Ocorreu um erro inesperado ao fazer logout:\n ' + err);
	}
};
