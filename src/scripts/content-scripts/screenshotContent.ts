import { cleanupLocalStorage } from "../background-scripts/browser-utils/cleanupLocalStorage";

export async function requestScreenshot() {
	console.log("requestScreenshot initiated");
	try {
		chrome.runtime.sendMessage({ msg: "take_screenshot" });

		cleanupLocalStorage();
	} catch (error) {
		console.error("Failed to send message for screenshot:", error);
	}
}
