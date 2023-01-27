import "../styles/app.scss";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Layout from "../components/common/Layout";
import { AnimatePresence } from "framer-motion";
import NextNProgress from "nextjs-progressbar";
import { appWithTranslation } from "next-i18next";
import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AltColor, BaseColor } from "../utils/Variables";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function MyApp({ Component, pageProps }) {
	const { locale } = useRouter();
	const [queryClient] = useState(() => new QueryClient());

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<Layout>
						<NextNProgress color={AltColor} options={{ showSpinner: false }} />
						<AnimatePresence
							exitBeforeEnter
							initial={false}
							onExitComplete={() => window.scrollTo(0, 0)}
						>
							<ChakraProvider>
								<Component {...pageProps} key={Math.random()} />
							</ChakraProvider>
						</AnimatePresence>
					</Layout>
				</Hydrate>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</>
	);
}

export default appWithTranslation(MyApp);
export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ["common"])),
		},
	}
}