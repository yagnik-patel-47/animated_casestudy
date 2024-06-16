import { useEffect, useState } from "react";
import {
	motion as m,
	useAnimationControls,
	AnimatePresence,
} from "framer-motion";
import useCarsData from "./data";

const rotateValues = [-5, -5, -5, 10, 5, -10, -5];

const App = () => {
	const lg = window.matchMedia("(min-width: 1024px)").matches;
	const [canClickPrev, setCanClickPrev] = useState(true);
	const [zenMode, setZenMode] = useState(false);
	const [showModal, setshowModal] = useState(true);
	const [showView, setshowView] = useState(false);
	const [initialAnimFinished, setInitialAnimFinished] = useState(false);
	const [currentCarName, setCurrentCarName] = useState("Mustang GT");
	const [currentCarBackground, setCurrentCarBackground] = useState("#011a0b");
	const controlls = useAnimationControls();
	const titleControlls = useAnimationControls();
	const { carsData, increaseIndex, decreaseIndex } = useCarsData();
	const allTitles: string[] = [];
	carsData.forEach((value) => allTitles.push(value.name));
	const nextCarName = carsData.filter(
		(value) => value.index === carsData.length - 1,
	)[0].name;
	const nextCarBackground = carsData.filter(
		(value) => value.index === carsData.length - 1,
	)[0].bgColor;

	const animateNext = () => {
		setCurrentCarName(nextCarName);
		setCurrentCarBackground(nextCarBackground);
		setCanClickPrev(false);
		controlls
			.start((index) =>
				index === carsData.length
					? {
							x: 300,
							rotate: 10,
							opacity: 0,
							transition: { duration: 1, ease: [0.34, 1.56, 0.64, 1] },
						}
					: {
							rotate: rotateValues[index],
							transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
						},
			)
			.then(() => {
				increaseIndex();
				controlls.set((index) => ({ rotate: rotateValues[index - 1] }));
				controlls.set((index) =>
					index === carsData.length ? { x: 0, opacity: 1 } : {},
				);
				controlls.set((index) => (index === 1 ? { x: 0, opacity: 1 } : {}));
				setCanClickPrev(true);
			});
	};

	const animtatePrev = () => {
		decreaseIndex();
		controlls.set((index) =>
			index === carsData.length
				? {
						x: 300,
						rotate: 10,
						opacity: 0,
						scale: 0.6,
					}
				: {},
		);
		controlls.set((index) =>
			index !== carsData.length
				? {
						rotate: rotateValues[index],
					}
				: {},
		);
		setCanClickPrev(false);
		controlls
			.start((index) =>
				index === carsData.length
					? {
							x: 0,
							rotate: -5,
							opacity: 1,
							scale: 1,
							transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
						}
					: {
							rotate: rotateValues[index - 1],
							transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
						},
			)
			.then(() => setCanClickPrev(true));
	};

	const enterZenMode = () => {
		setZenMode(true);
		controlls.start({ rotate: 0, transition: { duration: 0.7 } }).then(() => {
			controlls.set((index) =>
				index !== carsData.length
					? { opacity: 0, pointerEvents: "none", visibility: "hidden" }
					: {},
			);
			controlls.start((index) =>
				index === carsData.length
					? {
							y: [null, 130, 130],
							scale: [1, 1.1, 1.4],
							transformOrigin: "top",
							transition: {
								duration: 1.5,
							},
						}
					: {},
			);
			titleControlls.start({
				y: "-70vh",
				color: "#fff",
				transition: {
					ease: [0.76, 0, 0.24, 1],
					duration: 1.5,
				},
			});
		});
	};

	const leaveZenMode = () => {
		setZenMode(false);
		controlls
			.start((index) =>
				index === carsData.length
					? {
							y: 0,
							scale: 1,
							transformOrigin: "top",
							transition: {
								duration: 1,
							},
						}
					: {},
			)
			.then(() => {
				controlls.set({
					opacity: 1,
					pointerEvents: "auto",
					visibility: "visible",
				});
				controlls.set((index) =>
					index === carsData.length ? { transformOrigin: "center" } : {},
				);
				controlls.start((index) => ({
					rotate: rotateValues[index - 1],
					transition: { duration: 1 },
				}));
			});
		titleControlls.start({
			y: "0vh",
			color: "#a3a3a3",
			transition: {
				ease: [0.76, 0, 0.24, 1],
				duration: 1.5,
			},
		});
	};

	useEffect(() => {
		setCurrentCarName(
			carsData.filter((value) => value.index === carsData.length)[0].name,
		);
		setCurrentCarBackground(
			carsData.filter((value) => value.index === carsData.length)[0].bgColor,
		);
	}, [carsData]);

	useEffect(() => {
		controlls.set((index) => ({ x: `${125 * (index - 4)}%`, opacity: 0 }));
		titleControlls.set({ y: "100%" });
		controlls
			.start((index) => ({
				x: [null, "0%", "0%", "0%"],
				rotate: [0, 0, 0, rotateValues[index - 1]],
				opacity: [null, 1, 1, 1],
				transition: { duration: 2, times: [0, 0.5, 0.7, 1] },
			}))
			.then(() => {
				setInitialAnimFinished(true);
				if (!lg) {
					setInterval(() => {
						setshowView(true);
						setTimeout(() => setshowView(false), 1000);
					}, 5000);
				}
			});
		titleControlls.start({
			y: "0px",
			color: "#a3a3a3",
			transition: {
				duration: 0.5,
				delay: 1.5,
				ease: "easeOut",
			},
		});
	}, []);
	return (
		<m.div
			animate={{
				background: zenMode ? "#2e2e2e" : currentCarBackground,
				transition: { duration: 1, delay: zenMode ? 0.5 : 0 },
			}}
			className="h-full bg-[#2e2e2e] flex flex-col overflow-hidden"
		>
			<m.nav
				initial={{ y: "-100%" }}
				animate={{
					y: 0,
					transition: {
						duration: 0.5,
						delay: 1.5,
						ease: "easeOut",
					},
				}}
				className="flex px-8 py-8 md:px-18 lg:px-24 md:py-12 w-full justify-between items-center fixed top-0 z-10"
			>
				<div className="lg:flex hidden flex-col space-y-2 items-center cursor-pointer group">
					<span className="h-0.5 w-8 inline-block bg-slate-200 transition-all duration-300 group-hover:scale-x-[1.8] group-active:scale-x-[1.05] group-active:duration-100"></span>
					<span className="h-0.5 w-14 inline-block bg-slate-200 transition-all duration-300 group-hover:scale-x-[0.6]"></span>
					<span className="h-0.5 w-8 inline-block bg-slate-200 transition-all duration-300 group-hover:scale-x-[1.8] group-active:scale-x-[1.05] group-active:duration-100"></span>
				</div>
				<h1 className="text-2xl lg:text-4xl">Cars Case Study</h1>
				<div className="relative group">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-8 h-8 cursor-pointer"
						onClick={() =>
							window.open("https://yagnik-devp.vercel.app", "_blank")
						}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
						/>
					</svg>
					<div className="absolute transition-all duration-300 group-hover:opacity-100 group-hover:pointer-events-auto py-2 px-3 opacity-0 pointer-events-none bg-black right-0 -bottom-12 w-80">
						<p>Visit my portfolio to contact me.</p>
					</div>
				</div>
			</m.nav>

			<AnimatePresence>
				{!lg && showModal && (
					<m.div
						initial={{ y: "-100%" }}
						animate={{ y: 0 }}
						exit={{ y: "-100%" }}
						transition={{ type: "tween" }}
						className="fixed flex flex-col p-4 t-2 m-4 bg-zinc-900 z-10"
					>
						<p>
							Visit this site on desktop for best experirence, although it will
							work on this device too. Give it a try.
						</p>
						<button
							onClick={() => setshowModal(false)}
							className="mt-4 self-end font-semibold p-2 w-fit"
						>
							Okay
						</button>
					</m.div>
				)}
			</AnimatePresence>

			<div className="flex-1 relative flex justify-center items-center">
				<AnimatePresence>
					{zenMode && (
						<m.div
							initial={{ y: -20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: 20, opacity: 0 }}
							transition={{ duration: 1, ease: "easeOut", delay: 1 }}
							className="absolute left-6 top-[15%] md:left-24 md:top-1/3 z-[7]"
						>
							<button
								onClick={() => leaveZenMode()}
								className={`flex text-lg md:text-2xl items-center group z-[7] ${
									!lg ? "glass_bg" : ""
								} p-1 rounded-sm`}
							>
								<span>Back</span>{" "}
								<span className="inline-block ml-4 h-0.5 w-10 bg-slate-200"></span>
							</button>
						</m.div>
					)}
				</AnimatePresence>
				{carsData
					.sort((a, b) => a.index - b.index)
					.map((value, index) => {
						return (
							<m.img
								className={`w-[60vw] md:w-[45vw] lg:w-[40vw] xl:w-[20vw] ${
									value.index === carsData.length ? "cursor-pointer" : ""
								} absolute aspect-[9/14] object-cover car-${value.index}`}
								style={{ zIndex: index + 1 }}
								src={value.thumbImage}
								alt={value.name}
								key={index}
								custom={value.index}
								animate={controlls}
								onMouseEnter={() => {
									if (value.index === carsData.length) {
										setshowView(true);
									}
								}}
								onMouseLeave={() =>
									value.index === carsData.length &&
									showView &&
									setshowView(false)
								}
								onClick={() => {
									if (value.index === carsData.length && !zenMode) {
										enterZenMode();
										setshowView(false);
									}
								}}
							/>
						);
					})}
				<AnimatePresence>
					{showView && !zenMode && initialAnimFinished && (
						<m.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}
							className="flex justify-center items-center w-20 h-20 rounded-full glass_bg font-semibold -translate-x-1/2 -translate-y-1/2 absolute z-10 top-1/2 left-1/2  pointer-events-none after:-inset-2 after:rounded-full after:absolute after:border-[#C3C1BA] after:border"
						>
							View
						</m.div>
					)}
				</AnimatePresence>
				<m.div
					initial={{ opacity: 0 }}
					animate={
						zenMode
							? { opacity: 0, transition: { duration: 0.5 } }
							: {
									opacity: 1,
									transition: {
										duration: 1,
										delay: 1.5,
										ease: "easeOut",
									},
								}
					}
					className="flex w-full items-center justify-between xl:justify-around px-4 md:px-20 lg:px-24 xl:px-32"
				>
					<button
						onClick={() => (canClickPrev ? animtatePrev() : null)}
						className={`flex text-lg md:text-2xl items-center group z-[7] ${
							!lg ? "glass_bg" : ""
						} p-1 rounded-sm`}
					>
						<span>Prev</span>{" "}
						<span className="inline-block ml-4 h-0.5 w-10 bg-slate-200"></span>
					</button>
					<button
						onClick={() => animateNext()}
						className={`flex text-lg md:text-2xl items-center group z-[7] ${
							!lg ? "glass_bg" : ""
						} p-1 rounded-sm`}
					>
						<span className="inline-block mr-4 h-0.5 w-10 bg-slate-200"></span>{" "}
						<span>Next</span>
					</button>
				</m.div>
				<m.div
					animate={titleControlls}
					className="overflow-hidden grid grid-cols-1 grid-rows-1 w-full absolute bottom-0 xl:-bottom-20"
				>
					{allTitles.map((title) => (
						<AnimatePresence key={title} mode="popLayout">
							{title === currentCarName && (
								<m.h1
									initial={{ y: "100%" }}
									animate={{ y: 0 }}
									exit={{ y: "-100%" }}
									transition={{ duration: 1, ease: "easeOut" }}
									className={`leading-none top-0 font-semibold text-center text-[calc(100vw_/_12)]`}
								>
									{title}
								</m.h1>
							)}
						</AnimatePresence>
					))}
				</m.div>
				{carsData.map((value) => (
					<AnimatePresence key={value.index}>
						{value.name === currentCarName && zenMode && (
							<>
								<m.div
									initial={{ opacity: 0, y: "100%" }}
									animate={{
										opacity: 1,
										y: 0,
										transition: { delay: 1.2, duration: 1 },
									}}
									exit={{
										opacity: 0,
										y: "100%",
										transition: { duration: 1 },
									}}
									className="absolute left-0 -bottom-12"
								>
									<img
										src={value.images[1]}
										alt={value.name}
										className="w-[30rem] object-cover lg:w-[25vw]"
										style={{
											aspectRatio: 5 / 4,
											objectPosition: value.objectPos[1],
										}}
									/>
								</m.div>
								<m.div
									initial={{ opacity: 0, y: "100%" }}
									animate={{
										opacity: 1,
										y: 0,
										transition: { delay: 1.2, duration: 1 },
									}}
									exit={{
										opacity: 0,
										y: "100%",
										transition: { duration: 1 },
									}}
									className="absolute right-0 bottom-[10%]"
								>
									<img
										src={value.images[0]}
										alt={value.name}
										className="w-60 object-cover lg:w-[17vw]"
										style={{
											aspectRatio: 9 / 16,
											objectPosition: value.objectPos[0],
										}}
									/>
								</m.div>
							</>
						)}
					</AnimatePresence>
				))}
			</div>
		</m.div>
	);
};

export default App;
