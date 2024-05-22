import { getUser, getSession, getAuthCookie } from "./authBackground";
import { getPlatformInfo } from "./screenshot-utils/OSInfoBackground";
import { getBrowserName } from "./screenshot-utils/browserNameBackground";
import { getCurrentTabUrl } from "./screenshot-utils/currentTabUrlBackground";
import { getConsoleLogs } from "./screenshot-utils/debugLogsBackground";
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
			console.log("tab id for tabId", tabId);
			console.log("tab id for tab.id", tab.id);
			console.log("changeInfo", changeInfo);

			if (currentTabId === null || currentTabId !== tabId) {
				if (currentTabId !== null) {
					console.log(
						`tab id = ${currentTabId} changed to ${tabId}, removing old listener and adding a new one`,
					);
					// Remove the listener only if it was previously added
					chrome.runtime.onMessage.removeListener(handleIssueRequest);
				}

				// Add the listener only once per tab update where conditions are met
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

			const supabaseResponse = await fetch(
				"https://yvdtkxnmiehnrwmjkjxp.supabase.co/rest/v1/issue_snapshots?select=id",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${response.session?.session.access_token}`,
						apikey:
							"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2ZHRreG5taWVobnJ3bWpranhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5NDEyMzIsImV4cCI6MjAyODUxNzIzMn0.g4dgWoHBDONdD6YNQ1SZ6PwL6nfj1L-F5TFq1vI3Fb4",
						Prefer: "return=representation",
					},

					body: JSON.stringify({
						uuid: response.user?.user.id,
						screenshot: response.screenshot,
						logs: response.logs,
						platform_arch: response.platformInfo.platformInfo.arch,
						platform_os: response.platformInfo.platformInfo.os,
						url: response.url,
						browser_name: response.browserName,
						primary_display_dimensions: {
							primary_display_width: response.primaryDisplayDimensions.width,
							primary_display_height: response.primaryDisplayDimensions.height,
						},
					}),
				},
			);

			if (!supabaseResponse.ok) {
				console.error(
					"Failed to insert data into Supabase:",
					await supabaseResponse.text(),
				);
				sendResponse({
					status: "Error",
					error: "Failed to insert data into Supabase",
				});
			} else {
				console.log("Data inserted successfully into Supabase.");
				const data = await supabaseResponse.json();
				console.log("Data inserted successfully into Supabase:", data);
				sendResponse({ status: "Success", id: data[0].id });
			}
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
		sendResponse({ status: "Success" });
		return true; // Keep the listener active
	}
};
