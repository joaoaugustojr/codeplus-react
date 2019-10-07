import React, { useState, useEffect } from 'react';

const Modal = (props) => {
	return (
		<div>
			<div
				class="modal fade"
				id={props.idModal}
				tabindex="-1"
				role="dialog"
				aria-labelledby={'modalLabel'}
				aria-hidden="true"
			>
				<div className={props.size + ' modal-dialog modal-dialog-centered'} role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="modalLabel">
								{props.title}
							</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">{props.children}</div>
						<div class="modal-footer">
							{props.function == 'add' && (
								<button type="button" class="btn btn-primary">
									{props.actionText || 'Salvar'}
								</button>
							)}

							<button type="button" class="btn btn-secondary" data-dismiss="modal">
								{props.cancelText || 'Sair'}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
