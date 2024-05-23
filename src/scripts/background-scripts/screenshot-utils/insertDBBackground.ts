import { createNotification } from "../browser-utils/createNotification";

export async function insertDBBackground(
	response: any,
	sendResponse: (response?: any) => void,
) {
	const supabaseResponse = await fetch(
		"https://yvdtkxnmiehnrwmjkjxp.supabase.co/rest/v1/issue_snapshots?select=id",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${response.session?.session.access_token}`,
				apikey:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2ZHRreG5taWVobnJ3bWpranhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5NDEyMzIsImV4cCI6MjAyODUxNzIzMn0.g4dgWoHBDONdD6YNQ1SZ6PwL6nfj1L-F5TFq1vI3Fb4",
				Prefer: "return=representation",
			},

			body: JSON.stringify({
				uuid: response.user.user.id,
				screenshot: response.screenshot,
				logs: response.logs,
				platform_arch: response.platformInfo.platformInfo.arch,
				platform_os: response.platformInfo.platformInfo.os,
				url: response.url,
				browser_name: response.browserName,
				primary_display_dimensions: {
					primary_display_width: response.primaryDisplayDimensions.width,
					primary_display_height: response.primaryDisplayDimensions.height,
				},
			}),
		},
	);

	if (!supabaseResponse.ok) {
		console.error(
			"Failed to insert data into Supabase:",
			await supabaseResponse.text(),
		);
		sendResponse({
			status: "Error",
			error: "Failed to insert data into Supabase",
		});
	} else {
		const data = await supabaseResponse.json();
		createNotification(data[0].id);
		sendResponse({ status: "Success", id: data[0].id });
	}
	return true;
}
