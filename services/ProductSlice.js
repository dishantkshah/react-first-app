import { createSlice } from "@reduxjs/toolkit";
import path from "path";
import { API_ENDPOINT, TYPES } from "../constants";
import fs from "fs";

const initialState = {
	productList: {},
	productData: {},
};

export const getProductList = (
	page = 1,
	limit = 10,
	search = "",
	filter = ""
) => ({
	type: "API",
	payload: {
		url: `${API_ENDPOINT.GET_ALL_PRODUCTS}?page=${page}&limit=${limit}`,
		method: "GET",
		hideLoader: false,
		success: (data) => ({
			type: TYPES.GET_ALL_PRODUCTS_S,
			payload: data,
		}),
		error: () => ({
			type: TYPES.GET_ALL_PRODUCTS_F,
			payload: {},
		}),
	},
});

export function getAllPostIds(fileName) {
	// Returns an array that looks like this:
	// [
	//   {
	//     params: {
	//       id: 'ssg-ssr'
	//     }
	//   },
	//   {
	//     params: {
	//       id: 'pre-rendering'
	//     }
	//   }
	// ]
	return {
		params: {
			id: fileName.replace(/\.md$/, ""),
		},
	};
}

export const getProductData = (id) => ({
	type: "API",
	payload: {
		url: `${API_ENDPOINT.GET_PRODUCT}/${id}`,
		method: "GET",
		hideLoader: false,
		success: (data) => ({
			type: TYPES.GET_PRODUCTS_S,
			payload: data,
		}),
		error: () => ({
			type: TYPES.GET_PRODUCTS_F,
			payload: {},
		}),
	},
});

export const createProductData = (data) => ({
	type: "API",
	payload: {
		url: `${API_ENDPOINT.CREATE_PRODUCT}`,
		method: "POST",
		hideLoader: false,
		data: data,
		success: (data) => ({
			type: TYPES.CREATE_PRODUCT_S,
			payload: data,
		}),
		error: () => ({
			type: TYPES.CREATE_PRODUCT_F,
			payload: {},
		}),
	},
});

export const editProductData = (id, data) => ({
	type: "API",
	payload: {
		url: `${API_ENDPOINT.GET_PRODUCT}/${id}`,
		method: "PATCH",
		hideLoader: false,
		data: data,
		success: (data) => ({
			type: TYPES.EDIT_PRODUCT_S,
			payload: data,
		}),
		error: () => ({
			type: TYPES.EDIT_PRODUCT_F,
			payload: {},
		}),
	},
});

export const deleteProductData = (data) => ({
	type: "API",
	payload: {
		url: `${API_ENDPOINT.DELETE_PRODUCT}`,
		method: "POST",
		hideLoader: false,
		data: data,
		success: (data) => ({
			type: TYPES.DELETE_PRODUCT_S,
			payload: data,
		}),
		error: () => ({
			type: TYPES.DELETE_PRODUCT_F,
			payload: {},
		}),
	},
});

const productSlice = createSlice({
	name: "product",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(TYPES.GET_ALL_PRODUCTS_S, (state, action) => {
			state.productList = action.payload;
		});
		builder.addCase(TYPES.GET_ALL_PRODUCTS_F, (state) => {
			state.productList = {};
		});

		builder.addCase(TYPES.GET_PRODUCTS_S, (state, action) => {
			state.productData = action.payload;
		});
		builder.addCase(TYPES.GET_PRODUCTS_F, (state) => {
			state.productData = {};
		});

		builder.addCase(TYPES.CREATE_PRODUCT_S, (state, action) => {
			state.productData = action.payload;
		});
		builder.addCase(TYPES.CREATE_PRODUCT_F, (state) => {
			state.productData = {};
		});

		builder.addCase(TYPES.EDIT_PRODUCT_S, (state, action) => {
			state.productData = action.payload;
		});
		builder.addCase(TYPES.EDIT_PRODUCT_F, (state) => {
			state.productData = {};
		});

		builder.addCase(TYPES.DELETE_PRODUCT_S, (state, action) => {
			state.productData = action.payload;
		});
		builder.addCase(TYPES.DELETE_PRODUCT_F, (state) => {
			state.productData = {};
		});
	},
});

export default productSlice.reducer;
