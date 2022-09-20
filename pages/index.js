// Dependencies
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Row = dynamic(() => import("react-bootstrap/Row"), {
	ssr: false,
});

const dummyAlbums = Array.from(Array(10).keys());

function Index() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			album_date: new Date(),
		},
	});

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
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
							<h1 className="h4 mb-0 text-center">Galeri Foto</h1>
							<h2 className="h4 mb-0 text-center">
								Pristime! Event 2022
							</h2>
							<h3 className="h4 mb-0 text-center">
								Ciwalk, 24 September - 4 Oktober 2022
							</h3>
						</div>
					</Col>
				</Row>
				<Form onSubmit={handleSubmit(onSubmit)} className="mb-4">
					<Row className="align-items-start">
						<Col xs lg={9}>
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
									Silakan pilih tanggal terlebih dahulu.
								</Form.Text>
							)}
						</Col>
						<Col xs lg className="d-grid">
							<button className="btn bg-pristine-green border-pristine-green border-pristine-green:hover text-white text-pristine-green">
								Tampilkan
							</button>
						</Col>
					</Row>
				</Form>
				<Row className="row-cols-2 row-cols-md-4 row-cols-lg-6 mb-5">
					{dummyAlbums.map((row) => (
						<Col className="mb-3 cursor-pointer" key={row}>
							<motion.div
								initial={{ scale: 1 }}
								whileHover={{ scale: 1.1 }}
							>
								<FontAwesomeIcon
									icon={faFolder}
									className="text-pristine-green h-100"
								/>
							</motion.div>
							<div className="text-center">TANGGAL</div>
							<div className="text-center">24 September 2022</div>
						</Col>
					))}
				</Row>
				<Row>
					<Col>
						<div className="text-center font-size-12">
							Seluruh foto official Pristime! Event 2022 dapat
							diunduh secara GRATIS.
						</div>
						<div className="text-center font-size-12">
							Klik tombol masukkan ke keranjang di bawah foto yang
							ingin kamu unduh, lalu tekan tombol Lanjutkan di
							kanan bawah layar untuk memroses pengunduhanmu.
						</div>
						<div className="text-center mb-5 font-size-12">
							Foto-foto tanpa watermark akan dikirimkan ke alamat
							email yang sama saat mengikuti event.
						</div>
						<div className="text-center font-size-12">
							<a href="#">Ketentuan Layanan</a>
							<span className="mx-3">|</span>
							<a href="#">Kebijakan Privasi</a>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default Index;
