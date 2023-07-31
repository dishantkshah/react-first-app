import React, { useState } from "react";
import styles from "../../styles/Product.module.css";
import Head from "next/head";

import Link from "next/link";
import { siteTitle } from "../../components/Layout/Layout";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createProductData } from "../../services/ProductSlice";
import { LOCAL_STORAGE } from "../../constants";
import axios from "axios";

const Add = () => {
	const dispatch = useDispatch();
	const navigate = useRouter();

	const [error, setError] = useState("");
	const [sucess, setSuccess] = useState("");

	const validationSchema = Yup.object().shape({
		prod_name: Yup.string().required("Product name is required"),
		prod_description: Yup.string().required("Product description is required"),
		prod_price: Yup.number().required("Product price is required"),
		prod_quantity: Yup.number().required("Product quantity is required"),
	});

	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = (data) => {
		const token =
			localStorage.getItem(LOCAL_STORAGE.LS_AUTHORED) !== "undefined"
				? JSON.parse(localStorage.getItem(LOCAL_STORAGE.LS_AUTHORED))
				: null;
		const userData =
			localStorage.getItem(LOCAL_STORAGE.LS_USER) !== "undefined" &&
			JSON.parse(localStorage.getItem(LOCAL_STORAGE.LS_USER));

		console.log("Token : ", token);
		console.log("UserData: ", userData.data.access_token);

		axios.defaults.headers.common[
			"Authorization"
		] = `Bearer ${userData.data.access_token}`;

		const payload = {
			...data,
		};
		dispatch(createProductData(payload))
			.then((res) => {
				console.log(res);
				// // axios.defaults.headers.common["Authorization"] = res.access_token;
				// // localStorage.setItem(
				// // 	LOCAL_STORAGE.LS_AUTHORED,
				// // 	JSON.stringify(res.access_token)
				// // );
				// // localStorage.setItem(LOCAL_STORAGE.LS_USER, JSON.stringify(res));

				if (res.status == 201) {
					navigate.push("/");
				}
			})
			.catch((error) => {
				setSuccess("");
				setError(error.message);
				console.log(error.message);
			});
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<header className={styles.header}>
				<p className={styles.headerTitle}>Add Product</p>
			</header>
			<main>
				<form className={styles.card} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.inputContainer}>
						<input
							className={styles.imput}
							placeholder="Product Name"
							type="text"
							{...register("prod_name")}
						/>
						{errors.password && (
							<p style={styles.errorText}>{errors.password.message}</p>
						)}
					</div>
					<div className={styles.inputContainer}>
						<input
							className={styles.imput}
							placeholder="Product Description"
							type="text"
							{...register("prod_description")}
						/>
						{errors.password && (
							<p style={styles.errorText}>{errors.password.message}</p>
						)}
					</div>
					<div className={styles.inputContainer}>
						<input
							className={styles.imput}
							placeholder="Product Price"
							type="number"
							{...register("prod_price")}
						/>
						{errors.password && (
							<p style={styles.errorText}>{errors.password.message}</p>
						)}
					</div>
					<div className={styles.inputContainer}>
						<input
							className={styles.imput}
							placeholder="Product Quantity"
							type="number"
							{...register("prod_quantity")}
						/>
						{errors.password && (
							<p style={styles.errorText}>{errors.password.message}</p>
						)}
					</div>

					{error !== "" && (
						<div>
							<p className={styles.errorText}>{error}</p>
						</div>
					)}
					{sucess !== "" && (
						<div>
							<p className={styles.successText}>{sucess}</p>
						</div>
					)}

					<input className={styles.submitButton} type="submit" value="Add" />
				</form>
			</main>
		</div>
	);
};

export default Add;
