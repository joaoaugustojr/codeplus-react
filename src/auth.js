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
		} else {
			Alert.error(res.data.message);
		}
	} catch (err) {
		Alert.error('Ocorreu um erro inesperado ao fazer login: ' + err);
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
		}
	} catch (err) {
		localStorage.removeItem(TOKEN_KEY);
		localStorage.setItem(AUTH_LOGIN, false);
	}
};

export const isAuthenticated = () => {
	const auth = localStorage.getItem(AUTH_LOGIN);
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

export const logoutStart = () => {
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(AUTH_LOGIN);
};
