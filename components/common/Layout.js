import { motion } from "framer-motion"
import IsMobileProvider from "../../contexts/isMobileContext"
import { PageAnimate } from "../../utils/Animations"
import { useRouter } from "next/router"
import Navbar from "./Navbar"
import Footer from "./Footer"
import ScrollToTop from "../ScrollToTop/ScrollToTop"

export default function Layout({ children }) {
	const router = useRouter()
	return (
		<>
			<IsMobileProvider>
				<Navbar />
				<motion.main
					initial="hidden"
					animate="enter"
					exit="exit"
					transition={{ type: "linear" }}
					variants={PageAnimate}
				>
					{children}
				</motion.main>
				<ScrollToTop />
				<Footer />
			</IsMobileProvider>
		</>
	)
}
