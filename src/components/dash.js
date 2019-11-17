import React from 'react';
import { getUser, isAuth, logoutStart } from '../services/auth';
import { Confirm } from '../services/confirmDialog';
import Alert from 'react-s-alert';

import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import useStyles from '../useStyles/dashStyle';

//componestes
import {
	AppBar,
	Toolbar,
	Drawer,
	CssBaseline,
	List,
	Divider,
	IconButton,
	ListItemIcon,
	ListItemText,
	ListItem,
	Container,
	Paper,
	Typography
} from '@material-ui/core/';

//icones
import {
	ChevronLeft,
	ChevronRight,
	MoveToInbox,
	Menu,
	Dashboard,
	Apps,
	LocalOffer,
	Today,
	Business,
	ExitToApp,
	PersonAdd,
	Settings
} from '@material-ui/icons/';
import ListIcon from '@material-ui/icons/List';

const Dash = (props) => {
	isAuth();

	function logout() {
		Confirm('', 'Deseja Realmente Sair do CodePlus?', 'question', 'Sim', 'Não :)', () => {
			logoutStart();
		});
	}

	const classes = useStyles();
	const theme = useTheme();
	const [ open, setOpen ] = React.useState(true);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<Alert effect="slide" position="bottom-right" timeout={5000} stack={{ limit: 0 }} />
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, open && classes.hide)}
					>
						<Menu style={{ fill: 'white' }} />
					</IconButton>
					<div className={(classes.sectionDesktop, 'infoUser')}>
						<ul className="text-white d-none d-md-inline">
							<li>
								<p>Bem Vindo! {JSON.parse(getUser()).usuario.nome}</p>
							</li>
							<li>
								<p>{JSON.parse(getUser()).estabelecimento.razao}</p>
							</li>
						</ul>
					</div>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? (
							<ChevronLeft style={{ fill: 'white' }} />
						) : (
							<ChevronRight style={{ fill: 'white' }} />
						)}
					</IconButton>
				</div>
				<Divider />
				<img className="d-block menuimg" alt="img" src={'/images/logocodeplus.png'} />
				<Divider />
				<List>
					<ListItem button component="a" href="/dashboard">
						<ListItemIcon>
							<Dashboard style={{ fill: 'white' }} />
						</ListItemIcon>
						<ListItemText primary={'Dashboard'} style={{ color: 'white' }} />
					</ListItem>
					<ListItem button component="a" href="/dashboard/produtos">
						<ListItemIcon>
							<Apps style={{ fill: 'white' }} />
						</ListItemIcon>
						<ListItemText primary={'Produtos'} style={{ color: 'white' }} />
					</ListItem>
					<ListItem button component="a" href="/dashboard/contagens">
						<ListItemIcon>
							<ListIcon style={{ fill: 'white' }} />
						</ListItemIcon>
						<ListItemText primary={'Contagens'} style={{ color: 'white' }} />
					</ListItem>
					<ListItem button component="a" href="/dashboard/alteracoes">
						<ListItemIcon>
							<LocalOffer style={{ fill: 'white' }} />
						</ListItemIcon>
						<ListItemText primary={'Alterações'} style={{ color: 'white' }} />
					</ListItem>
					<ListItem button component="a" href="/dashboard/validade">
						<ListItemIcon>
							<Today style={{ fill: 'white' }} />
						</ListItemIcon>
						<ListItemText primary={'Validade'} style={{ color: 'white' }} />
					</ListItem>
					<ListItem button component="a" href="/dashboard/importacao">
						<ListItemIcon>
							<MoveToInbox style={{ fill: 'white' }} />
						</ListItemIcon>
						<ListItemText primary={'Importação'} style={{ color: 'white' }} />
					</ListItem>
					<ListItem button component="a" href="/dashboard/usuarios">
						<ListItemIcon>
							<PersonAdd style={{ fill: 'white' }} />
						</ListItemIcon>
						<ListItemText primary={'Usuários'} style={{ color: 'white' }} />
					</ListItem>
					<ListItem button component="a" href="/dashboard/estabelecimentos">
						<ListItemIcon>
							<Business style={{ fill: 'white' }} />
						</ListItemIcon>
						<ListItemText primary={'Estabelecimentos'} style={{ color: 'white' }} />
					</ListItem>
					<ListItem button component="a" href="/dashboard/configuracoes">
						<ListItemIcon>
							<Settings style={{ fill: 'white' }} />
						</ListItemIcon>
						<ListItemText primary={'Configurações'} style={{ color: 'white' }} />
					</ListItem>
					<ListItem button onClick={logout}>
						<ListItemIcon>
							<ExitToApp style={{ fill: 'white' }} style={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText primary={'Sair'} style={{ color: 'white' }} />
					</ListItem>
				</List>
				<Divider />
			</Drawer>
			<main
				className={clsx(classes.content, 'main-content', {
					[classes.contentShift]: open
				})}
			>
				<div className={classes.drawerHeader} />
				<Container maxWidth="xl" className="dashContent">
					<Paper className={classes.paper}>
						<Typography className="text-white" component="p">
							{props.caminho}
						</Typography>
					</Paper>
					{props.children}
				</Container>
			</main>
		</div>
	);
};

export default Dash;
