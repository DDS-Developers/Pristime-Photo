// Slices
import {
	setDownloadFormModalShow,
	setDownloadLoading,
} from "../slices/albumSlice";

// Constants
import URL from "../constants/URL";

// Dependencies
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";

const schema = yup.object().shape({
	name: yup.string().required("Silakan isi nama kamu."),
	email: yup
		.string()
		.email("Silakan masukkan email yang valid.")
		.required("Silakan isi email kamu."),
	phone: yup.string().required("Silakan isi nomor handphone kamu."),
});

function DownloadFormModal() {
	const dispatch = useDispatch();

	const albums = useSelector((state) => state.albums);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		if (albums.is_download_form_modal_shown) {
			reset();
		}
	}, [albums.is_download_form_modal_shown]);

	const handleClose = () => {
		dispatch(setDownloadFormModalShow(false));
	};

	const onSubmit = async (data) => {
		dispatch(setDownloadLoading(true));

		data.photos = albums.cart;

		const url = `${URL.API}/pristime_photos/download`;

		try {
			const result = await axios.post(url, data);

			if (result) {
				window.open(result.data.result.url);

				const confirm = await Swal.fire({
					title: "Sukses!",
					text: "Unduhan berhasil, terima kasih!",
					icon: "success",
				});

				if (confirm) {
					window.location.href = window.location.href;
				}
			}
		} catch (error) {
			var message;

			if (error.response && error.response.data.message) {
				message = error.response.data.message;
			} else {
				message = error.message;
			}

			const confirm = await Swal.fire({
				title: "Error!",
				text: message,
				icon: "error",
			});

			if (confirm) {
				dispatch(setDownloadLoading(false));
			}
		}
	};

	return (
		<Modal
			show={albums.is_download_form_modal_shown}
			size="lg"
			centered
			onHide={() => handleClose()}
		>
			<Modal.Header closeButton>
				Isi form berikut untuk melanjutkan.
			</Modal.Header>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Modal.Body>
					<div className="d-grid gap-3">
						<Row>
							<Form.Label className="col-lg-3 col-form-label">
								Nama
							</Form.Label>
							<Col>
								<Form.Control
									type="text"
									placeholder="John Doe"
									defaultValue=""
									{...register("name")}
								/>
								<Form.Text className="text-danger">
									{errors.name?.message}
								</Form.Text>
							</Col>
						</Row>
						<Row>
							<Form.Label className="col-lg-3 col-form-label">
								Email
							</Form.Label>
							<Col>
								<Form.Control
									type="email"
									placeholder="john.doe@gmail.com"
									defaultValue=""
									{...register("email")}
								/>
								<Form.Text className="text-danger">
									{errors.email?.message}
								</Form.Text>
							</Col>
						</Row>
						<Row>
							<Form.Label className="col-lg-3 col-form-label">
								No. Handphone
							</Form.Label>
							<Col>
								<Form.Control
									type="text"
									placeholder="081234567890"
									defaultValue=""
									{...register("phone")}
								/>
								<Form.Text className="text-danger">
									{errors.phone?.message}
								</Form.Text>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Check
									type="checkbox"
									id="tnc-checkbox"
									label="Saya menyetujui untuk tidak menyalahgunakan semua materi foto yang ada di website ini dalam bentuk apapun dan hal-hal lain sesuai syarat &amp; ketentuan Pristine8.6+"
								/>
							</Col>
						</Row>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="success"
						type="submit"
						disabled={albums.is_download_loading}
					>
						{albums.is_download_loading
							? "Mohon Tunggu ..."
							: "Unduh"}
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}

export default DownloadFormModal;
