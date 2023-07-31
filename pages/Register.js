import React, { useState } from "react";
import styles from "../styles/Register.module.css";
import Head from "next/head";
import { siteTitle } from "../components/Layout/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { doRegister } from "../services/AuthSlice";

function Register() {
	const dispatch = useDispatch();
	const navigate = useRouter();

	const [error, setError] = useState("");
	const [sucess, setSuccess] = useState("");

	const validationSchema = Yup.object().shape({
		firstname: Yup.string()
			.required("Please enter first name")
			.min(3, "First name shuold be more than 3 characters")
			.max(20, "First name shuold be less than 20 characters")
			.matches(/^[A-Za-z]+$/, "Please enter valid first name"),
		lastname: Yup.string()
			.required("Please enter last name")
			.min(3, "Last name shuold be more than 3 characters")
			.max(20, "Last name shuold be less than 20 characters")
			.matches(/^[A-Za-z]+$/, "Please enter valid last name"),
		email: Yup.string()
			.required("Please enter email")
			.matches(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i,
				"Please enter valid email address"
			),
		phoneno: Yup.string()
			.min(10, "Phone number sould be 10 characters")
			.max(10, "Phone number sould be 10 characters")
			.required("Please enter phone number"),
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = (data) => {
		setSuccess("");
		setError("");
		const payload = {
			...data,
		};

		dispatch(doRegister(payload))
			.then((res) => {
				console.log(res);
				if (res === "User successfully register") {
					setSuccess(res);
					setError("");
					reset();
					navigate.push("/SignIn")
				} else {
					setSuccess("");
					setError(res);
				}
			})
			.catch((err) => {
				setSuccess("");
				console.log(err.message);
				setError(err.message);
			});
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<header className={styles.header}>
				<p className={styles.headerTitle}>Register</p>
			</header>
			<main>
				<form className={styles.card} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.inputContainer}>
						<input
							className={styles.imput}
							placeholder="First Name"
							type="text"
							{...register("firstname")}
						/>
						{errors.firstname && (
							<p className={styles.errorText}>{errors.firstname.message}</p>
						)}
					</div>
					<div className={styles.inputContainer}>
						<input
							className={styles.imput}
							placeholder="Last Name"
							type="text"
							{...register("lastname")}
						/>
						{errors.lastname && (
							<p className={styles.errorText}>{errors.lastname.message}</p>
						)}
					</div>
					<div className={styles.inputContainer}>
						<input
							className={styles.imput}
							placeholder="Email"
							type="email"
							{...register("email")}
						/>
						{errors.email && (
							<p className={styles.errorText}>{errors.email.message}</p>
						)}
					</div>
					<div className={styles.inputContainer}>
						<input
							className={styles.imput}
							placeholder="Phone Number"
							type="number"
							{...register("phoneno")}
						/>
						{errors.phoneno && (
							<p className={styles.errorText}>{errors.phoneno.message}</p>
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

					<input
						className={styles.submitButton}
						type="submit"
						value="Register"
					/>

					<p className={styles.description}>
						Already have account? {"  "}
						<span
							className={styles.linkButton}
							onClick={() => {
								navigate.push("/SignIn");
							}}
						>
							Sign in
						</span>
					</p>
				</form>
			</main>
		</div>
	);
}

export default Register;
