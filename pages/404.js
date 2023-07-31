import utilStyles from "../styles/utils.module.css";
import Head from "next/head";
import Layout from "../components/Layout/Layout";

export default function Custom404() {
	return (
		<Layout home={false} isError={true}>
			<Head>
				<title>404</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<p>
					<b>404</b> | The page you are looking for is does not exist.
				</p>
			</section>
		</Layout>
	);
}
