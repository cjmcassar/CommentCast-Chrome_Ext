//chrome

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	console.log("background listener added");

	chrome.runtime.onMessage.addListener(async (req, sender, sendResponse) => {
		if (req.msg === "take_screenshot" && tab.windowId) {
			console.log("take_screenshot");
			takeShot(tab.windowId)
				.then(() => {
					sendResponse({ status: "Screenshot taken" });
				})
				.catch((error) => {
					console.error("Failed to take screenshot:", error);
					sendResponse({
						status: "Error taking screenshot",
						error: error.toString(),
					});
				});
			return true;
		}
	});
});

const takeShot = async (windowId: number) => {
	try {
		let imgUrl64 = await chrome.tabs.captureVisibleTab(windowId, {
			format: "jpeg",
			quality: 80,
		});
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

export {};
