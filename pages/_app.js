import React, { Suspense } from "react";
import "../styles/global.css";
import { Provider } from "react-redux";
import { store } from "../services/store";
import { setupAxios } from "../utils";
import axios from "axios";
import Loader from "../components/loader";

setupAxios(axios, store);

function App({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Suspense
				fallback={
					<Loader>
						<h6>Loading</h6>
					</Loader>
				}
			>
				<Loader>
					<Component {...pageProps} />
				</Loader>
			</Suspense>
		</Provider>
	);
}

export default App;
