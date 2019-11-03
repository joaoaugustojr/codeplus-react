import React, { useState, useEffect } from 'react';
import Dash from '../components/dash';
import Upload from '../components/upload';
import '../css/upload.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Table from '../components/table';
import api from '../services/api';
import Alert from 'react-s-alert';

const Importacao = () => {
	const [ data, setData ] = useState([]);
	const [ search, setSearch ] = useState('');

	const head = {
		id: 'ID',
		nome: 'Usuário',
		descricao: 'Arquivo',
		status: 'Status',
		created_at: 'Data do Upload'
	};

	const hidden = {};

	useEffect(() => {
		getList();
	}, []);

	const getList = async () => {
		const form = new FormData();
		form.append('status', 'PENDENTE');
		form.append('estabelecimento_id', 1);

		const res = await api.get('/upload/list', form);

		if (res.data.response) {
			setData(res.data.arquivos);
		} else {
			Alert.error(res.data.message);
		}
	};

	return (
		<Dash caminho="Dashboard - Importar Arquivos">
			<Tabs>
				<TabList className="listItens">
					<Tab>Upload de Arquivos</Tab>
					<Tab>Lista de Produtos</Tab>
					<Tab>lista de Contagem</Tab>
					<Tab>lista de Validade</Tab>
					<Tab>Logs</Tab>
				</TabList>

				<TabPanel className="bodyUpload">
					<Upload functionAtualiza={getList} />
				</TabPanel>
				<TabPanel className="bodyUpload">
					<Table data={data} head={head} hidden={hidden} search={search} action={false} />
				</TabPanel>
				<TabPanel className="bodyUpload">
					<Table data={data} head={head} hidden={hidden} search={search} action={false} />
				</TabPanel>
				<TabPanel className="bodyUpload">
					<Table data={data} head={head} hidden={hidden} search={search} action={false} />
				</TabPanel>
				<TabPanel className="bodyUpload">
					<Table data={data} head={head} hidden={hidden} search={search} action={false} />
				</TabPanel>
			</Tabs>
		</Dash>
	);
};

export default Importacao;
