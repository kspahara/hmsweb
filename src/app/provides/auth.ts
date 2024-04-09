import { getAuthUser } from "../data/jsonplaceholder/users.ts";

export type IsAuthenticated = boolean;
export type UserName = string | null;

type AuthProvider = {
	isAuthenticated: IsAuthenticated;
	username: UserName;
	signin(username: string): Promise<void>;
	signout(): Promise<void>;
};

/**
 * ローカルストレージからアイテムを削除する
 * @param key
 * @returns
 */
const removeItem = (key: string) => localStorage.removeItem(key);

/**
 * ローカルストレージにアイテムを保存する
 * @param key
 * @param value
 */
const setItem = (key: string, value: string) => localStorage.setItem(key, value);

/**
 * authProvider のプロパティを更新する
 * @param properties
 */
const setAuthProvider = (properties: Partial<typeof authProvider>) => Object.assign(authProvider, properties);

/**
 * 認証情報を管理する
 */
export const authProvider: AuthProvider = {
	isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
	username: localStorage.getItem("username"),
	async signin(username: string) {
		// TODO 一致するユーザーがいるかどうかを確認する
		const users = await getAuthUser(username);
		// TODO
		const user = users[0];
		// TODO
		if (user.username) {
			const itemsToSet = [
				{ key: "username", value: user.username },
				{ key: "isAuthenticated", value: "true" },
			];
			const properties = {
				username: user.username,
				isAuthenticated: true,
			};
			// localStorage に itemsToSet の値を保存する
			itemsToSet.forEach(({ key, value }) => setItem(key, value));
			// authProvider のプロパティをpropertiesの値に更新する
			setAuthProvider(properties);

			return;
		}
		// 認証情報が一致しない場合はエラーを返す
		return Promise.reject(new Error("Invalid username"));
	},
	async signout() {
		const keys = ["username", "isAuthenticated"];
		const properties = {
			username: "",
			isAuthenticated: false,
		};
		// localStorage から keys の値を削除する
		keys.forEach(removeItem);
		// authProvider のプロパティをpropertiesの値に更新する
		setAuthProvider(properties);
	},
};
