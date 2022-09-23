// Slices
import { setSelected } from "../slices/photoSlice";
import { setLargePhotoModalShow } from "../slices/photoSlice";
import { setCart } from "../slices/albumSlice";

// Components
import LoadingSpinner from "./LoadingSpinner";

// Dependencies
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { useAlert } from "react-alert";

function AlbumContent() {
	const dispatch = useDispatch();
	const alert = useAlert();

	const albums = useSelector((state) => state.albums);
	const photo = useSelector((state) => state.photo);

	const handlePhotoClick = (image) => {
		dispatch(setSelected(image));
		dispatch(setLargePhotoModalShow(true));
	};
	const handleAddToCartClick = (image) => {
		if (albums.cart.length < 1) {
			alert.show(
				"Kamu sudah memilih 1 foto, cek foto pilihanmu di bawah."
			);
		}

		const newCart = [...albums.cart, image];

		dispatch(setCart(newCart));
	};

	if (photo.is_loading) {
		return <LoadingSpinner />;
	} else {
		return photo.details.photos.length > 0 ? (
			<Row className="row-cols-2 row-cols-md-4 row-cols-lg-6 mb-5">
				{photo.details.photos.map((row, i) => (
					<Col
						className="mb-3 cursor-pointer d-flex justify-content-between flex-column"
						key={i}
					>
						<motion.div
							initial={{ scale: 1 }}
							whileHover={{ scale: 1.1 }}
							onClick={() => handlePhotoClick(row)}
						>
							<Image
								src={row}
								alt="Album Content Photo"
								className="img-fluid mb-2"
							/>
						</motion.div>
						<Button
							variant="success"
							onClick={() => handleAddToCartClick(row)}
						>
							Pilih
						</Button>
					</Col>
				))}
			</Row>
		) : (
			<div className="my-5 text-center">
				Tidak ada foto tersedia untuk album yang dipilih.
			</div>
		);
	}
}

export default AlbumContent;
