import React, { useState, useEffect } from 'react';
import Dash from '../components/dash';
import Table from '../components/table';
import Modal from '../components/modal';
import Alert from 'react-s-alert';
import api from '../services/api';
import { upperCaseValue } from '../services/helpers';
import { Confirm } from '../services/confirmDialog';

const Estabelecimentos = () => {
	const [ data, setData ] = useState([]);
	const [ id, setId ] = useState('');
	const [ search, setSearch ] = useState('');
	const [ codigo, setCodigo ] = useState('');
	const [ razao, setRazao ] = useState('');
	const [ cnpj, setCnpj ] = useState('');
	const [ email, setEmail ] = useState('');

	const head = {
		codigo: 'Código',
		razao: 'Razão Social',
		cnpj: 'CNPJ',
		email: 'Email'
	};

	const hidden = {
		id: 'd-none',
		created_at: 'd-none',
		updated_at: 'd-none'
	};

	const config = {
		headers: { 'Content-Type': 'multipart/form-data' }
	};

	useEffect(() => {
		getEstabelecimentos();
	}, []);

	const getEstabelecimentos = async () => {
		const res = await api.get('/estabelecimentos/all');

		if (res.data.response) {
			setData(res.data.estabelecimentos);
		} else {
			Alert.error(res.data.message);
		}
	};

	const onChange = (ev) => {
		if (ev.target.name === 'codigo') setCodigo(ev.target.value);
		if (ev.target.name === 'razao') setRazao(ev.target.value);
		if (ev.target.name === 'cnpj') setCnpj(ev.target.value);
		if (ev.target.name === 'email') setEmail(ev.target.value);
	};

	const carregarDados = async (id) => {
		const res = await api.get('/estabelecimentos/show/' + id);
		if (res.data.response) {
			setId(res.data.estabelecimento.id);
			setCodigo(res.data.estabelecimento.codigo);
			setRazao(res.data.estabelecimento.razao);
			setCnpj(res.data.estabelecimento.cnpj);
			setEmail(res.data.estabelecimento.email);
		} else {
			Alert.error(res.data.message);
		}
	};

	const pesquisar = (ev) => {
		setSearch(ev.target.value);
	};

	const upppercase = (ev) => {
		setRazao(upperCaseValue(ev.target.value));
	};

	const addEstabelecimento = async () => {
		const form = document.querySelector('#addEstabelecimentoForm');
		const data = new FormData(form);
		const res = await api.post('/estabelecimentos/create', data, config);

		if (res.data.response) {
			limparCampos();
			getEstabelecimentos();
			Alert.success(res.data.message);
		} else {
			res.data.map((key) => Alert.error(key.message));
		}
	};

	const editEstabelecimento = async () => {
		const form = document.querySelector('#editEstabelecimentoForm');
		const data = new FormData(form);
		const res = await api.post('/estabelecimentos/update', data, config);

		if (res.data.response) {
			limparCampos();
			getEstabelecimentos();
			Alert.success(res.data.message);
		} else {
			res.data.map((key) => Alert.error(key.message));
		}
	};

	const limparCampos = () => {
		setCodigo('');
		setRazao('');
		setCnpj('');
		setEmail('');
	};

	const deleteEstabelecimento = (id) => {
		Confirm('', 'Deseja excluir este registro?', 'warning', 'Sim', 'Não :)', async () => {
			const res = await api.get('/estabelecimentos/delete/' + id);
			if (res.data.response) {
				getEstabelecimentos();
				Alert.success(res.data.message);
			} else {
				Alert.error(res.data.message);
			}
		});
	};

	return (
		<Dash caminho="Dashboard - Administrar Estabelecimentos">
			<section className="headerTable">
				<button type="button" data-toggle="modal" data-target="#addEstabelecimento">
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
						placeholder="Pesquisar Estabelecimentos"
						aria-label="estabelecimento"
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
				functionDelete={deleteEstabelecimento}
				editDataTarget="#editEstabelecimento"
				functionEdit={carregarDados}
			/>
			<Modal
				title="Adicionar Estabelecimento"
				size="" /*modal-sm lg xl*/
				idModal="addEstabelecimento"
				actionText="Adicionar"
				cancelText="Cancelar"
				idForm="addEstabelecimentoForm"
				function="add"
				addAction={addEstabelecimento}
			>
				<form className="d-inline-bloc basicInput" id="addEstabelecimentoForm">
					{/* <input className="form-control input-dash-text" type="hidden" name="estabelecimento_id" value={1} /> */}

					<div className="groupInput">
						<input
							className="form-control input-dash-text"
							type="number"
							name="codigo"
							placeholder="Código do Estabelecimento"
							value={codigo}
							onChange={onChange}
						/>
					</div>
					<div className="groupInput">
						<input
							className="form-control input-dash-text"
							type="text"
							name="razao"
							placeholder="Razão Social"
							value={razao}
							onChange={(onChange, upppercase)}
						/>
					</div>
					<div className="groupInput">
						<input
							className="form-control input-dash-text"
							type="text"
							name="cnpj"
							placeholder="CNPJ"
							value={cnpj}
							onChange={onChange}
						/>
					</div>
					<div className="groupInput">
						<input
							className="form-control input-dash-text"
							type="email"
							name="email"
							placeholder="Email"
							value={email}
							onChange={onChange}
						/>
					</div>
				</form>
			</Modal>
			<Modal
				title="Editar Estabelecimento"
				size="" /*modal-sm lg xl*/
				idModal="editEstabelecimento"
				actionText="Salvar Alterações"
				cancelText="Cancelar"
				idForm="editEstabelecimentoForm"
				function="edit"
				editAction={editEstabelecimento}
			>
				<form className="d-inline-bloc basicInput" id="editEstabelecimentoForm">
					{/* <input className="form-control input-dash-text" type="hidden" name="estabelecimento_id" value={1} /> */}
					<input className="form-control input-dash-text" type="hidden" name="id" value={id} />

					<div className="groupInput">
						<input
							className="form-control input-dash-text"
							type="number"
							name="codigo"
							placeholder="Código do Estabelecimento"
							value={codigo}
							disabled="disabled"
						/>
					</div>
					<div className="groupInput">
						<input
							className="form-control input-dash-text"
							type="text"
							name="razao"
							placeholder="Razão Social"
							value={razao}
							onChange={(onChange, upppercase)}
						/>
					</div>
					<div className="groupInput">
						<input
							className="form-control input-dash-text"
							type="text"
							name="cnpj"
							placeholder="CNPJ"
							value={cnpj}
							onChange={onChange}
						/>
					</div>
					<div className="groupInput">
						<input
							className="form-control input-dash-text"
							type="email"
							name="email"
							placeholder="Email"
							value={email}
							onChange={onChange}
						/>
					</div>
				</form>
			</Modal>
		</Dash>
	);
};

export default Estabelecimentos;
