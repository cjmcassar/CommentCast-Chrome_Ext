import { Link } from "react-router-dom";

import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from "@/src/components/ui/table";

import { requestScreenshot } from "../scripts/content";

const MainInterface = () => {
	const handleScreenshot = () => {
		requestScreenshot();
	};
	const handleMailTo = () => {
		window.open("mailto:christopherjcassar@gmail.com");
	};

	return (
		// TODO: split the list and larger divs into seperate components
		<div className="bg-white rounded px-14 pt-4 pb-8 mb-4">
			<div className="main-header">
				<div className="text-3xl font-bold mb-4">CommentCast</div>
				<div className="mb-4">
					<p>Create reproducible issues and share them! </p>
				</div>
			</div>

			<div className="custom-button">
				<div className=" flex justify-center mb-6 space-x-2">
					<button
						className="relative inline-block text-lg group"
						onClick={handleScreenshot}
					>
						<span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
							<span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
							<span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
							<span className="relative">Take Screenshot</span>
						</span>
						<span
							className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
							data-rounded="rounded-lg"
						></span>
					</button>
				</div>
			</div>

			<div className="recent-comments border-t-2 border-gray-200 pt-4 mb-2">
				{/* <strong className="text-xlg ">Recent Comments</strong>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell className="font-medium">Login flow error</TableCell>
							<TableCell className="text-right">29/03/24</TableCell>
						</TableRow>
					</TableBody>
				</Table> */}
			</div>

			<div className="setting">
				{/* <strong className="text-xlg">Settings</strong>
				<div className=" flex justify-center mt-4 mb-6 space-x-2">
					<Link to="/" className="relative inline-block text-lg group">
						<span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
							<span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
							<span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
							<span className="relative">Configuration</span>
						</span>
						<span
							className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
							data-rounded="rounded-lg"
						></span>
					</Link>
				</div> */}

				<button
					onClick={handleMailTo}
					className="text-blue-500 hover:text-blue-800"
					style={{ cursor: "pointer" }}
				>
					Need help? Email us!
				</button>
			</div>
		</div>
	);
};

export default MainInterface;
