import { getUser, getSession } from "./authBackground";
import { getPlatformInfo } from "./screenshot-utils/OSInfoBackground";
import { getBrowserName } from "./screenshot-utils/browserNameBackground";
import { getCurrentTabUrl } from "./screenshot-utils/currentTabUrlBackground";
import { getConsoleLogs } from "./screenshot-utils/debugLogsBackground";
import { insertDBBackground } from "./screenshot-utils/insertDBBackground";
import { getScreenDimensions } from "./screenshot-utils/screenDimensions";
import { takeScreenshot } from "./screenshot-utils/takeScreenshotBackground";

let isListenerAdded = false;
let currentTabId: number | null = null;

// todo: Add the following information:

// Country
// Screen Dimensions

interface Session {
	session: {
		access_token: string;
	};
}

interface User {
	user: {
		id: string;
	};
}

export function screenshotBackground() {
	if (!isListenerAdded) {
		chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
			// console.log("tab id for tabId", tabId);
			// console.log("tab id for tab.id", tab.id);
			// console.log("changeInfo", changeInfo);

			if (currentTabId === null || currentTabId !== tabId) {
				if (currentTabId !== null) {
					console.log(
						`tab id = ${currentTabId} changed to ${tabId}, removing old listener and adding a new one`,
					);

					chrome.runtime.onMessage.removeListener(handleIssueRequest);
				}

				// I can't add a return here else it will do this repeatedly
				chrome.runtime.onMessage.addListener(handleIssueRequest);

				currentTabId = tabId;
			}
		});

		isListenerAdded = true;
	}
}

const handleIssueRequest = async (
	req: any,
	sender: chrome.runtime.MessageSender,
	sendResponse: (response?: any) => void,
) => {
	console.log("handleIssueRequest", req, sender, sendResponse);
	if (req.msg === "take_screenshot") {
		try {
			const [
				session,
				user,
				screenshot,
				logs,
				platformInfo,
				url,
				browserName,
				primaryDisplayDimensions,
			] = await Promise.all([
				getSession() as Promise<Session | undefined>,
				getUser() as Promise<User | undefined>,
				takeScreenshot(sender.tab?.windowId as number),
				getConsoleLogs(),
				getPlatformInfo(),
				getCurrentTabUrl(),
				getBrowserName(),
				getScreenDimensions(),
			]);
			const response = {
				session,
				user,
				status: "Success",
				screenshot,
				logs,
				platformInfo,
				url,
				browserName,
				primaryDisplayDimensions,
			};

			console.log("response", response);

			insertDBBackground(response, (dbResponse) => {
				console.log("Sending success response with DB data", dbResponse);
				sendResponse(dbResponse);
			});
		} catch (error) {
			console.error("Failed to take screenshot or get logs:", error);
			if (error instanceof Error) {
				sendResponse({
					status: "Error",
					error: error.message,
				});
			} else {
				sendResponse({
					status: "Error",
					error: "An unknown error occurred",
				});
			}
		}
	}
};
