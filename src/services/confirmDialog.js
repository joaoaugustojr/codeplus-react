import Swal from 'sweetalert2';

export const Confirm = (title, text, type, textConfirm, TextCancel, functionState) => {
	const swalWithBootstrapButtons = Swal.mixin({
		customClass: {
			confirmButton: 'btn btn-confirm',
			cancelButton: 'btn btn-cancel'
		},
		buttonsStyling: false
	});

	swalWithBootstrapButtons
		.fire({
			title: title,
			text: text,
			type: type,
			showCancelButton: true,
			confirmButtonColor: '#cb62cc',
			cancelButtonColor: '#858585',
			confirmButtonText: textConfirm,
			cancelButtonText: TextCancel
		})
		.then((result) => {
			if (result.value) {
				functionState();
			}
		});
};
