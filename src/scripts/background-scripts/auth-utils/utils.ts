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

export const supabase: SupabaseClient = createClient(
	supabaseUrl,
	supabaseKey,
	options,
);

const isDevEnvironment = false;

export const appUrl = isDevEnvironment
	? "http://localhost:3000"
	: "https://app.commentcast.dev";
