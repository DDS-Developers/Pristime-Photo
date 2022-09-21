// Slices
import { setLargePhotoModalShow } from "../slices/photoSlice";

// Dependencies
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Image from "react-bootstrap/Image";

function LargePhotoModal() {
	const dispatch = useDispatch();

	const photo = useSelector((state) => state.photo);

	const handleClose = () => {
		dispatch(setLargePhotoModalShow(false));
	};

	return (
		<Modal
			show={photo.is_large_photo_modal_shown}
			centered
			size="lg"
			onHide={() => handleClose()}
		>
			<Modal.Header closeButton>
				<Modal.Title>Large Photo View</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Image
					src={photo.selected}
					alt="Large Photo View"
					className="img-fluid"
				/>
			</Modal.Body>
		</Modal>
	);
}

export default LargePhotoModal;
