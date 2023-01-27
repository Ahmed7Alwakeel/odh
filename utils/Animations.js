export const easing = [0.6, -0.05, 0.01, 0.99]

export const modelsDrawerItems = {
	closed: {
		opacity: 0,
	},
	open: { opacity: 1 },
}
export const modelsDrawer = {
	closed: {
		transition: {
			staggerChildren: 0.1,
			staggerDirection: -1,
		},
	},
	open: {
		transition: {
			staggerChildren: 0.2,
			staggerDirection: 1,
		},
	},
}
export const fadeInOut = {
	initial: {
		x: 0,
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			duration: 1,
			ease: easing,
			staggerChildren: 0.1,
		},
	},
}

export const fadeInOutDelay = {
	initial: {
		x: 0,
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			delay: 2,
			duration: 1,
			ease: easing,
			staggerChildren: 0.1,
		},
	},
}

export const overlay = {
	initial: {
		x: 0,
		opacity: 0,
	},
	animate: {
		opacity: 0.6,
		transition: {
			duration: 1,
			ease: easing,
			staggerChildren: 0.5,
		},
	},
	exit: {
		x: 0,
		opacity: 0,
		transition: {
			duration: 1.5,
		},
	},
}

export const fadeInUp = {
	initial: {
		y: 60,
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 1,
			ease: easing,
		},
	},
	exit: {
		y: 60,
		opacity: 0,
	},
}

export const fadeInRight = {
	initial: {
		x: 60,
		opacity: 0,
	},
	animate: {
		x: 0,
		opacity: 1,
		transition: {
			duration: 1,
			ease: easing,
		},
	},
}

export const fadeInLeft = {
	initial: {
		x: -60,
		opacity: 0,
	},
	animate: {
		x: 0,
		opacity: 1,
		transition: {
			duration: 1,
			ease: easing,
		},
	},
}

export const fadeInTitle = {
	initial: {
		x: -20,
		opacity: 0,
	},
	animate: {
		x: 0,
		opacity: 1,
		transition: {
			duration: 1,
			ease: easing,
		},
	},
}

export const stagger = {
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
}

const easeSliders = [0.43, 0.13, 0.23, 0.96]
export const sliders = {
	show: {
		opacity: 1,
		transition: { easeSliders, duration: 1.2 },
	},
	hide: {
		opacity: 0,
		transition: { easeSliders, duration: 1.2 },
		// transitionEnd: { display: "none" },
	},
}

export const onSelect = {
	show: {
		opacity: 1,
		x: 0,
		transition: { easeSliders, duration: 0.5 },
	},
	hide: {
		opacity: 0,
		x: -20,
		transition: { easeSliders, duration: 0.5 },
		// transitionEnd: { display: "none" },
	},
}

export const ModalUp = {
	show: {
		y: "100%",
		// opacity: 0,
		transition: {
			duration: 1,
			ease: easing,
		},
	},
	hide: {
		y: 0,
		// opacity: 1,
		transition: {
			duration: 1,
			ease: easing,
		},
	},
	exit: {
		y: "100%",
		// opacity: 0,
		transition: {
			duration: 1,
			ease: easing,
		},
	},
}

export const PageAnimate = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 1,
			ease: easing,
		},
	},
	enter: {
		opacity: 1,
		transition: {
			duration: 1,
			ease: easing,
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 1,
			ease: easing,
		},
	},
}
export const subMenuAnimate = {
	enter: {
		opacity: 1,
		rotateX: 0,
		transition: {
			duration: 0.5,
		},
		display: "block",
	},
	exit: {
		opacity: 0,
		rotateX: -15,
		transition: {
			duration: 0.5,
			delay: 0.3,
		},
		transitionEnd: {
			display: "none",
		},
	},
}
export const itemVariants = {
	closed: {
		opacity: 0,
	},
	open: { opacity: 1 },
}

export const sideVariants = {
	closed: {
		transition: {
			staggerChildren: 0.2,
			staggerDirection: -1,
		},
	},
	open: {
		transition: {
			staggerChildren: 0.2,
			staggerDirection: 1,
		},
	},
}
// animated in selected country

export const selectedCountryList = {
	closed: {
		opacity: 0,
		transition: {
			staggerChildren: 0.3,
			staggerDirection: -1,
		}

	},
	open: {
		opacity: 1,
		transition: {
			staggerChildren: 0.4,
			staggerDirection: 1,
			// duration : 1
		}
	},
}

export const selectedDestinationsItem = {
	closed: {
		opacity: 0,
	},
	open: {
		opacity: 1,
		transition: {
			duration: 1
		}
	},
}
export const moreDestinations = {
	closed: {
		opacity: 0,
		transition: { delay: 1 }
	},
	open: {
		opacity: 1,
		transition: { delay: 1 }
	},
}