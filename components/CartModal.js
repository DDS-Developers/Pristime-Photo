// Slices
import {
	setCartModalShow,
	setDownloadFormModalShow,
} from "../slices/albumSlice";

// Dependencies
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

function CartModal() {
	const dispatch = useDispatch();

	const albums = useSelector((state) => state.albums);

	const handleClose = () => {
		dispatch(setCartModalShow(false));
	};
	const handleProcessClick = () => {
		dispatch(setDownloadFormModalShow(true));
	};

	return (
		<Modal
			show={albums.is_cart_modal_shown}
			size="lg"
			centered
			onHide={() => handleClose()}
		>
			<Modal.Header closeButton>Isi Keranjang</Modal.Header>
			<Modal.Body>
				<Row className="row-cols-2 row-cols-lg-4">
					{albums.cart.map((row, i) => (
						<Col className="d-flex align-items-center" key={i}>
							<Image
								src={row}
								alt="Photo"
								className="img-fluid"
							/>
						</Col>
					))}
				</Row>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="success" onClick={() => handleProcessClick()}>
					Proses
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default CartModal;
