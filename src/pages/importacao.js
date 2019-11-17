import React, { useState, useEffect } from 'react';
import Dash from '../components/dash';
import Upload from '../components/upload';
import '../css/upload.css';
import 'react-tabs/style/react-tabs.css';
import api from '../services/api';
import Alert from 'react-s-alert';
import Table from '../components/table';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, Tabs, Tab, Typography, Box } from '@material-ui/core/';

import { Apps, MoveToInbox, Today, Assignment } from '@material-ui/icons/';
import ListIcon from '@material-ui/icons/List';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper
	}
}));

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`wrapped-tabpanel-${index}`}
			aria-labelledby={`wrapped-tab-${index}`}
			{...other}
		>
			<Box p={3}>{children}</Box>
		</Typography>
	);
}

const Importacao = () => {
	const classes = useStyles();

	const [ data, setData ] = useState([]);
	const [ search, setSearch ] = useState('');
	const [ value, setValue ] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

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
			<Paper className={classes.root}>
				<Tabs
					value={value}
					onChange={handleChange}
					variant="scrollable"
					indicatorColor="primary"
					textColor="primary"
					scrollButtons="on"
					centered
				>
					<Tab label="Upload de Arquivos" icon={<MoveToInbox />} />
					<Tab label="Lista de Produtos" icon={<Apps />} />
					<Tab label="Lista de Contagens" icon={<ListIcon />} />
					<Tab label="Lista de Validades" icon={<Today />} />
					<Tab label="Logs de Uploads" icon={<Assignment />} />
				</Tabs>
			</Paper>
			<TabPanel value={value} index={0}>
				<Upload functionAtualiza={getList} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Table data={data} head={head} hidden={hidden} search={search} action={false} />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<Table data={data} head={head} hidden={hidden} search={search} action={false} />
			</TabPanel>
			<TabPanel value={value} index={3}>
				<Table data={data} head={head} hidden={hidden} search={search} action={false} />
			</TabPanel>
			<TabPanel value={value} index={4}>
				<Table data={data} head={head} hidden={hidden} search={search} action={false} />
			</TabPanel>
		</Dash>
	);
};

export default Importacao;
