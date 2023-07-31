export const { NEXT_PUBLIC_REACT_APP_API_BASE: API_BASE } = process.env;
export const { NEXT_PUBLIC_REACT_APP_NAME: APP_NAME } = process.env;

export const LOCAL_STORAGE = {
	LS_USER: `user${APP_NAME}`,
	LS_AUTHORED: `authToken${APP_NAME}`,
	LS_FCM: `fcmTkoen${APP_NAME}`,
};

export const TYPES = {
	LOGIN_S: `LOGIN_S`,
	LOGIN_F: `LOGIN_F`,
	REGISTER_S: `REGISTER_S`,
	REGISTER_F: `REGISTER_F`,
	GET_ALL_PRODUCTS_S: "GET_ALL_PRODUCTS_S",
	GET_ALL_PRODUCTS_F: "GET_ALL_PRODUCTS_F",
	GET_PRODUCTS_S: "GET_PRODUCTS_S",
	GET_PRODUCTS_F: "GET_PRODUCTS_F",
	CREATE_PRODUCT_S: "CREATE_PRODUCT_S",
	CREATE_PRODUCT_F: "CREATE_PRODUCT_F",
	EDIT_PRODUCT_S: "EDIT_PRODUCT_S",
	EDIT_PRODUCT_F: "EDIT_PRODUCT_F",
	DELETE_PRODUCT_S: "DELETE_PRODUCT_S",
	DELETE_PRODUCT_F: "DELETE_PRODUCT_F",
};

export const API_ENDPOINT = {
	LOGIN: "auth",
	REGISTER: "register",
	GET_ALL_PRODUCTS: "product",
	CREATE_PRODUCT: "product",
	GET_PRODUCT: "product",
	EDIT_PRODUCT: "product",
	DELETE_PRODUCT: "product/remove/product/",
};