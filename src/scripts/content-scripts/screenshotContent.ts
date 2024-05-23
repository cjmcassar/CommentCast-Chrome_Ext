import { cleanupLocalStorage } from "../background-scripts/browser-utils/cleanupLocalStorage";

export async function requestScreenshot() {
	console.log("requestScreenshot initiated");
	try {
		const response: { status: string; id: number } = await new Promise(
			async (resolve, reject) => {
				chrome.runtime.sendMessage({ msg: "take_screenshot" }, (response) => {
					console.log("Response in requestScreenshot:", response);
				});
			},
		);

		cleanupLocalStorage();
	} catch (error) {
		console.error("Failed to send message for screenshot:", error);
	}
}
