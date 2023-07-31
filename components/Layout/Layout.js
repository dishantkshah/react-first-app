import Head from "next/head";
import React from "react";
import styles from "./Layout.module.css";
import Link from "next/link";

const name = "Dishant Shah";
export const siteTitle = "Product Demo";

const Layout = ({ children, home = true, isError = false }) => {
	return (
		<div className={styles.container}>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="description"
					content="Learn how to build a personal website using Next.js"
				/>
				<meta
					property="og:image"
					content={`https://og-image.vercel.app/${encodeURI(
						siteTitle
					)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
				/>
				<meta name="og:title" content={siteTitle} />
				<meta name="twitter:card" content="summary_large_image" />
			</Head>
			{!isError && <header className={styles.header}>
				<p className={styles.headerTitle}>Product Demo</p>
				<div className={styles.account}>
					<Link href={`/SignIn`}>
						<p className={styles.linkButton}>Sign In </p>
					</Link>
				</div>
			</header>}
			<main>{children}</main>
			{!home && (
				<div className={styles.backToHome}>
					<Link href="/">← Back to home</Link>
				</div>
			)}
		</div>
	);
};

export default Layout;
