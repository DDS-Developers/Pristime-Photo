// Thunks
import { getList } from "../thunks/albumThunk";

// Slices
import {
	setShow as setShowAlbum,
	setCartModalShow,
	setDownloadFormModalShow,
} from "../slices/albumSlice";
import { setShow as setShowPhoto } from "../slices/photoSlice";

// Components
import Album from "../components/Album";
import AlbumContent from "../components/AlbumContent";
import LargePhotoModal from "../components/LargePhotoModal";
import CartModal from "../components/CartModal";
import DownloadFormModal from "../components/DownloadFormModal";

// Dependencies
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { DateTime } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

const Row = dynamic(() => import("react-bootstrap/Row"), {
	ssr: false,
});

function Index() {
	const dispatch = useDispatch();

	const albums = useSelector((state) => state.albums);
	const photo = useSelector((state) => state.photo);

	useEffect(() => {
		dispatch(getList());
	}, []);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			album_date: new Date(),
		},
	});

	const handleBackToAlbumClick = () => {
		dispatch(setShowPhoto(false));
		dispatch(setShowAlbum(true));
	};
	const handleShowCartContentClick = () => {
		dispatch(setCartModalShow(true));
	};
	const handleProcessClick = () => {
		dispatch(setDownloadFormModalShow(true));
	};

	const onSubmit = (data) => {
		const date = DateTime.fromJSDate(data.album_date).toISODate();
		const param = new URLSearchParams({
			start_date: date,
			end_date: date,
		}).toString();

		dispatch(getList(param));
	};

	return (
		<React.Fragment>
			<div className="main py-5">
				<Container>
					<Row className="justify-content-center mb-4">
						<Col>
							<Image
								src="/images/pristime-banner.jpg"
								alt="Banner"
								className="img-fluid mb-4"
							/>
							<div>
								<h1 className="h4 mb-0 text-center">
									Galeri Foto
								</h1>
								<h2 className="h4 mb-0 text-center">
									Pristime! Event 2022
								</h2>
								<h3 className="h4 mb-0 text-center">
									Ciwalk, 24 September - 4 Oktober 2022
								</h3>
							</div>
						</Col>
					</Row>
					{albums.is_shown && (
						<Form
							onSubmit={handleSubmit(onSubmit)}
							className="mb-4"
						>
							<Row className="align-items-start justify-content-center">
								<Col xs lg={3}>
									<Controller
										control={control}
										name="album_date"
										rules={{ required: true }}
										render={({
											field: { onChange, onBlur, value },
										}) => (
											<DatePicker
												selected={value}
												onChange={onChange}
												onBlur={onBlur}
												dateFormat="dd-MM-yyyy"
												className="form-control"
												onKeyDown={(e) => {
													e.preventDefault();
												}}
											/>
										)}
									/>
									{errors.album_date && (
										<Form.Text className="text-danger">
											Silakan pilih tanggal terlebih
											dahulu.
										</Form.Text>
									)}
								</Col>
								<Col xs lg={3} className="d-grid">
									<Button type="submit" variant="danger">
										Tampilkan
									</Button>
								</Col>
							</Row>
						</Form>
					)}
					{albums.is_shown && <Album />}
					{photo.is_shown && (
						<Row className="mb-5">
							<Col lg={2} className="d-grid">
								<Button
									variant="danger"
									onClick={() => handleBackToAlbumClick()}
								>
									<FontAwesomeIcon icon={faChevronLeft} />{" "}
									Kembali
								</Button>
							</Col>
						</Row>
					)}
					{photo.is_shown && <AlbumContent />}
					<Row>
						<Col>
							<div className="text-center font-size-12">
								Seluruh foto official Pristime! Event 2022 dapat
								diunduh secara GRATIS.
							</div>
							<div className="text-center font-size-12">
								Klik tombol masukkan ke keranjang di bawah foto
								yang ingin kamu unduh, lalu tekan tombol
								Lanjutkan di kanan bawah layar untuk memroses
								pengunduhanmu.
							</div>
							<div className="text-center mb-5 font-size-12">
								Foto-foto tanpa watermark akan dikirimkan ke
								alamat email yang sama saat mengikuti event.
							</div>
							<div className="text-center font-size-12">
								<a href="#">Ketentuan Layanan</a>
								<span className="mx-3">|</span>
								<a href="#">Kebijakan Privasi</a>
							</div>
						</Col>
					</Row>
					<Row
						style={{
							position: "absolute",
							bottom: 0,
							left: "12px",
							width: "100%",
							backgroundColor: "var(--pristine-green)",
							paddingTop: "1rem",
							paddingBottom: "1rem",
							alignItems: "center",
							display: albums.cart.length > 0 ? "flex" : "none",
						}}
					>
						<Col
							xs={12}
							lg
							className="text-white text-center text-lg-start mb-3 mb-lg-0"
						>
							Jumlah Foto di Keranjang:{" "}
							<strong>{albums.cart.length}</strong>
						</Col>
						<Col
							xs={6}
							lg={2}
							className="d-grid"
							onClick={() => handleShowCartContentClick()}
						>
							<Button variant="info">Lihat Isi Keranjang</Button>
						</Col>
						<Col
							xs={6}
							lg={2}
							className="d-grid"
							onClick={() => handleProcessClick()}
						>
							<Button variant="success">Proses</Button>
						</Col>
					</Row>
				</Container>
			</div>
			<LargePhotoModal />
			<CartModal />
			<DownloadFormModal />
		</React.Fragment>
	);
}

export default Index;
