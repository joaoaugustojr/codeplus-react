import api from './api';
import Alert from 'react-s-alert';

export const TOKEN_KEY = '@adonis-Token';
export const USER_LOGIN = '@adonis-User';

export const loginStart = async (estabelecimento_id, login, senha) => {
	try {
		const res = await api.post('/auth', { estabelecimento_id, login, senha });

		if (res.data.response) {
			localStorage.setItem(TOKEN_KEY, res.data.token.token);
			Alert.success(res.data.message);
			window.location.href = '/dashboard';
		} else {
			Alert.error(res.data.message);
		}
	} catch (err) {
		Alert.error('Ocorreu um erro inesperado ao fazer login: ' + err);
	}
};

export const isAuthenticated = async () => {
	try {
		const res = await api.get('/auth/islogin');
		if (res.data.response) {
			localStorage.setItem(USER_LOGIN, JSON.stringify(res.data.user));
			localStorage.setItem(TOKEN_KEY, res.data.token.token);
			return false;
		} else {
			Alert.error('Usuário atual não está autenticado, realize o login para acessar esta página!!!');
			localStorage.removeItem(TOKEN_KEY);
			return false;
		}
	} catch (err) {
		Alert.error('Ocorreu um erro inesperado ao fazer login: ' + err);
		localStorage.removeItem(TOKEN_KEY);
		return false;
	}
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
};
