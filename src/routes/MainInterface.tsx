import React from "react";
import { Link } from "react-router-dom";

const MainInterface = () => {
	return (
		// TODO: split the list and larger divs into seperate components
		<div className="bg-white rounded px-14 pt-4 pb-8 mb-4">
			<div className="main-header">
				<div className="text-3xl font-bold mb-4">
					Localization Issue Detector
				</div>
				<div className="mb-4">
					<p>Automatically detect and capture localization issues.</p>
				</div>
			</div>

			<div className="custom-button">
				<div className=" flex justify-center mb-6 space-x-2">
					<a href="#_" className="relative inline-block text-lg group">
						<span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
							<span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
							<span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
							<span className="relative">Start Scan</span>
						</span>
						<span
							className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
							data-rounded="rounded-lg"
						></span>
					</a>
				</div>
			</div>

			<div className="recent-scans border-t-2 border-gray-200 pt-4 mb-2">
				<strong className="text-xlg ">Recent Scans</strong>
				<div className="relative flex flex-col text-gray-700 bg-white shadow-md w-50 rounded-xl bg-clip-border mt-4">
					<nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
						<div
							role="button"
							className="flex items-center w-full p-3 py-1 pl-4 pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
						>
							Item One
							<div className="grid ml-auto place-items-center justify-self-end">
								<button
									className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
									type="button"
								>
									<span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											className="w-5 h-5"
										>
											<path
												fill-rule="evenodd"
												d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
												clip-rule="evenodd"
											></path>
										</svg>
									</span>
								</button>
							</div>
						</div>
						<div
							role="button"
							className="flex items-center w-full p-3 py-1 pl-4 pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
						>
							Item Two
							<div className="grid ml-auto place-items-center justify-self-end">
								<button
									className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
									type="button"
								>
									<span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											className="w-5 h-5"
										>
											<path
												fill-rule="evenodd"
												d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
												clip-rule="evenodd"
											></path>
										</svg>
									</span>
								</button>
							</div>
						</div>
						<div
							role="button"
							className="flex items-center w-full p-3 py-1 pl-4 pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
						>
							Item Three
							<div className="grid ml-auto place-items-center justify-self-end">
								<button
									className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
									type="button"
								>
									<span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											className="w-5 h-5"
										>
											<path
												fill-rule="evenodd"
												d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
												clip-rule="evenodd"
											></path>
										</svg>
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
					<a href="#_" className="relative inline-block text-lg group">
						<span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
							<span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
							<span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
							<span className="relative">Language</span>
						</span>
						<span
							className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
							data-rounded="rounded-lg"
						></span>
					</a>

					<a href="#_" className="relative inline-block text-lg group">
						<span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
							<span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
							<span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
							<span className="relative">Configure</span>
						</span>
						<span
							className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
							data-rounded="rounded-lg"
						></span>
					</a>
				</div>

				<Link to="/support" className="text-blue-500 hover:text-blue-800">
					Need help? Visit Support
				</Link>
			</div>
		</div>
	);
};

export default MainInterface;
