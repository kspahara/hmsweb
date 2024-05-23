import { getAuthUser } from "../data/jsonplaceholder/users.ts";
import { getLoginTokui } from "../data/hin/login.ts";

export type IsAuthenticated = boolean;
export type UserCd = string | null;
export type UserName = string | null;
export type userKind = string | null;
export type TokenId = string | null;
export type SessionId = string | null;

type AuthProvider = {
  isAuthenticated: IsAuthenticated;
  usercd: UserCd;
  username: UserName;
  user_kind: userKind;
  token_id: TokenId;
  session_id: SessionId;
  signin(username: string): Promise<void>;
  signinUser(email: string, password: string): Promise<void>;
  signoutUser(): Promise<void>;
  signout(): Promise<void>;
};

/**
 * removeItem
 * ローカルストレージからアイテムを削除する
 * @param key
 * @returns
 */
const removeItem = (key: string) => localStorage.removeItem(key);

/**
 * setItem
 * ローカルストレージにアイテムを保存する
 * @param key
 * @param value
 */
const setItem = (key: string, value: string) => localStorage.setItem(key, value);

/**
 * setAuthProvider
 * authProvider のプロパティを更新する
 * @param properties
 */
const setAuthProvider = (properties: Partial<typeof authProvider>) => Object.assign(authProvider, properties);

/**
 * authProvider
 * 認証情報を管理する
 */
export const authProvider: AuthProvider = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  usercd: localStorage.getItem("usercd"),
  username: localStorage.getItem("username"),
  user_kind: localStorage.getItem("user_kind"),
  token_id: localStorage.getItem("token_id"),
  session_id: localStorage.getItem("session_id"),
  async signinUser(email: string, password: string) {
    const user = await getLoginTokui(email, password);

    if (user.token_id) {
      const itemsToSet = [
        { key: "isAuthenticated", value: "true" },
        { key: "usercd", value: user.tok_cd },
        { key: "username", value: user.tok_nm },
        { key: "user_kind", value: user.user_kind },
        { key: "token_id", value: user.token_id },
        { key: "session_id", value: user.s_id },
      ];
      const properties = {
        isAuthenticated: true,
        usercd: user.tok_cd,
        username: user.tok_nm,
        user_kind: user.user_kind,
        token_id: user.token_id,
        session_id: user.s_id,
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
  async signoutUser() {
    const keys = ["isAuthenticated", "usercd", "username", "user_kind", "token_id", "session_id"];
    const properties = {
      isAuthenticated: false,
      usercd: "",
      username: "",
      user_kind: "",
      token_id: "",
      session_id: "",
    };
    // localStorage から keys の値を削除する
    keys.forEach(removeItem);
    // authProvider のプロパティをpropertiesの値に更新する
    setAuthProvider(properties);
  },
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
