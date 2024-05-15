import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://your-supabase-url.supabase.co";
const supabaseKey = "your-supabase-key";
const supabase = createClient(supabaseUrl, supabaseKey);

function getAnonUUID() {
	let anonUUID = localStorage.getItem("anon-uuid");
	if (!anonUUID) {
		anonUUID = uuidv4();
		localStorage.setItem("anon-uuid", anonUUID);
	}
	return anonUUID;
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

export async function createIssue(issueData: any) {
	const anonUUID = getAnonUUID();
	const { data, error } = await supabase
		.from("issues")
		.insert([{ ...issueData, anon_uuid: anonUUID }]);
	if (error) throw error;
	return data;
}

export async function linkIssuesToUser(user_id: string) {
	const anonUUID = getAnonUUID();
	const { data, error } = await supabase
		.from("issues")
		.update({ user_id: user_id })
		.match({ anon_uuid: anonUUID });
	if (error) throw error;
	return data;
}
