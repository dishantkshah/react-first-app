import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINT, LOCAL_STORAGE, TYPES } from "../constants";
import axios from "axios";

const initialState = {
	isLoading: false,
	isLoggedIn: false,
	userData: {},
	token: null
};

// APIs
export const doLogin = (data) => ({
	type: "API",
	payload: {
		url: API_ENDPOINT.LOGIN,
		method: "POST",
		data: data,
		hideLoader: false,
		success: (data) => ({
			type: TYPES.LOGIN_S,
			payload: data,
		}),
		error: (data) => ({
			type: TYPES.LOGIN_F,
			payload: {},
		}),
	},
});

export const doRegister = (data) => ({
	type: "API",
	payload: {
		url: API_ENDPOINT.REGISTER,
		method: "POST",
		data: data,
		hideLoader: false,
		success: (data) => ({
			type: TYPES.REGISTER_S,
			payload: data,
		}),
		error: (data) => ({
			type: TYPES.REGISTER_F,
			payload: {},
		}),
	},
});

// Reducers
const loginSlice = createSlice({
	name: "login",
	initialState: initialState,
	reducers: {
		loaderChange: (state, payload) => {
			state.isLoading = payload.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(TYPES.LOGIN_S, (state, action) => {
			axios.defaults.headers.common[
				"Authorization"
			] = `Bearer ${action.payload.access_token}`;
			localStorage.setItem(
				LOCAL_STORAGE.LS_AUTHORED,
				JSON.stringify(action.payload.access_token)
			);
			localStorage.setItem(
				LOCAL_STORAGE.LS_USER,
				JSON.stringify(action.payload)
			);

			state.userData = action.payload;
			state.token = action.payload.access_token;
			state.isLoggedIn = true;
		});

		builder.addCase(TYPES.LOGIN_F, (state, action) => {
			delete axios.defaults.headers.common["Authorization"];
			localStorage.removeItem(LOCAL_STORAGE.LS_AUTHORED);
			localStorage.removeItem(LOCAL_STORAGE.LS_USER);

			state.userData = action.payload;
			state.isLoggedIn = false;
		});

		builder.addCase(TYPES.REGISTER_S, (state, action) => {
			axios.defaults.headers.common["Authorization"] =
				action.payload.data.token;
			localStorage.setItem(
				LOCAL_STORAGE.LS_AUTHORED,
				JSON.stringify(action.payload.data.token)
			);
			localStorage.setItem(
				LOCAL_STORAGE.LS_USER,
				JSON.stringify(action.payload.data)
			);

			state.userData = action.payload;
			state.isLoggedIn = true;
		});

		builder.addCase(TYPES.REGISTER_F, (state, action) => {
			delete axios.defaults.headers.common["Authorization"];
			localStorage.removeItem(LOCAL_STORAGE.LS_AUTHORED);
			localStorage.removeItem(LOCAL_STORAGE.LS_USER);

			state.userData = action.payload;
			state.isLoggedIn = false;
		});
	},
});

export const { loaderChange } = loginSlice.actions;
export default loginSlice.reducer;
