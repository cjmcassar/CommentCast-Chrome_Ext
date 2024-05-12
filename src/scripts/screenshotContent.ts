// Function to request a screenshot from the background script
function requestScreenshot() {
	console.log("requestScreenshot");
	try {
		chrome.runtime.sendMessage({ msg: "take_screenshot" }, function (response) {
			console.log("Screenshot URL received:", response.dataUrl);
			downloadScreenshot(response.dataUrl);
		});
	} catch (error) {
		console.error("Failed to send message for screenshot:", error);
	}
}

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

// Initialize the screenshot request on page load
// document.addEventListener("DOMContentLoaded", function () {
// 	console.log("DOMContentLoaded");
// 	requestScreenshot();
// });

export { requestScreenshot };
