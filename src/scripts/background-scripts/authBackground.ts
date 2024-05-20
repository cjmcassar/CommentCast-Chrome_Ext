import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yvdtkxnmiehnrwmjkjxp.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2ZHRreG5taWVobnJ3bWpranhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5NDEyMzIsImV4cCI6MjAyODUxNzIzMn0.g4dgWoHBDONdD6YNQ1SZ6PwL6nfj1L-F5TFq1vI3Fb4";
const supabase = createClient(supabaseUrl, supabaseKey);

interface Session {
	session: {
		access_token: string;
	};
}

interface User {
	user: {
		id: string;
	};
}

export function getUser(): Promise<User | undefined> {
	return new Promise((resolve, reject) => {
		chrome.storage.local.get(
			["comment-cast-user-session", "comment-cast-anon-session"],
			(result) => {
				if (chrome.runtime.lastError) {
					console.error(
						"Failed to get user from local storage:",
						chrome.runtime.lastError,
					);
					return reject(undefined);
				}

				const userSession = result["comment-cast-user-session"];
				const anonSession = result["comment-cast-anon-session"];
				if (userSession) {
					try {
						const user = userSession;
						resolve({ user });
					} catch (error) {
						console.error("Failed to parse user session:", error);
						reject(undefined);
					}
				} else if (anonSession) {
					try {
						const user = anonSession;
						resolve({ user });
					} catch (error) {
						console.error("Failed to parse anonymous session:", error);
						reject(undefined);
					}
				} else {
					console.error("No user or anonymous session found in local storage");
					resolve(undefined);
				}
			},
		);
	});
}

export async function signIn(): Promise<User> {
	return new Promise(async (resolve) => {
		getAuthCookie(async (cookie) => {
			if (cookie) {
				handleExistingCookie(cookie);
				resolve(handleExistingCookie(cookie));
			} else {
				console.log("No auth cookie found, signing in anonymously.");
				await handleAnonymousSignIn();
			}
		});
	});
}

async function handleExistingCookie(
	cookie: chrome.cookies.Cookie,
): Promise<User> {
	return new Promise(async (resolve) => {
		console.log("Auth cookie found:", cookie.value);
		try {
			const decodedCookie = decodeURIComponent(cookie.value);
			const cookieData = JSON.parse(decodedCookie);
			const accessToken = cookieData.access_token;

			const { data: user, error: userError } = await supabase.auth.getUser(
				accessToken,
			);
			if (user.user && !userError) {
				await handleUserAlreadySignedIn(user, cookieData);
				resolve(user);
			} else {
				console.log(
					"Auth cookie is invalid, signing in anonymously:",
					userError,
				);
				await handleAnonymousSignIn();
			}
		} catch (error) {
			console.error("Error parsing auth cookie:", error);
			await handleAnonymousSignIn();
		}
	});
}

function handleUserAlreadySignedIn(user: User, cookieData: any) {
	return new Promise(async (resolve) => {
		console.log("User is already signed in:", user);

		const existingUserSession = await getExistingUserSession();
		if (!existingUserSession) {
			storeUserSession(cookieData);
		} else {
			console.log("User session already exists.");
			resolve(user);
		}
	});
}

async function getExistingUserSession() {
	return new Promise((resolve) => {
		chrome.storage.local.get(
			["comment-cast-user-session", "comment-cast-anon-session"],
			(result) => {
				resolve(
					result["comment-cast-user-session"] ||
						result["comment-cast-anon-session"],
				);
			},
		);
	});
}

function storeUserSession(cookieData: any) {
	chrome.storage.local.set({ "comment-cast-user-session": cookieData }, () => {
		console.log("User session stored.");
	});
}

async function handleAnonymousSignIn() {
	const existingSession = await getExistingSession();
	if (existingSession) {
		return existingSession;
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

async function getExistingSession() {
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
		if (!user.user && userError) {
			console.log("Existing session is invalid, signing in again:", userError);
			chrome.storage.local.remove("comment-cast-anon-session");
		} else {
			console.log("Anonymous session already exists:", existingSession);
			return existingSession;
		}
	}
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
