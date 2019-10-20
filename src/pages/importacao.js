import React, { useState, useEffect } from 'react';
import Dash from '../components/dash';
import Upload from '../components/upload';
import '../css/upload.css';

const Importacao = () => {
	return (
		<Dash caminho="Dashboard - Importar Arquivos">
			<section className="headerTable" />
			<section className="bodyUpload">
				<Upload />
			</section>
		</Dash>
	);
};

export default Importacao;
