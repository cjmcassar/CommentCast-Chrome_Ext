import { appUrl, supabase } from "./auth-utils/utils";
import { createSignInNotification } from "./browser-utils/createNotification";

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
				console.log("Error retrieving user:", userError);
				createSignInNotification();
				setTimeout(() => {
					chrome.tabs.create({ url: `${appUrl}/login` });
				}, 2000); // Delay of 1 second before opening the login tab

				return undefined;
			}
			return user;
		} else {
			console.log("No active session found.");
			createSignInNotification();
			setTimeout(() => {
				chrome.tabs.create({ url: `${appUrl}/login` });
			}, 2000);

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
			console.log("Error setting session:", sessionError);
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
			console.log("Failed to authenticate user with Supabase:", userError);
			return undefined;
		}
	} catch (error) {
		console.error("Error parsing auth cookie:", error);
		return undefined;
	}
}

export function getAuthCookie(
	callback: (cookie: chrome.cookies.Cookie | null) => void,
) {
	console.log("Attempting to get auth cookie...");
	chrome.cookies.get(
		{
			url: "https://commentcast-dashboard.vercel.app",
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
