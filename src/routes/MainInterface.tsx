import React from "react";
import { Link } from "react-router-dom";

const MainInterface = () => {
	return (
		<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
			<div className="text-3xl font-bold mb-6">Localization Issue Detector</div>
			<div className="mb-4">
				<p>Automatically detect and capture localization issues.</p>
			</div>
			<div className="flex justify-between mb-6">
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Select Language
				</button>
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Configure
				</button>
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Start Scan
				</button>
			</div>
			<div className="border-t-2 border-gray-200 pt-4 mb-4">
				<strong className="text-xlg">Instructions</strong>
				<p className="mt-2">Select the target language for your application.</p>
				<p className="mt-2">
					Configure the extension to fine-tune the detection process.
				</p>
				<p className="mt-2">
					Start the scan to begin automatic navigation and issue detection.
				</p>
			</div>
			<div className="mb-4">
				<Link to="/support" className="text-blue-500 hover:text-blue-800">
					Need help? Visit Support
				</Link>
			</div>
			<div className="flex items-center">
				<i className="fas fa-camera mr-2"></i>
				<span>
					Automatically capture screenshots where issues are detected.
				</span>
			</div>
		</div>
	);
};

export default MainInterface;
