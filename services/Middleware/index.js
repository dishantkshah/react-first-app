import axios from "axios";
import { loaderChange } from "../AuthSlice";
import { API_BASE } from "../../constants";

console.log(process.env.NEXT_PUBLIC_REACT_APP_API_BASE);

const reduxApiMiddleWare = (store) => (next) => (action) => {
	if (next) next(action);

	const { type, payload } = action;

	if (type === "API") {
		const {
			url,
			data,
			success,
			error,
			hideLoader = false,
			method = "GET",
		} = payload;

		if (!hideLoader) {
			store.dispatch(loaderChange(true));
		}

		return axios({
			baseURL: process.env.NEXT_PUBLIC_REACT_APP_API_BASE,
			method,
			url,
			data,
		})
			.then((res) => {
				store.dispatch(loaderChange(false));

				if (success) {
					store.dispatch(success(res));
				}

				return Promise.resolve(res.data);
			})
			.catch((err) => {
				store.dispatch(loaderChange(false));
				if (err) {
					store.dispatch(error(err?.response?.data));
				}
				return Promise.reject(err?.response?.data);
			});
	}
};

export default reduxApiMiddleWare;
