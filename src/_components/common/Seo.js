import Head from "next/head";
import React from "react";

const Seo = ({
	title = "",
	description = "",
	keywords = "",
	children,
	domain
}) => {

	return (
		<Head>
			<title>{title}</title>
			<meta
				name="description"
				content={description}
			/>
			<meta
				name="keywords"
				content={keywords}
			/>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href={domain === "df" ? "/assets/icons/df-favicon-icon.png" : "/assets/icons/favicon-icon.png"} />
			{children}
		</Head>
	);
}

export default Seo;
