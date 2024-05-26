export function createIssueNotification(issueId: number) {
	const issueUrl = `https://commentcast-dashboard.vercel.app/issues/${issueId}`;
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

export function createSignInNotification() {
	chrome.notifications.create(
		{
			type: "basic",
			iconUrl: "/public/logo192.png",
			title: "Authentication Required",
			message: "You're not signed in. Redirecting you to the dashboard.",
			isClickable: false,
		},
		function (notificationId) {
			if (chrome.runtime.lastError) {
				console.error("Notification error:", chrome.runtime.lastError);
			} else {
				console.log("Sign-in notification created with ID:", notificationId);
			}
		},
	);
}
