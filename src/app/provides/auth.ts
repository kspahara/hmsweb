import { getUsers } from "../data/jsonplaceholder/users";

export type IsAuthenticated = boolean;
export type UserName = string | null;

interface AuthProvider {
	isAuthenticated: IsAuthenticated;
	username: UserName;
	signin(username: string): Promise<void>;
	signout(): Promise<void>;
}

export const authProvider: AuthProvider = {
	isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
	username: localStorage.getItem("username"),
	async signin(username: string) {
		// TODO 一致するユーザーがいるかどうかを確認する
		const users = await getUsers(username);

		if (users[0].username) {
			// 認証情報を保存する
			localStorage.setItem("username", users[0].username);
			localStorage.setItem("isAuthenticated", "true");
			authProvider.username = users[0].username;
			authProvider.isAuthenticated = true;
			return;
		}
		// 認証情報が一致しない場合はエラーを返す
		return Promise.reject(new Error("Invalid username"));
	},
	async signout() {
		// 認証情報を削除する
		const keys = ["username", "isAuthenticated"];
		for (const key of keys) {
			localStorage.removeItem(key);
		}
		authProvider.username = "";
		authProvider.isAuthenticated = false;
	},
};
