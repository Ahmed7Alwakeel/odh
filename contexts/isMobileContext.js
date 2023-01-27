import { createContext, useEffect, useState } from "react"

//create a context, with createContext api
export const isMobileContext = createContext()

function IsMobileProvider(props) {
	const [isMobile, setMobile] = useState(false)
	const [isDestMenuOpened, setIsDestMenuOpened] = useState(false)
	const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false)
	const [hamburgerOpened, setHamburgerOpened] = useState(false)

	const isMobileHandler = (e) => {
		setMobile(e.matches)
	}
	useEffect(() => {
		try {
			// Chrome & Firefox
			window
				.matchMedia(`(max-width : 1023px)`)
				.addEventListener("change", isMobileHandler)
			setMobile(window.matchMedia(`(max-width : 1023px)`).matches)
		} catch (e1) {
			try {
				// Safari
				window
					.matchMedia(`(max-width : 1023px)`)
					.addListener(() => isMobileHandler())
				setMobile(window.matchMedia(`(max-width : 1023px)`).matches)
			} catch (e2) {
				console.error(e2)
			}
		}
	}, [])
	return (
		<>
			<isMobileContext.Provider
				value={{
					isMobileState: [isMobile, setMobile],
					isDestMenuOpened, setIsDestMenuOpened,
					hamburgerOpened, setHamburgerOpened,
					isMobileMenuOpened, setIsMobileMenuOpened
				}}
			>
				{props.children}
			</isMobileContext.Provider>
		</>
	)
}

export default IsMobileProvider
