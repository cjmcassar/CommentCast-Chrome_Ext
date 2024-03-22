import React from "react";
import { Link } from "react-router-dom";

const MainInterface = () => {
	return (
		<div className="bg-white rounded px-14 pt-4 pb-8 mb-4">
			<div className="text-3xl font-bold mb-6">Localization Issue Detector</div>
			<div className="mb-4">
				<p>Automatically detect and capture localization issues.</p>
			</div>
			<div className="flex justify-center mb-6 space-x-2">
				<div className="custom-button">
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
				</div>
				<div className="custom-button">
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
			</div>
			<div className=" flex justify-center mb-6 space-x-2">
				<div className="custom-button">
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
			<div className="border-t-2 border-gray-200 pt-4 mb-2">
				<strong className="text-xlg">Instructions</strong>
				<p className="mt-2">
					1. Select the target language for your application.
				</p>
				<p className="mt-2">
					2. Configure the extension to fine-tune the detection process.
				</p>
				<p className="mt-2">
					3. Start the scan to begin automatic navigation and issue detection.
				</p>
			</div>
			<div className="mb-4">
				<Link to="/support" className="text-blue-500 hover:text-blue-800">
					Need help? Visit Support
				</Link>
			</div>
			<div className="flex items-center">
				<span>
					Automatically capture screenshots where issues are detected.
				</span>
			</div>
		</div>
	);
};

export default MainInterface;
