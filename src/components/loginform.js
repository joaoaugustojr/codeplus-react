import React from 'react';

const Login = () => {
	return (
		<div class="loginBox bg-white text-center">
			<div class="codePlusLogo text-center d-inline-block justify-content-center">
				<img class="text-center" src={'/images/logocodeplus.png'} />
				<ion-icon class="dropIcon" name="arrow-dropdown" />
			</div>

			<form class="d-inline-block formLogin" method="POST">
				<input type="hidden" name="_token" value="" />
				<div class="groupInput">
					<div class="iconLogin">
						<ion-icon name="apps" />
					</div>
					<input type="number" name="store_id" value="" placeholder="Código do Estabelecimento" />
				</div>
				<div class="groupInput">
					<div class="iconLogin">
						<ion-icon name="person" />
					</div>
					<input type="text" name="login" value="" onChange="" placeholder="Usuário" />
				</div>
				<div class="groupInput">
					<div class="iconLogin">
						<ion-icon name="key" />
					</div>
					<input type="password" name="password" value="" onChange="" placeholder="Senha" />
				</div>
			</form>

			<div class="buttons">
				<button class="btnLogin" onClick="">
					Login
				</button>
			</div>

			<p class="text-capitalize textSuport">
				<small class="font-weight-light">Não Consegue Entrar? Contate Suporte</small>
			</p>
		</div>
	);
};

export default Login;
