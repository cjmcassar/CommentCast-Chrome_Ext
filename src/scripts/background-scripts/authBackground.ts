import { SupabaseClient, createClient } from "@supabase/supabase-js";

// To fetch items from storage
export const getLocalStorage = async (key: string): Promise<any> =>
	(await chrome.storage.local.get(key))[key];

// To remove storage key from the chrome storage
export const removeLocalStorage = async (key: string): Promise<void> =>
	await chrome.storage.local.remove(key);

// For setting storage
export const setLocalStorage = async (dataObject: any): Promise<void> =>
	await chrome.storage.local.set(dataObject);

const storageAdapter = {
	getItem: async (name: string) => {
		return await getLocalStorage(name);
	},

	setItem: async (name: string, value: string) => {
		return await setLocalStorage({ [name]: value });
	},

	removeItem: async (name: string) => {
		return await removeLocalStorage(name);
	},
};

const options = {
	auth: {
		debug: false,
		persistSession: true,
		storage: storageAdapter,
	},
};

const supabaseUrl = "https://yvdtkxnmiehnrwmjkjxp.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2ZHRreG5taWVobnJ3bWpranhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5NDEyMzIsImV4cCI6MjAyODUxNzIzMn0.g4dgWoHBDONdD6YNQ1SZ6PwL6nfj1L-F5TFq1vI3Fb4";

const supabase: SupabaseClient = createClient(
	supabaseUrl,
	supabaseKey,
	options,
);

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

export async function getUser(): Promise<User | undefined> {
	try {
		const { data: session, error: sessionError } =
			await supabase.auth.getSession();
		if (sessionError) {
			console.error("Error retrieving session:", sessionError);
			return undefined;
		}

		if (session && session.session && session.session.access_token) {
			const { data: user, error: userError } = await supabase.auth.getUser(
				session.session.access_token,
			);
			if (userError) {
				console.error("Error retrieving user:", userError);
				return undefined;
			}
			return user;
		} else {
			console.log("No active session found.");
			return undefined;
		}
	} catch (error) {
		console.error("Error in getUser function:", error);
		return undefined;
	}
}

export async function getSession(): Promise<Session | undefined> {
	try {
		const { data: session, error: sessionError } =
			await supabase.auth.getSession();
		if (sessionError) {
			console.error("Error retrieving session:", sessionError);
			return undefined;
		}

		if (session && session.session && session.session.access_token) {
			return session;
		} else {
			console.log("No active session found.");
			return undefined;
		}
	} catch (error) {
		console.error("Error in getSession function:", error);
		return undefined;
	}
}

export async function signIn(): Promise<User | undefined> {
	return new Promise(async (resolve, reject) => {
		getAuthCookie(async (cookie) => {
			if (cookie) {
				const user = await handleExistingCookie(cookie);
				resolve(user);
			} else {
				console.log(
					"No auth cookie found, user needs to sign in through the web app.",
				);
				reject(undefined);
			}
		});
	});
}

async function handleExistingCookie(
	cookie: chrome.cookies.Cookie,
): Promise<User | undefined> {
	console.log("Auth cookie found:", cookie.value);
	try {
		const decodedCookie = decodeURIComponent(cookie.value);
		const cookieData = JSON.parse(decodedCookie);
		console.log("cookieData", cookieData);
		const accessToken = cookieData.access_token;
		const refreshToken = cookieData.refresh_token;

		// Set the session in Supabase
		const { data: session, error: sessionError } =
			await supabase.auth.setSession({
				access_token: accessToken,
				refresh_token: refreshToken,
			});

		if (sessionError) {
			console.error("Error setting session:", sessionError);
			return undefined;
		}

		const { data: user, error: userError } = await supabase.auth.getUser(
			accessToken,
		);
		if (user.user && !userError) {
			console.log("User authenticated successfully:", user);
			console.log("user session:", session);
			return user;
		} else {
			console.error("Failed to authenticate user with Supabase:", userError);
			return undefined;
		}
	} catch (error) {
		console.error("Error parsing auth cookie:", error);
		return undefined;
	}
}

// function handleUserAlreadySignedIn(user: User, cookieData: any) {
// 	return new Promise(async (resolve) => {
// 		console.log("User is already signed in:", user);

// 		const existingUserSession = await getExistingUserSession();
// 		if (!existingUserSession) {
// 			storeUserSession(cookieData);
// 		} else {
// 			console.log("User session already exists.");

// 			resolve(user);
// 		}
// 	});
// }

// async function getExistingUserSession() {
// 	return new Promise((resolve) => {
// 		chrome.storage.local.get(
// 			["comment-cast-user-session", "comment-cast-anon-session"],
// 			(result) => {
// 				resolve(
// 					result["comment-cast-user-session"] ||
// 						result["comment-cast-anon-session"],
// 				);
// 			},
// 		);
// 	});
// }

// function storeUserSession(cookieData: any) {
// 	chrome.storage.local.set({ "comment-cast-user-session": cookieData }, () => {
// 		console.log("User session stored.");
// 	});
// }

// async function handleAnonymousSignIn() {
// 	const existingSession = await getExistingSession();
// 	if (existingSession) {
// 		return existingSession;
// 	}

// 	const { data, error } = await supabase.auth.signInAnonymously();
// 	if (error) {
// 		console.error("Error signing in anonymously:", error);
// 		return null;
// 	}

// 	chrome.storage.local.set({ "comment-cast-anon-session": data }, () => {
// 		console.log("Anonymous session stored.");
// 	});
// 	return data;
// }

// async function getExistingSession() {
// 	const existingSession = await new Promise((resolve) => {
// 		chrome.storage.local.get("comment-cast-anon-session", (result) => {
// 			resolve(result["comment-cast-anon-session"]);
// 		});
// 	});
// 	if (existingSession) {
// 		console.log("existing session", existingSession);
// 		const session = existingSession as Session;
// 		const { data: user, error: userError } = await supabase.auth.getUser(
// 			session.session.access_token,
// 		);
// 		if (!user.user && userError) {
// 			console.log("Existing session is invalid, signing in again:", userError);
// 			chrome.storage.local.remove("comment-cast-anon-session");
// 		} else {
// 			console.log("Anonymous session already exists:", existingSession);
// 			// chrome.storage.local.remove("comment-cast-user-session");
// 			return existingSession;
// 		}
// 	}
// }

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
