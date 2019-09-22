import React, { useState } from 'react';
import Alert from 'react-s-alert';

const Login = () => {
	const [ store_id, setStoreId ] = useState('');
	const [ login, setLogin ] = useState('');
	const [ password, setPassword ] = useState('');

	function onChange(ev) {
		if (ev.target.name === 'store_id') setStoreId(ev.target.value);
		if (ev.target.name === 'login') setLogin(ev.target.value);
		if (ev.target.name === 'password') setPassword(ev.target.value);
	}

	function validarUsuario() {
		var error = false;

		if (store_id === '') {
			Alert.warning('O campo Estabelecimento deve ser preenchido!');
			error = true;
		}

		if (login === '') {
			Alert.warning('O campo Usuário deve ser preenchido!');
			error = true;
		}

		if (password === '') {
			Alert.warning('O campo Senha deve ser preenchido!');
			error = true;
		}

		// !error ? verificarUsuario() : null;
	}

	return (
		<div className="loginBox bg-white text-center">
			<div className="codePlusLogo text-center d-inline-block justify-content-center">
				<img alt="img" className="text-center" src={'/images/logocodeplus.png'} />
				<ion-icon class="dropIcon" name="arrow-dropdown" />
			</div>

			<form className="d-inline-block formLogin" method="POST">
				<input type="hidden" name="_token" value="" />
				<div className="groupInput">
					<div className="iconLogin">
						<ion-icon name="apps" />
					</div>
					<input
						type="number"
						name="store_id"
						value={store_id}
						onChange={onChange}
						placeholder="Código do Estabelecimento"
					/>
				</div>
				<div className="groupInput">
					<div className="iconLogin">
						<ion-icon name="person" />
					</div>
					<input type="text" name="login" value={login} onChange={onChange} placeholder="Usuário" />
				</div>
				<div className="groupInput">
					<div className="iconLogin">
						<ion-icon name="key" />
					</div>
					<input type="password" name="password" value={password} onChange={onChange} placeholder="Senha" />
				</div>
			</form>

			<div className="buttons">
				<button className="btnLogin" onClick={validarUsuario}>
					Login
				</button>
			</div>

			<p className="text-capitalize textSuport">
				<small className="font-weight-light">Não Consegue Entrar? Contate Suporte</small>
			</p>
		</div>
	);
};

export default Login;
