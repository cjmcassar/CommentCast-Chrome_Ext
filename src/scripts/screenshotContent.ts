// Function to request a screenshot from the background script
function requestScreenshot() {
	console.log("requestScreenshot");
	try {
		chrome.runtime.sendMessage({ msg: "take_screenshot" }, function (response) {
			if (response && response.dataUrl) {
				console.log("Screenshot URL received:", response.dataUrl);
				downloadScreenshot(response.dataUrl);
			} else {
				console.error("Invalid or no response received:", response);
			}
		});
	} catch (error) {
		console.error("Failed to send message for screenshot:", error);
	}
}

// Remove the below once we have the background script sending the data to the server

// Function to download the screenshot using the data URL
function downloadScreenshot(dataUrl: string) {
	console.log("downloadScreenshot");
	const link = document.createElement("a");
	link.href = dataUrl;
	link.download = "screenshot.png";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	console.log("Screenshot downloaded.");
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	if (message.msg === "update_screenshot") {
		console.log("Screenshot URL received:", message.imgUrl64);
		downloadScreenshot(message.imgUrl64);
	}
});

export { requestScreenshot };
