// Thunks
import { getDetails } from "../thunks/albumThunk";

// Slices
import { setShow } from "../slices/albumSlice";

// Components
import LoadingSpinner from "./LoadingSpinner";

// Dependencies
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";

function Album() {
	const dispatch = useDispatch();

	const albums = useSelector((state) => state.albums);

	const handleAlbumClick = (id) => {
		dispatch(getDetails(id));
		dispatch(setShow(false));
	};

	if (albums.is_loading) {
		return <LoadingSpinner />;
	} else {
		return albums.data.length > 0 ? (
			<Row className="row-cols-2 row-cols-md-4 row-cols-lg-6 mb-5">
				{albums.data.map((row, i) => (
					<Col
						className="mb-3 cursor-pointer"
						key={i}
						onClick={() => handleAlbumClick(row.id)}
					>
						<motion.div
							initial={{ scale: 1 }}
							whileHover={{ scale: 1.1 }}
						>
							<FontAwesomeIcon
								icon={faFolder}
								className="text-danger h-100"
							/>
						</motion.div>
						<div className="text-center">TANGGAL</div>
						<div className="text-center">
							{DateTime.fromISO(row.album_date)
								.setLocale("id")
								.toLocaleString(DateTime.DATE_FULL)}
						</div>
					</Col>
				))}
			</Row>
		) : (
			<div className="my-5 text-center">
				Tidak ada album tersedia untuk tanggal yang dipilih.
			</div>
		);
	}
}

export default Album;
