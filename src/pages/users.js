import React, { useState, useEffect } from 'react';
import Dash from '../components/dash';
import Table from '../components/table';
import Modal from '../components/modal';
import Alert from 'react-s-alert';
import api from '../services/api';
import { upperCaseValue } from '../services/helpers';
import { Confirm } from '../services/confirmDialog';

const Users = () => {
	const [ data, setData ] = useState([]);
	const [ search, setSearch ] = useState('');
	const [ id, setId ] = useState('');
	const [ nome, setNome ] = useState('');
	const [ login, setLogin ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ senha, setSenha ] = useState('');
	const [ status, setStatus ] = useState('');

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

	const config = {
		headers: { 'Content-Type': 'multipart/form-data' }
	};

	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = async () => {
		const res = await api.get('/users/all');

		if (res.data.response) {
			setData(res.data.usuarios);
		} else {
			Alert.error(res.data.message);
		}
	};

	const onChange = (ev) => {
		if (ev.target.name === 'login') setLogin(ev.target.value);
		if (ev.target.name === 'email') setEmail(ev.target.value);
		if (ev.target.name === 'senha') setSenha(ev.target.value);
	};

	const pesquisar = (ev) => {
		setSearch(ev.target.value);
	};

	const upppercase = (ev) => {
		setNome(upperCaseValue(ev.target.value));
	};

	const addUsuario = async () => {
		const form = document.querySelector('#addUserForm');
		const data = new FormData(form);
		const res = await api.post('/users/create', data, config);

		if (res.data.response) {
			limparCampos();
			getUsers();
			Alert.success(res.data.message);
		} else {
			res.data.map((key) => Alert.error(key.message));
		}
	};

	const editUsuario = async () => {
		const form = document.querySelector('#editUserForm');
		const data = new FormData(form);
		const res = await api.post('/users/update', data, config);

		if (res.data.response) {
			limparCampos();
			getUsers();
			Alert.success(res.data.message);
		} else {
			res.data.map((key) => Alert.error(key.message));
		}
	};

	const deleteUsuario = (id) => {
		Confirm('', 'Deseja excluir este registro?', 'warning', 'Sim', 'Não :)', async () => {
			const res = await api.get('/users/delete/' + id);

			if (res.data.response) {
				getUsers();
				Alert.success(res.data.message);
			} else {
				Alert.error(res.data.message);
			}
		});
	};

	const carregarDados = async (id) => {
		const res = await api.get('/users/show/' + id);
		if (res.data.response) {
			setId(res.data.usuario.id);
			setNome(res.data.usuario.nome);
			setLogin(res.data.usuario.login);
			setEmail(res.data.usuario.email);
			setStatus(res.data.usuario.status);
		} else {
			Alert.error(res.data.message);
		}
	};

	const limparCampos = () => {
		setId('');
		setNome('');
		setLogin('');
		setEmail('');
		setSenha('');
		setStatus('');
	};

	const onChangeStatus = (ev) => {
		setStatus(ev.target.value);
	};

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
				view={false}
				delete={true}
				functionDelete={deleteUsuario}
				editDataTarget="#editUser"
				functionEdit={carregarDados}
			/>
			<Modal
				title="Adicionar Usuário"
				size="" /*modal-sm lg xl*/
				idModal="addUser"
				actionText="Adicionar"
				cancelText="Cancelar"
				idForm="addUserForm"
				function="add"
				addAction={addUsuario}
			>
				<form className="d-inline-bloc basicInput" id="addUserForm">
					<input className="form-control input-dash-text" type="hidden" name="estabelecimento_id" value={1} />

					<div className="groupInput">
						<input
							className="form-control input-dash-text"
							type="text"
							name="nome"
							placeholder="Nome Completo do Usuário"
							value={nome}
							onChange={upppercase}
						/>
					</div>

					<div className="groupInput">
						<input
							className="form-control input-dash-text"
							type="text"
							name="login"
							placeholder="Login"
							value={login}
							onChange={onChange}
						/>
					</div>
					<div className="groupInput">
						<input
							className="form-control input-dash-text"
							type="text"
							name="email"
							placeholder="Email"
							value={email}
							onChange={onChange}
						/>
					</div>
					<div className="groupInput">
						<input
							className="form-control input-dash-text"
							type="password"
							name="senha"
							placeholder="Senha"
							value={senha}
							onChange={onChange}
						/>
					</div>
					<div className="groupInput selectElement">
						<select className="form-control inputSelect" name="status">
							<option value="ATIVO">Ativo</option>
							<option value="INATIVO">Inativo</option>
						</select>
					</div>
				</form>
			</Modal>

			<Modal
				title="Editar Usuário"
				size="" /*modal-sm lg xl*/
				idModal="editUser"
				actionText="Salvar Alterações"
				cancelText="Cancelar"
				idForm="editUserForm"
				function="edit"
				editAction={editUsuario}
			>
				<form className="d-inline-bloc basicInput" id="editUserForm">
					<input className="form-control input-dash-text" type="hidden" name="estabelecimento_id" value={1} />
					<input className="form-control input-dash-text" type="hidden" name="id" value={id} />

					<div className="groupInput">
						<input
							className="form-control input-dash-text"
							type="text"
							name="nome"
							placeholder="Nome Completo do Usuário"
							value={nome}
							onChange={upppercase}
						/>
					</div>
					<div className="groupInput">
						<input
							className="form-control input-dash-text"
							type="text"
							name="login"
							placeholder="Login"
							value={login}
							onChange={onChange}
						/>
					</div>
					<div className="groupInput">
						<input
							className="form-control input-dash-text"
							type="text"
							name="email"
							placeholder="Email"
							value={email}
							onChange={onChange}
						/>
					</div>
					<div className="groupInput">
						<input
							className="form-control input-dash-text"
							type="password"
							name="senha"
							placeholder="Senha"
							value={senha}
							onChange={onChange}
						/>
					</div>
					<div className="groupInput selectElement">
						<select
							className="form-control inputSelect"
							name="status"
							value={status}
							onChange={onChangeStatus}
						>
							<option value="ATIVO">Ativo</option>
							<option value="INATIVO">Inativo</option>
						</select>
					</div>
				</form>
			</Modal>
		</Dash>
	);
};

export default Users;
