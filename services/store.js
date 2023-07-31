import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reduxApiMiddleWare from "./Middleware";
import AuthSlice from "./AuthSlice";
import { useDispatch } from "react-redux";
import ProductSlice from "./ProductSlice";

export const store = configureStore({
	reducer: {
		auth: AuthSlice,
		product: ProductSlice,
	},
	middleware: [thunk, reduxApiMiddleWare],
});

export const useAppDispatch = useDispatch;
