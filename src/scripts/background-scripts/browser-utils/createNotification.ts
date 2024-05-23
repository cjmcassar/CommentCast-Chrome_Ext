export function createNotification(issueId: number) {
	const issueUrl = `http://localhost:3000/issues/${issueId}`;
	chrome.notifications.create(
		{
			type: "basic",
			iconUrl: "/public/logo192.png",
			title: "Screenshot Taken",
			message: "The screenshot was taken successfully!",
			isClickable: true,
		},
		function (notificationId) {
			if (chrome.runtime.lastError) {
				console.error("Notification error:", chrome.runtime.lastError);
			} else {
				console.log("Notification created with ID:", notificationId);
				chrome.storage.local.set({ [notificationId]: issueUrl });
			}
		},
	);
}
