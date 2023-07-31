import React, { useEffect, useState } from "react";
import styles from "../styles/SignIn.module.css";
import Head from "next/head";
import { siteTitle } from "../components/Layout/Layout";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { doLogin } from "../services/AuthSlice";
import axios from "axios";
import { LOCAL_STORAGE } from "../constants";

function SignIn() {
	const dispatch = useDispatch();
	const navigate = useRouter();

	const [error, setError] = useState("");
	const [sucess, setSuccess] = useState("");

	const { userData, isLoggedIn } = useSelector((state) => state.auth);

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.required("Please enter email")
			.matches(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i,
				"Please enter valid email address"
			),
		password: Yup.string()
			.required("Please enter password")
			.min(5, "password should be at least 5 characters")
			.max(20, "Password should be less than 20 characters"),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = (data) => {
		console.log(data);

		const payload = {
			...data,
		};

		dispatch(doLogin(payload))
			.then((res) => {
				console.log(res);
				// axios.defaults.headers.common["Authorization"] = res.access_token;
				// localStorage.setItem(
				// 	LOCAL_STORAGE.LS_AUTHORED,
				// 	JSON.stringify(res.access_token)
				// );
				// localStorage.setItem(LOCAL_STORAGE.LS_USER, JSON.stringify(res));
				navigate.push("/");
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
				<p className={styles.headerTitle}>SignIn</p>
			</header>
			<main>
				<form className={styles.card} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.inputContainer}>
						<input
							className={styles.imput}
							placeholder="Email"
							type="email"
							{...register("email")}
						/>
						{errors.email && (
							<p style={styles.errorText}>{errors.email.message}</p>
						)}
					</div>
					<div className={styles.inputContainer}>
						<input
							className={styles.imput}
							placeholder="Password"
							type="password"
							{...register("password")}
						/>
						{errors.password && (
							<p style={styles.errorText}>{errors.password.message}</p>
						)}
					</div>

					<input className={styles.submitButton} type="submit" value="Login" />

					<p className={styles.description}>
						Don't have account? {"  "}
						<Link href={`/Register`}>
							<span className={styles.linkButton}>Register</span>
						</Link>
					</p>
				</form>
			</main>
		</div>
	);
}

export default SignIn;
