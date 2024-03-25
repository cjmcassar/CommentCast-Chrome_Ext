import React from "react";
import { Link } from "react-router-dom";

const Languages = () => {
	return (
		// TODO: split the list and larger divs into seperate components
		<div className="bg-white rounded px-14 pt-4 pb-8 mb-4">
			<div className="main-header">
				<div className="text-3xl font-bold mb-4">Select Language</div>
				<div className="mb-4">
					<p>Select a language for localization check.</p>
				</div>
			</div>

			<div className="available-languages border-t-2 border-gray-200 pt-4 mb-2">
				<strong className="text-xlg ">Languages</strong>
				<div className="relative flex flex-col text-gray-700 bg-white shadow-md w-50 rounded-xl bg-clip-border mt-4">
					<nav className="flex min-w-[240px] flex-col gap-1 p-2 pr-7 font-sans text-base font-normal text-blue-gray-700">
						<div
							role="button"
							className="flex items-center w-full p-3 py-1 pl-4 pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
						>
							French
							<div className="grid ml-auto place-items-center justify-self-end">
								<button
									className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
									type="button"
								>
									<span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-2xl">
										🇫🇷
									</span>
								</button>
							</div>
						</div>
						<div
							role="button"
							className="flex items-center w-full p-3 py-1 pl-4 pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
						>
							Spanish
							<div className="grid ml-auto place-items-center justify-self-end">
								<button
									className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
									type="button"
								>
									<span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-2xl">
										🇪🇸
									</span>
								</button>
							</div>
						</div>
						<div
							role="button"
							className="flex items-center w-full p-3 py-1 pl-4 pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
						>
							English - UK
							<div className="grid ml-auto place-items-center justify-self-end">
								<button
									className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
									type="button"
								>
									<span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-2xl">
										🇬🇧
									</span>
								</button>
							</div>
						</div>
					</nav>
				</div>
			</div>

			<div className="setting">
				<strong className="text-xlg">Settings</strong>
				<div className=" flex justify-center mt-4 mb-6 space-x-2">
					<Link to="/configure" className="relative inline-block text-lg group">
						<span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
							<span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
							<span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
							<span className="relative">Configure</span>
						</span>
						<span
							className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
							data-rounded="rounded-lg"
						></span>
					</Link>

					<Link to="/" className="relative inline-block text-lg group">
						<span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
							<span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
							<span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
							<span className="relative">Main</span>
						</span>
						<span
							className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
							data-rounded="rounded-lg"
						></span>
					</Link>
				</div>

				<Link to="/support" className="text-blue-500 hover:text-blue-800">
					Need help? Visit Support
				</Link>
			</div>
		</div>
	);
};

export default Languages;
