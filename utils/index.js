import { TYPES, LOCAL_STORAGE } from "../constants";

export const toAbsoluteUrl = (pathname) => process.env.PUBLIC_URL + pathname;

export const setupAxios = (axios, store) => {
	if (typeof window !== "undefined") {
		const token = window.localStorage.getItem(LOCAL_STORAGE.LS_AUTHORED) !== "undefined"
			? JSON.parse(window.localStorage.getItem(LOCAL_STORAGE.LS_AUTHORED))
			: null;
		const userData = window.localStorage.getItem(LOCAL_STORAGE.LS_USER) !== "undefined"
			? JSON.parse(window.localStorage.getItem(LOCAL_STORAGE.LS_USER))
			: null;

		// It's used to rehydrate redux auth data when page is refreshed
		if (token) {
			store.dispatch({ type: TYPES.LOGIN_S, payload: { data: userData } });
		} else {
			store.dispatch({ type: TYPES.LOGIN_F, payload: {} });
		}

		// It's used to intercept all the axios api response
		axios.interceptors.response.use(null, (err) => {
			if (err.response) {
				if (err.response.status === 403) {
					store.dispatch({ type: TYPES.LOGIN_F });
					return Promise.reject(err);
				} else {
					return Promise.reject(err);
				}
			} else if (err.request) {
				return Promise.reject({
					response: {
						data: {
							message: "Something went wrong, Please try again later!!!",
						},
					},
				});
			}
		});
	}
};
