// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/globals.css";

// Scripts
import { store } from "../store";
import { Provider } from "react-redux";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Head>
				<title>Pristine8.6+ Pristime Photo</title>
				<meta
					name="description"
					content="Pristine8.6+ Pristime Photo"
				/>
				<link rel="icon" href="/images/pristine-8-6-logo.png" />
			</Head>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
