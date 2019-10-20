import React, { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';

const Upload = () => {
	return (
		<div className="content-upload">
			<div className="header-upload">
				<h5>Importar Arquivos</h5>
			</div>
			<section className="row-upload d-flex">
				<Dropzone accept="image/*" onDropAccepted={() => {}}>
					{({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
						<div id="drag-upload" className={isDragActive ? 'drag-upload-isDrag' : ''} {...getRootProps()}>
							<input {...getInputProps()} />
							<ion-icon class="icon-upload" name="arrow-dropup-circle" />
							<p>Arraste os Arquivos Aqui</p>
							<p id="upload-or">ou Clique para selecionar</p>
						</div>
					)}
				</Dropzone>

				<div className="list-upload">
					<ul>
						<li className="item-upload d-flex">
							<p className="txt-upload">nome arquivo.txt</p>
							<ion-icon class="icon-upload-list-check" name="checkmark-circle" />
						</li>
						<li className="item-upload d-flex">
							<p>nome arquivo produto.csv</p>
							<ion-icon class="icon-upload-list-check" name="checkmark-circle" />
						</li>
						<li className="item-upload d-flex">
							<p>nome arquivo produto.xls</p>
							<ion-icon class="icon-upload-list-alert" name="alert" />
						</li>
						<li className="item-upload d-flex">
							<p>nome arquivo produto gran...</p>
							<ion-icon class="icon-upload-list-alert" name="alert" />
						</li>
						<li className="item-upload d-flex">
							<p>nome arquivo produto gran...</p>
							<ion-icon class="icon-upload-list-check" name="checkmark-circle" />
						</li>
						<li className="item-upload d-flex">
							<p>nome arquivo produto.xls</p>
							<ion-icon class="icon-upload-list-check" name="checkmark-circle" />
						</li>
					</ul>
				</div>
			</section>
			<div className="action-upload">
				<button type="button">Iniciar Importação</button>
			</div>
		</div>
	);
};

export default Upload;
