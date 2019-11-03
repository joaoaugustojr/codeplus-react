import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { CircularProgressbar } from 'react-circular-progressbar';
import { uniqueId } from 'lodash';
import { shortText } from '../services/helpers';
import api from '../services/api';
import Alert from 'react-s-alert';
import 'react-circular-progressbar/dist/styles.css';

const Upload = (props) => {
	const [ uploadedFiles, setUploadFiles ] = useState([]);

	const onUpload = (files) => {
		const uploadedFilesObject = files.map((file) => ({
			file,
			id: uniqueId(),
			name: file.name,
			progress: 0,
			uploaded: false,
			error: false
		}));

		setUploadFiles(uploadedFiles.concat(uploadedFilesObject));
	};

	const getMessage = (isDragActive, isDragReject) => {
		if (!isDragActive) {
			return (
				<div>
					<p>Arraste os Arquivos Aqui</p>
					<p id="upload-or">ou Clique para selecionar</p>
				</div>
			);
		}

		if (isDragActive) {
			return <p>Solte os Arquivos Aqui em ".txt" ou ".csv"</p>;
		}
	};

	const iniciaUpload = () => {
		var auxUpdateFile = uploadedFiles;

		auxUpdateFile.forEach((file) => {
			const form = new FormData();
			form.append('file', file.file);
			api
				.post('/upload', form, {
					onUploadProgress: (e) => {
						const progress = parseInt(Math.round(e.loaded * 100 / e.total));
						setUploadFiles(updateFile(file.id, { progress }));
					}
				})
				.then((response) => {
					setUploadFiles((prev) => updateFile(file.id, { uploaded: true }));
					props.functionAtualiza();
				})
				.catch((error) => {
					setUploadFiles((prev) => updateFile(file.id, { error: true }));
				});
		});
	};

	const updateFile = (id, data) => {
		var auxUpdateFile = uploadedFiles;

		let auxUpdate = auxUpdateFile.map((file) => {
			return { ...file, ...data };
		});

		return auxUpdate;
	};

	const limparLista = () => {
		setUploadFiles([]);
	};

	return (
		<div className="content-upload">
			<div className="header-upload">
				<h5>Importar Arquivos</h5>
			</div>
			<section className="row-upload d-flex">
				<Dropzone accept=".txt, .csv, .xls" onDropAccepted={onUpload}>
					{({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
						<div id="drag-upload" className={isDragActive ? 'drag-upload-isDrag' : ''} {...getRootProps()}>
							<input {...getInputProps()} />
							<ion-icon class="icon-upload" name="arrow-dropup-circle" />
							{getMessage(isDragActive, isDragReject)}
						</div>
					)}
				</Dropzone>

				<div className="list-upload">
					<ul>
						{uploadedFiles.length > 0 &&
							uploadedFiles.map((file) => (
								<li className="item-upload d-flex" key={file.id} id={file.id}>
									<p className="txt-upload">{shortText(file.name, 40, '...')}</p>
									{!file.uploaded &&
									!file.error && (
										<CircularProgressbar
											key={file.id}
											styles={{
												root: { width: 22 },
												path: { stroke: '#7159c1' }
											}}
											strokeWidth={15}
											value={file.progress}
										/>
									)}
									{file.uploaded && (
										<ion-icon class="icon-upload-list-check" name="checkmark-circle" />
									)}
									{file.erro && <ion-icon class="icon-upload-list-alert" name="alert" />}
								</li>
							))}
					</ul>
				</div>
			</section>
			<div className="action-upload">
				<button type="button" className="btn-code" onClick={iniciaUpload}>
					Iniciar Importação
				</button>
				<button type="button" className="btn-green" onClick={limparLista}>
					Nova Importação
				</button>
			</div>
		</div>
	);
};

export default Upload;
