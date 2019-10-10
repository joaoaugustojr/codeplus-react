import React from 'react';

const Modal = (props) => {
	return (
		<div>
			<div
				className="modal fade"
				id={props.idModal}
				tabIndex="-1"
				role="dialog"
				aria-labelledby={'modalLabel'}
				aria-hidden="true"
			>
				<div className={props.size + ' modal-dialog modal-dialog-centered'} role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="modalLabel">
								{props.title}
							</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">{props.children}</div>
						<div className="modal-footer">
							{props.function === 'add' && (
								<button
									type="submit"
									className="btn btn-confirm"
									onClick={props.addAction}
									data-dismiss="modal"
								>
									{props.actionText || 'Salvar'}
								</button>
							)}

							{props.function === 'edit' && (
								<button
									type="submit"
									className="btn btn-confirm"
									onClick={props.editAction}
									data-dismiss="modal"
								>
									{props.actionText || 'Editar'}
								</button>
							)}

							<button type="button" className="btn btn-cancel" data-dismiss="modal">
								{props.cancelText || 'Sair'}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
