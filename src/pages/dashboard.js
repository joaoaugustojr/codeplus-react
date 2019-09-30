import React from 'react';
import Login from '../components/loginform';
import Alert from 'react-s-alert';
import { getUser } from '../auth';

const Dashboard = () => {
	console.log(getUser());
	return (
		<section class="container-fluid p-0 m-0">
			<nav class="navbar navbar-expand-lg navBarBG">
				<ion-icon class="text-white" name="menu" size="large" />
				<div class="infoUser">
					<ul class="text-white d-none d-md-inline">
						<li>
							<p>Bem Vindo! {JSON.parse(getUser()).user}</p>
						</li>
						<li>{/* <p>{JSON.parse(getUser()).usuario.estabelecimento.razao}</p> */}</li>
					</ul>
					<ion-icon class="text-white" name="ios-contact" />
				</div>
			</nav>
			<section class="d-flex">
				<ul class="menu d-inline-block m-0 p-0">
					<img class="d-block" src={'/images/logocodeplus.png'} />

					<li>
						<a href="{{route('rt.dashboard')}}">
							<ion-icon class="text-white" name="md-today" />
							<span>Dashboard</span>
						</a>
					</li>
					<li>
						<a href="http://">
							<ion-icon class="text-white" name="md-apps" />
							<span>Produtos</span>
						</a>
					</li>
					<li>
						<a href="http://">
							<ion-icon class="text-white" name="ios-list" />
							<span>Contagens</span>
						</a>
					</li>
					<li>
						<a href="http://">
							<ion-icon class="text-white" name="md-pricetags" />
							<span>Alterações</span>
						</a>
					</li>
					<li>
						<a href="http://">
							<ion-icon class="text-white" name="md-calendar" />
							<span>Validade</span>
						</a>
					</li>
					<li>
						<a href="http://">
							<ion-icon class="text-white" name="md-arrow-dropdown-circle" />
							<span>Importação</span>
						</a>
					</li>
					<li>
						<a href="{{route('usuarios.index')}}/">
							<ion-icon class="text-white" name="ios-people" />
							<span>Usuários</span>
						</a>
					</li>
					<li>
						<a href="http://">
							<ion-icon class="text-white" name="md-cog" />
							<span>Configurações</span>
						</a>
					</li>
				</ul>
				<div class="dashContent container-fluid">@yield('breadcrumbs') @yield('painel')</div>
			</section>
		</section>
	);
};

export default Dashboard;
