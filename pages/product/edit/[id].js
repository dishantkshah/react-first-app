import React, { useEffect, useState } from "react";
import styles from "../../../styles/Product.module.css";
import Head from "next/head";

import Link from "next/link";
import { siteTitle } from "../../../components/Layout/Layout";
import {
	getProductList,
	getProductData,
	editProductData,
} from "../../../services/ProductSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Edit = () => {
	const dispatch = useDispatch();
	const { asPath } = useRouter();
	const navigate = useRouter();
	console.log(asPath);
	const productId = asPath.replaceAll("/product/edit/", "");
	console.log("product id: ", productId);

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

	useEffect(() => {
		dispatch(getProductData(productId))
			.then((response) => {
				console.log(response);
				if (response.status == 200) {
					const productDataApi = response.data;
					setValue("prod_name", productDataApi.prod_name);
					setValue("prod_description", productDataApi.prod_description);
					setValue("prod_price", productDataApi.prod_price);
					setValue("prod_quantity", productDataApi.prod_quantity);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, [productId]);

	const onSubmit = (data) => {
		const payload = {
			...data,
		};
		const productId = asPath.replaceAll("/product/edit/", "");
		console.log("product id: ", productId);

		dispatch(editProductData(productId, payload))
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
				<p className={styles.headerTitle}>Edit Product</p>
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

					<input className={styles.submitButton} type="submit" value="Edit" />
				</form>
			</main>
		</div>
	);
};

// export const getStaticProps = async ({ params }) => {
// 	const dispatch = useDispatch();
// 	dispatch(getProductData(params.id)).then(response => {
// 		console.log(response)
// 	}).catch(error => {
// 		console.log(error)
// 	});
// }

// export const getStaticPaths = async (props) => {
// 	console.log(props)

//    return {
// 			paths: [
// 				{ params: {  id:  "1"} },
// 			],
// 			fallback: false, // fallback is set to false because we already know the slugs ahead of time
// 		};
// };

export default Edit;
