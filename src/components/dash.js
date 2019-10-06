import React from 'react';
import { getUser, isAuth, logoutStart } from '../services/auth';
import { Confirm } from '../services/confirmDialog';

const Dash = (props) => {
	isAuth();

	function logout() {
		Confirm('Deseja Realmente Sair do CodePlus?', 'question', 'Sim', 'Não :)', () => {
			logoutStart();
		});
	}

	return (
		<section className="container-fluid p-0 m-0">
			<nav className="navbar navbar-expand-lg navBarBG">
				<ion-icon class="text-white" name="menu" size="large" />
				<div className="infoUser">
					<ul className="text-white d-none d-md-inline">
						<li>
							<p>Bem Vindo! {JSON.parse(getUser()).usuario.nome}</p>
						</li>
						<li>
							<p>{JSON.parse(getUser()).estabelecimento.razao}</p>
						</li>
					</ul>
					<ion-icon class="text-white" name="ios-contact" />
				</div>
			</nav>
			<section className="d-flex">
				<ul className="menu d-inline-block m-0 p-0">
					<img className="d-block" alt="img" src={'/images/logocodeplus.png'} />

					<li>
						<a href="/dashboard">
							<ion-icon class="text-white" name="md-today" />
							<span>Dashboard</span>
						</a>
					</li>
					<li>
						<a href="/dashboard/produtos">
							<ion-icon class="text-white" name="md-apps" />
							<span>Produtos</span>
						</a>
					</li>
					<li>
						<a href="/dashboard/contagens">
							<ion-icon class="text-white" name="ios-list" />
							<span>Contagens</span>
						</a>
					</li>
					<li>
						<a href="/dashboard/alteracoes">
							<ion-icon class="text-white" name="md-pricetags" />
							<span>Alterações</span>
						</a>
					</li>
					<li>
						<a href="/dashboard/validade">
							<ion-icon class="text-white" name="md-calendar" />
							<span>Validade</span>
						</a>
					</li>
					<li>
						<a href="/dashboard/importacao">
							<ion-icon class="text-white" name="md-arrow-dropdown-circle" />
							<span>Importação</span>
						</a>
					</li>
					<li>
						<a href="/dashboard/usuarios">
							<ion-icon class="text-white" name="ios-people" />
							<span>Usuários</span>
						</a>
					</li>
					<li>
						<a href="/dashboard/configuracoes">
							<ion-icon class="text-white" name="md-cog" />
							<span>Configurações</span>
						</a>
					</li>
					<li>
						<span onClick={logout}>
							<ion-icon class="text-white" name="md-exit" />
							<span>Sair</span>
						</span>
					</li>
				</ul>
				<div className="dashContent container-fluid">
					<section id="breadcrumbs">
						<span>{props.caminho}</span>
					</section>
					{props.children}
				</div>
			</section>
		</section>
	);
};

export default Dash;
