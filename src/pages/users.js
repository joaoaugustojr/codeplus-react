import React from 'react';
import Dash from '../components/dash';

const Users = () => {
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
						value=""
						// onChange={this.pesquisar}
					/>
				</div>
			</section>
		</Dash>
	);
};

export default Users;
