import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yvdtkxnmiehnrwmjkjxp.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2ZHRreG5taWVobnJ3bWpranhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5NDEyMzIsImV4cCI6MjAyODUxNzIzMn0.g4dgWoHBDONdD6YNQ1SZ6PwL6nfj1L-F5TFq1vI3Fb4";
const supabase = createClient(supabaseUrl, supabaseKey);

interface Session {
	access_token: string;
	[key: string]: any;
}

export async function signInAnonymously() {
	const existingSession = await new Promise((resolve) => {
		chrome.storage.local.get("comment-cast-anon-session", (result) => {
			resolve(result["comment-cast-anon-session"]);
		});
	});
	if (existingSession) {
		console.log("existing session", existingSession);
		const session = existingSession as Session;
		const { data: user, error: userError } = await supabase.auth.getUser(
			session.session.access_token,
		);
		console.log("user", user);
		console.log("userError", userError);
		if (!user.user && userError) {
			console.log("Existing session is invalid, signing in again:", userError);
			chrome.storage.local.remove("comment-cast-anon-session");
		} else {
			console.log("Anonymous session already exists:", existingSession);
			return existingSession;
		}
	}

	const { data, error } = await supabase.auth.signInAnonymously();

	if (error) {
		console.error("Error signing in anonymously:", error);
		return null;
	}

	chrome.storage.local.set({ "comment-cast-anon-session": data }, () => {
		console.log("Anonymous session stored.");
	});
	return data;
}

export function getAuthCookie(
	callback: (cookie: chrome.cookies.Cookie | null) => void,
) {
	console.log("Attempting to get auth cookie...");
	chrome.cookies.get(
		{
			url: "https://localhost:3000",
			name: "sb-yvdtkxnmiehnrwmjkjxp-auth-token",
		},
		(cookie) => {
			if (!cookie) {
				console.log("User not logged in");
				callback(null);
			} else {
				callback(cookie);
			}
		},
	);
}

// Call this function when the extension is loaded to ensure the user is signed in anonymously
