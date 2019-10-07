import React, { useState, useEffect } from 'react';
import Dash from '../components/dash';
import Table from '../components/table';
import Alert from 'react-s-alert';
import api from '../services/api';

const Users = () => {
	const [ data, setData ] = useState([]);
	const [ search, setSearch ] = useState('');

	const head = {
		id: 'Id',
		estabelecimento_id: 'Estabelecimento',
		nome: 'Nome',
		login: 'Login',
		email: 'Email',
		status: 'Status',
		created_at: 'Dt. Cadastro',
		update_at: 'Dt. Alteração'
	};

	const hidden = {
		estabelecimento_id: 'd-none',
		created_at: 'd-none',
		updated_at: 'd-none'
	};

	useEffect(() => {
		getUsers();
	}, []);

	async function getUsers() {
		const res = await api.get('/users/all');

		if (res.data.response) {
			setData(res.data.usuarios);
		} else {
			Alert.error(res.data.message);
		}
	}

	function pesquisar(ev) {
		setSearch(ev.target.value);
	}

	return (
		<Dash caminho="Dashboard - Administrar Usuários">
			<section className="headerTable">
				<button type="button" data-toggle="modal" data-target="#addUser">
					Adicionar
				</button>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text input-dash" id="basic-addon1">
							<ion-icon class="text-white" name="search" />
						</span>
					</div>
					<input
						type="text"
						className="form-control input-dash-text"
						placeholder="Pesquisar Usuários"
						aria-label="Username"
						aria-describedby="basic-addon1"
						onChange={pesquisar}
					/>
				</div>
			</section>
			<Table
				data={data}
				head={head}
				hidden={hidden}
				search={search}
				action={true}
				edit={true}
				view={true}
				delete={true}
			/>
		</Dash>
	);
};

export default Users;
