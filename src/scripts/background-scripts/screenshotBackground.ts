import { supabase } from "../utils/supabase/supabaseClient";
import { getUser } from "./authBackground";

let isListenerAdded = false;
let currentTabId: number | null = null;
let isCaptureInProgress = false;

// todo: Add the following information:

// Country
// Screen Dimensions

// todo: add authentication via the authBackground script

interface User {
	user: {
		user: {
			id: string;
		};
	};
}

export function screenshotBackground() {
	chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
		console.log("tab id for tabId", tabId);
		console.log("tab id for tab.id", tab.id);
		console.log("changeInfo", changeInfo);
		if (!isListenerAdded) {
			console.log(
				`adding listener for tab id ${currentTabId} = tab id ${tab.id}`,
			);
			chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
				handleIssueRequest(req, sendResponse, tab);
				return true;
			});

			isListenerAdded = true;
			currentTabId = tabId;
		} else if (
			isListenerAdded &&
			currentTabId !== tabId &&
			changeInfo.status === "loading"
		) {
			console.log(
				`tab id = ${currentTabId} changed to ${tabId}, removing old listener and adding a new one`,
			);
			chrome.runtime.onMessage.removeListener((req, sender, sendResponse) => {
				console.log("removing listener for tab id", currentTabId);
			});
			chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
				handleIssueRequest(req, sendResponse, tab);
				return true;
			});
			currentTabId = tabId;
		}
	});
}

const takeScreenshot = async (windowId: number): Promise<string> => {
	if (isCaptureInProgress) {
		console.log(
			"Screenshot capture is already in progress. Please try again later.",
		);
		return "";
	}
	isCaptureInProgress = true;

	try {
		let imgUrl64 = await chrome.tabs.captureVisibleTab(windowId, {
			format: "jpeg",
			quality: 80,
		});

		return imgUrl64;
	} catch (error) {
		console.error(error);
		throw error;
	} finally {
		isCaptureInProgress = false;
	}
};

const getConsoleLogs = async (): Promise<any[]> => {
	return new Promise((resolve, reject) => {
		// Query for the active tab in the current window
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (tabs.length > 0) {
				console.log("Current tab ID:", currentTabId);

				// Proceed with getting console logs if a valid tab is found
				if (typeof currentTabId === "number") {
					chrome.tabs.get(currentTabId, (tab) => {
						if (chrome.runtime.lastError) {
							console.error(
								`No tab with id: ${currentTabId}`,
								chrome.runtime.lastError.message,
							);
							return reject(chrome.runtime.lastError);
						}

						chrome.debugger.attach(
							{ tabId: currentTabId ?? 0 },
							"1.0",
							function () {
								if (chrome.runtime.lastError) {
									console.log(
										`Failed to attach debugger to tab: ${currentTabId}`,
										chrome.runtime.lastError.message,
									);
									return reject(chrome.runtime.lastError);
								}
								console.log("Debugger attached successfully.");

								chrome.debugger.sendCommand(
									{ tabId: currentTabId ?? 0 },
									"Console.enable",
									{},
									() => {
										if (chrome.runtime.lastError) {
											console.error(
												"Failed to enable console for tab:",
												chrome.runtime.lastError.message,
											);
											return reject(chrome.runtime.lastError);
										}
										console.log("Console enabled for tab:", currentTabId);
									},
								);

								const logs: any[] = [];
								chrome.debugger.onEvent.addListener(
									(debuggeeId, message, params) => {
										if (
											message === "Console.messageAdded" &&
											params &&
											(params as any).message
										) {
											logs.push((params as any).message);
										}
										console.log(
											`Debugger event received: ${message} with params:`,
											params,
											`from debuggee ID: ${debuggeeId}`,
										);
									},
								);
								setTimeout(() => {
									chrome.debugger.detach(
										{ tabId: currentTabId ?? 0 },
										function () {
											if (chrome.runtime.lastError) {
												console.error(
													"Failed to detach debugger from tab:",
													chrome.runtime.lastError.message,
												);
												return reject(chrome.runtime.lastError);
											}
											console.log(
												"Debugger detached from tab: " + currentTabId,
											);
											resolve(logs);
										},
									);
								}, 2000);
							},
						);
					});
				}
			} else {
				reject(new Error("No active tab found"));
			}
		});
	});
};

const getPlatformInfo = async (): Promise<{
	platformInfo: chrome.runtime.PlatformInfo;
}> => {
	return new Promise((resolve, reject) => {
		chrome.runtime.getPlatformInfo((platformInfo) => {
			if (chrome.runtime.lastError) {
				console.error(
					"Failed to get platform info:",
					chrome.runtime.lastError.message,
				);
				return reject(chrome.runtime.lastError);
			} else {
				resolve({ platformInfo: platformInfo });
			}
		});
	});
};

const getCurrentTabUrl = async (): Promise<string> => {
	return new Promise((resolve, reject) => {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (tabs.length > 0 && tabs[0].url) {
				resolve(tabs[0].url);
			} else {
				reject(new Error("No active tab found or URL is not accessible."));
			}
		});
	});
};

const getScreenDimensions = async (): Promise<{
	width: number;
	height: number;
}> => {
	return new Promise((resolve, reject) => {
		chrome.system.display.getInfo((displays) => {
			if (displays.length > 0) {
				// This gets the dimensions of the primary display
				// todo: add support for multiple displays
				// todo: add support for different window sizes
				const primaryDisplay = displays.find((display) => display.isPrimary);
				if (primaryDisplay) {
					resolve({
						width: primaryDisplay.bounds.width,
						height: primaryDisplay.bounds.height,
					});
				} else {
					reject(new Error("Primary display not found."));
				}
			} else {
				reject(new Error("No displays found."));
			}
		});
	});
};

const getBrowserName = (): string => {
	const userAgent = navigator.userAgent;
	switch (true) {
		case userAgent.includes("Chrome"):
			return "Google Chrome";
		case userAgent.includes("Firefox"):
			return "Mozilla Firefox";
		case userAgent.includes("Safari"):
			return "Apple Safari";
		case userAgent.includes("Edge"):
			return "Microsoft Edge";
		default:
			return "Unknown Browser";
	}
};

const handleIssueRequest = async (
	req: { msg: string },
	sendResponse: {
		(response?: any): void;
		(arg0: { status: string; error?: any }): void;
	},
	tab: chrome.tabs.Tab,
) => {
	if (req.msg === "take_screenshot") {
		try {
			// Get the user ID

			const [
				user,
				screenshot,
				logs,
				platformInfo,
				url,
				browserName,
				primaryDisplayDimensions,
			] = await Promise.all([
				getUser() as Promise<User | undefined>,
				takeScreenshot(tab.windowId),
				getConsoleLogs(),
				getPlatformInfo(),
				getCurrentTabUrl(),
				getBrowserName(),
				getScreenDimensions(),
			]);
			const response = {
				user,
				status: "Success",
				screenshot,
				logs,
				platformInfo,
				url,
				browserName,
				primaryDisplayDimensions,
			};

			const { data, error } = await supabase
				.from("issue_snapshots")
				.insert([
					{
						uuid: response.user?.user.user.id,
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
					},
				])
				.select("id");
			if (error) {
				console.error("Failed to insert data into Supabase:", error);
				sendResponse({ status: "Error", error: error.message });
			} else {
				// console.log("Inserted data into Supabase:", data);
				const insertedId = data[0].id; // Get the ID of the inserted record
				console.log("Inserted record ID:", response);
				sendResponse({ status: "Success", id: insertedId });
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
	}
};
