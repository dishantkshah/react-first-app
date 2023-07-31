import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout, { siteTitle } from "../components/Layout/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LOCAL_STORAGE } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductData, getProductList } from "../services/ProductSlice";
import axios from "axios";


export default function Home() {
	const dispatch = useDispatch();
	const router = useRouter();

	const { isLoggedIn,  productList } = useSelector((state) => state.product);

	const [productData, setProductData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentLimit, setCurrentLimit] = useState(10);
	const [totalData, setTotalData] = useState(0);
	const [totalPages, setTotalPages] = useState(1);

	console.log(productList);

	useEffect(() => {
		const token =
			localStorage.getItem(LOCAL_STORAGE.LS_AUTHORED) !== "undefined" &&
			JSON.parse(localStorage.getItem(LOCAL_STORAGE.LS_AUTHORED));
		const userData =
			localStorage.getItem(LOCAL_STORAGE.LS_USER) !== "undefined" &&
			JSON.parse(localStorage.getItem(LOCAL_STORAGE.LS_USER));

		console.log("Token : ", token);
		console.log("UserData: ", userData);

		if (token == undefined || token == null) {
			router.push("/SignIn");
		} else {
			router.push("/");
		}
	}, []);

	useEffect(() => {
		dispatch(getProductList(currentPage))
			.then((response) => {
				console.log(response);
				if (response.status == 200) {
					setProductData(response.data);
					setTotalData(response.total);
					console.log(response.data);
					let pages = Math.round(response.total / currentLimit) + 1;
					setTotalPages(pages);
				} else {
					console.log(response.message);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, [currentPage]);

	//To Render page numbers
	const renderPageNumber = (pages) => {
		const pageNumbers = [];

		for (let i = 1; i <= pages; i++) {
			pageNumbers.push(i);
		}

		const handlePageChange = (pageNumber) => {
			setCurrentPage(pageNumber);
		};

		return (
			<ul className={styles.pagination}>
				{pageNumbers.map((number) => (
					<li
						key={number}
						className={currentPage === number ? styles.liActive : styles.li}
						onClick={() => handlePageChange(number)}
					>
						{number}
					</li>
				))}
			</ul>
		);
	};

	//To edit product
	const editProduct = (productItem) => {
		console.log("Edit Item: ", productItem);
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


		router.push("/product/edit/" + productItem._id);
	};

	//To delete product
	const deleteProduct = (productItem) => {
		console.log("Delete Item: ", productItem);
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

		let data = {
			id: productItem._id,
		};
		dispatch(deleteProductData(data))
			.then((res) => {
				console.log(res);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Layout hone={true}>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<main>
				<div className={styles.header}>
					<input
						className={styles.submitButton}
						type="button"
						value="Add Product"
						onClick={() => {
							router.push("/product/add");
						}}
					/>
				</div>

				<div>Total Data : {totalData}</div>

				{renderPageNumber(totalPages)}

				{productData.map((product) => (
					<div className={styles.card} key={product.id}>
						<h3>{product.prod_name}</h3>
						<p>{product.prod_description}</p>
						<div className={styles.priceQContainer}>
							<div className={styles.priceContainer}>
								Price: <p className={styles.price}>${product.prod_price}</p>
							</div>
							<div className={styles.priceContainer}>
								Quantity:{" "}
								<p className={styles.price}>{product.prod_quantity}</p>
							</div>
							<div className={styles.buttonContainer}>
								<div
									className={styles.editButton}
									onClick={() => {
										editProduct(product);
									}}
								>
									Edit
								</div>

								<div
									className={styles.deleteButton}
									onClick={() => {
										deleteProduct(product);
									}}
								>
									Delete
								</div>
							</div>
						</div>
					</div>
				))}

				{renderPageNumber(totalPages)}
			</main>
		</Layout>
	);
}
