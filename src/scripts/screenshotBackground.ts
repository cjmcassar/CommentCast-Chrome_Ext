//chrome

let isListenerAdded = false;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	console.log("background listener added");
	if (!isListenerAdded) {
		chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
			messageListener(req, sender, sendResponse, tabId, changeInfo, tab);
		});
		isListenerAdded = true;
	}
});

const takeShot = async (windowId: number) => {
	try {
		let imgUrl64 = await chrome.tabs.captureVisibleTab(windowId, {
			format: "jpeg",
			quality: 80,
		});
		// let imgUrl64 = "test";
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

const debuggerAttach = async (windowId: number) => {
	chrome.debugger.attach({ tabId: windowId }, "1.0", async function () {
		chrome.debugger.sendCommand(
			{ tabId: windowId },
			"Console.enable",
			{},
			function () {
				console.log("Console logging enabled for tab: " + windowId);
			},
		);
		chrome.debugger.sendCommand(
			{ tabId: windowId },
			"Runtime.getConsoleMessages",
			{},
			function (result?: { messages?: Array<{ text: string }> }) {
				if (result && result.messages) {
					result.messages.forEach((message) => {
						console.log("Existing console message:", message.text);
					});
				}
			},
		);
	});

	const onEvent = (source: { tabId: number }, method: string, params: any) => {
		if (source.tabId === windowId && method === "Console.messageAdded") {
			console.log("Console message:", params);
			// Detach debugger after receiving the first console message
			chrome.debugger.detach({ tabId: windowId }, function () {
				console.log("Debugger detached from tab: " + windowId);
			});
			// Remove the listener to prevent further handling
			chrome.debugger.onEvent.removeListener(
				onEvent as (
					source: chrome.debugger.Debuggee,
					method: string,
					params?: Object | undefined,
				) => void,
			);
		}
	};

	chrome.debugger.onEvent.addListener(
		onEvent as (
			source: chrome.debugger.Debuggee,
			method: string,
			params?: Object | undefined,
		) => void,
	);
};

const messageListener = async (
	req: { msg: string },
	sender: chrome.runtime.MessageSender,
	sendResponse: {
		(response?: any): void;
		(arg0: { status: string; error?: any }): void;
	},
	tabId: string | number | undefined,
	changeInfo: chrome.tabs.TabChangeInfo,
	tab: chrome.tabs.Tab,
) => {
	if (req.msg === "take_screenshot" && tab.windowId) {
		// console.log("take_screenshot");
		takeShot(tab.windowId)
			.then(() => {
				debuggerAttach(tab.windowId); // Fixed to pass the correct tab object instead of converting tabId to number
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

export {};
