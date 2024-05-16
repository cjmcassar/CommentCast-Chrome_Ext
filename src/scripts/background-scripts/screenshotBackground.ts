import { supabase } from "../utils/supabase/supabaseClient";

let isListenerAdded = false;
let currentTabId: number | null = null;
let isCaptureInProgress = false;

// todo: Add the following information:
// URL
// Timestamp
// Operating System
// Browser
// Window size
// Country
// Screen Dimensions

// todo: add authentication via the authBackground script

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

const takeShot = async (windowId: number): Promise<string> => {
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

const getWindowSize = async (): Promise<{
	windowSize: chrome.windows.Window;
}> => {
	return new Promise((resolve, reject) => {
		chrome.windows.getCurrent((window) => {
			if (chrome.runtime.lastError) {
				console.error(
					"Failed to get window size:",
					chrome.runtime.lastError.message,
				);
				return reject(chrome.runtime.lastError);
			}
			resolve({ windowSize: window });
		});
	});
};

const getCountry = async (): Promise<string> => {
	try {
		const response = await fetch("https://ipapi.co/json/");
		const data = await response.json();
		return `${data.country_name} (${data.country_code})`;
	} catch (error) {
		console.error("Failed to get country information:", error);
		return "Unknown";
	}
};

const getScreenDimensions = (): { width: number; height: number } => {
	return { width: window.screen.width, height: window.screen.height };
};

// TODO: create function that gets browser information as well

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
			const [screenshot, logs, platformInfo] = await Promise.all([
				takeShot(tab.windowId),
				getConsoleLogs(),
				getPlatformInfo(),
			]);
			const response = {
				status: "Success",
				screenshot,
				logs,
				platformInfo,
			};
			console.log("Response from handleIssueRequest:", response);
			sendResponse({
				status: "Success",
				screenshot,
				logs,
				platformInfo,
			});
			const { data, error } = await supabase.from("issue_snapshots").insert([
				{
					screenshot: response.screenshot,
					logs: response.logs,
					platform_arch: response.platformInfo.platformInfo.arch,
					platform_os: response.platformInfo.platformInfo.os,
				},
			]);
			if (error) {
				console.error("Failed to insert data into Supabase:", error);
				sendResponse({ status: "Error", error: error.message });
			} else {
				sendResponse({ status: "Success", data });
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
