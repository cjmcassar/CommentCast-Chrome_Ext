export async function requestScreenshot() {
	console.log("requestScreenshot initiated");
	try {
		const response = await new Promise((resolve, reject) => {
			chrome.runtime.sendMessage(
				{ msg: "take_screenshot" },
				function (response) {
					if (response && response.status === "Success") {
						resolve(response.status);
					} else {
						reject(
							new Error(response?.error || "Failed to receive screenshot URL"),
						);
					}
				},
			);
		});
	} catch (error) {
		console.error("Failed to send message for screenshot:", error);
	}
}
