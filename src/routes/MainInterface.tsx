import React from "react";
import { Link } from "react-router-dom";

import "./styles/MainInterface.css";

const MainInterface = () => {
	return (
		<div className="container">
			<div className="header">Localization Issue Detector</div>
			<div className="section">
				<div>
					Automatically detect and capture localization issues across your web
					application.
				</div>
			</div>
			<div className="section">
				<button>Select Language</button>
				<button>Configure</button>
				<button>Start Scan</button>
			</div>
			<div className="instructions">
				<strong>Instructions</strong>
				<p>Select the target language for your application.</p>
				<p>Configure the extension to fine-tune the detection process.</p>
				<p>Start the scan to begin automatic navigation and issue detection.</p>
			</div>
			<div className="section">
				<Link to="/support">Need help? Visit Support</Link>
			</div>
			<div className="section">
				<i className="icon fas fa-camera"></i>
				<span>
					Automatically capture screenshots where issues are detected.
				</span>
			</div>
		</div>
	);
};

export default MainInterface;
