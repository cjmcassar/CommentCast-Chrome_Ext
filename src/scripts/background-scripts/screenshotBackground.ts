//chrome
let isListenerAdded = false;
export function screenshotBackground() {
	chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
		console.log("background listener added");
		if (!isListenerAdded) {
			chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
				messageListener(req, sendResponse, tab);
			});
			isListenerAdded = true;
		}
	});
}

const takeShot = async (windowId: number) => {
	try {
		// let imgUrl64 = await chrome.tabs.captureVisibleTab(windowId, {
		// 	format: "jpeg",
		// 	quality: 80,
		// });
		let imgUrl64 = "test";
		console.log(imgUrl64);
		chrome.runtime.sendMessage({
			msg: "update_screenshot",
			imgUrl64: imgUrl64,
		});
	} catch (error) {
		console.error(error);
		return error;
	}
};

const getConsoleLogs = async () => {
	// Query for the active tab in the current window
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if (tabs.length > 0) {
			const currentTab = tabs[0];
			console.log("Current tab ID:", currentTab.id);

			// Proceed with getting console logs if a valid tab is found
			if (typeof currentTab.id === "number") {
				chrome.tabs.get(currentTab.id, (tab) => {
					if (chrome.runtime.lastError) {
						console.error(
							`No tab with id: ${currentTab.id}`,
							chrome.runtime.lastError.message,
						);
						return;
					}

					chrome.debugger.attach({ tabId: currentTab.id }, "1.0", function () {
						if (chrome.runtime.lastError) {
							console.error(
								`Failed to attach debugger to tab: ${currentTab.id}`,
								chrome.runtime.lastError.message,
							);
							return;
						}
						console.log("Debugger attached successfully.");

						chrome.debugger.sendCommand(
							{ tabId: currentTab.id },
							"Console.enable",
							{},
							() => {
								if (chrome.runtime.lastError) {
									console.error(
										"Failed to enable console for tab:",
										chrome.runtime.lastError.message,
									);
									return;
								}
								console.log("Console enabled for tab:", currentTab.id);
							},
						);

						chrome.debugger.onEvent.addListener(
							(debuggeeId, message, params) => {
								// this is where the console log data will be sent to the server
								console.log(
									`Debugger event received: ${message} with params:`,
									params,
									`from debuggee ID: ${debuggeeId}`,
								);

								chrome.debugger.detach({ tabId: currentTab.id }, function () {
									console.log("Debugger detached from tab: " + currentTab.id);
								});
							},
						);
					});
				});
			} else {
				console.log("No active tab found in the current window.");
			}
		} else {
			console.log("No active tab found in the current window.");
		}
	});
};

// TODO: create function that gets browser information as well

const messageListener = async (
	req: { msg: string },
	sendResponse: {
		(response?: any): void;
		(arg0: { status: string; error?: any }): void;
	},
	tab: chrome.tabs.Tab,
) => {
	if (req.msg === "take_screenshot" && tab.windowId) {
		// console.log("take_screenshot");
		takeShot(tab.windowId)
			.then(() => {
				getConsoleLogs();
				sendResponse({ status: "Screenshot taken" });
			})
			.catch((error) => {
				console.error("Failed to take screenshot:", error);
				sendResponse({
					status: "Error taking screenshot",
					error: error.toString(),
				});
			});
	}
};
