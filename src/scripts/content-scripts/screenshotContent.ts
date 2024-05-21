export async function requestScreenshot() {
	console.log("requestScreenshot initiated");
	try {
		const response = await new Promise((resolve, reject) => {
			chrome.runtime.sendMessage(
				{ msg: "take_screenshot" },
				function (response) {
					if (response && response.status === "Success") {
						resolve(response.status);

						const issueUrl = `http://localhost:3000/issues/${response.id}`;

						//TODO: the notification is created but the condition maybe is too strick
						// so it won't up after the first screenshot
						chrome.notifications.create(
							{
								type: "basic",
								iconUrl: "/public/logo192.png", // Path to your notification icon
								title: "Screenshot Taken",
								message: "The screenshot was taken successfully!",
								isClickable: true,
							},
							function (notificationId) {
								if (chrome.runtime.lastError) {
									console.error(
										"Notification error:",
										chrome.runtime.lastError,
									);
								} else {
									console.log("Notification created with ID:", notificationId);
									chrome.storage.local.set({ [notificationId]: issueUrl });
								}
							},
						);
						console.log("response", response);

						// Example of calling cleanup on application start

						cleanupLocalStorage();

						return response;
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

function cleanupLocalStorage() {
	console.log("cleanupLocalStorage initiated");
	chrome.storage.local.get(null, (items) => {
		const allKeys = Object.keys(items);
		allKeys.forEach((key) => {
			// Example condition: remove if the URL contains a specific issue number or based on other logic
			if (items[key].includes("issues")) {
				chrome.storage.local.remove(key, () => {
					if (chrome.runtime.lastError) {
						console.error(
							`Failed to remove ${key} from local storage:`,
							chrome.runtime.lastError,
						);
					} else {
						console.log(`Removed ${key} from local storage.`);
					}
				});
				// Break after the first removal to ensure the function only runs once
				return;
			}
		});
	});
}
