import { getAuthUser } from "../data/jsonplaceholder/users.ts";
import { getLoginTanto, getLoginTokui } from "../data/hin/login.ts";

export type IsAuthenticated = boolean;
export type UserName = string | null;

type AuthProvider = {
  isAuthenticated: IsAuthenticated;
  user_cd: string | null;
  user_name: UserName;
  user_kind: string | null;
  token_id: string | null;
  session_id: string | null;
  tok_cd: string | null;
  signIn(user_name: string): Promise<void>;
  signInUser(email: string, password: string, type: string): Promise<void>;
  signOutUser(): Promise<void>;
  signOut(): Promise<void>;
  changeTokui(tok_cd: string): Promise<void>;
};

/**
 * localStorageUtils
 * ローカルストレージの操作を行う
 * get: 指定したキーの値を取得する
 * remove: 指定したキーの値を削除する
 * set: 指定したキーと値を保存する
 */
const localStorageUtils = {
  get: (key: string) => localStorage.getItem(key),
  remove: (key: string) => localStorage.removeItem(key),
  set: (key: string, value: string) => localStorage.setItem(key, value),
};

/**
 * setAuthProvider
 * authProvider のプロパティを更新する
 * @param properties
 */
const setAuthProvider = (properties: Partial<typeof authProvider>) => Object.assign(authProvider, properties);

/**
 * setTokCd
 * @param tok_cd
 */
const setTokCd = (tok_cd: string) => {
  console.log("setTokCd", tok_cd);
  // tok_cdが空の場合nullに変換
  const itemsToSet = [{ key: "tok_cd", value: tok_cd }];
  const properties = { tok_cd: tok_cd };

  // localStorage に itemsToSet の値を保存する
  itemsToSet.forEach(({ key, value }) => localStorageUtils.set(key, value));
  // authProvider のプロパティをpropertiesの値に更新する
  setAuthProvider(properties);
};

/**
 * removeTokCd
 */
const removeTokCd = () => {
  console.log("removeTokCd");
  // tok_cdを削除
  localStorageUtils.remove("tok_cd");
  // authProvider のプロパティを更新する
  setAuthProvider({ tok_cd: null });
};

/**
 * authProvider
 * 認証情報を管理する
 */
export const authProvider: AuthProvider = {
  isAuthenticated: localStorageUtils.get("isAuthenticated") === "true",
  user_cd: localStorageUtils.get("user_cd"),
  user_name: localStorageUtils.get("user_name"),
  user_kind: localStorageUtils.get("user_kind"),
  token_id: localStorageUtils.get("token_id"),
  session_id: localStorageUtils.get("session_id"),
  tok_cd: localStorageUtils.get("tok_cd"),

  /**
   * signInUser
   * @param email
   * @param password
   * @param type
   * @returns
   */
  async signInUser(email: string, password: string, type: string) {
    const user = type === "tanto" ? await getLoginTanto(email, password) : await getLoginTokui(email, password);

    if (user.success === 1) {
      const itemsToSet = [
        { key: "isAuthenticated", value: "true" },
        { key: "user_cd", value: type === "tanto" ? user.tan_cd : user.tok_cd },
        { key: "user_name", value: type === "tanto" ? user.tan_nm : user.tok_nm },
        { key: "user_kind", value: type === "tanto" ? "tan" : "tok" },
        { key: "token_id", value: user.token_id },
        { key: "session_id", value: user.s_id },
        { key: "tok_cd", value: null },
      ];
      const properties = {
        isAuthenticated: true,
        user_cd: type === "tanto" ? user.tan_cd : user.tok_cd,
        user_name: type === "tanto" ? user.tan_nm : user.tok_nm,
        user_kind: type === "tanto" ? "tan" : "tok",
        token_id: user.token_id,
        session_id: user.s_id,
        tok_cd: null,
      };

      // localStorage に itemsToSet の値を保存する
      itemsToSet.forEach(({ key, value }) => localStorageUtils.set(key, value));
      // authProvider のプロパティをpropertiesの値に更新する
      setAuthProvider(properties);
      // tok_cd を設定する
      type !== "tanto" && setTokCd(user.tok_cd);

      return;
    }
    // 認証情報が一致しない場合はエラーを返す
    return Promise.reject(new Error("Invalid user_name"));
  },

  /**
   * signOutUser
   */
  async signOutUser() {
    const keys = ["isAuthenticated", "user_cd", "user_name", "user_kind", "token_id", "session_id", "tok_cd"];
    const properties = {
      isAuthenticated: false,
      user_cd: null,
      user_name: null,
      user_kind: null,
      token_id: null,
      session_id: null,
      tok_cd: null,
    };
    // localStorage から keys の値を削除する
    keys.forEach(localStorageUtils.remove);
    // authProvider のプロパティをpropertiesの値に更新する
    setAuthProvider(properties);
  },

  /**
   * signIn
   * @param user_name
   * @returns
   */
  async signIn(user_name: string) {
    // TODO 一致するユーザーがいるかどうかを確認する
    const users = await getAuthUser(user_name);
    // TODO
    const user = users[0];
    // TODO
    if (user.username) {
      const itemsToSet = [
        { key: "user_name", value: user.username },
        { key: "isAuthenticated", value: "true" },
      ];
      const properties = {
        user_name: user.username,
        isAuthenticated: true,
      };
      // localStorage に itemsToSet の値を保存する
      itemsToSet.forEach(({ key, value }) => localStorageUtils.set(key, value));
      // authProvider のプロパティをpropertiesの値に更新する
      setAuthProvider(properties);

      return;
    }
    // 認証情報が一致しない場合はエラーを返す
    return Promise.reject(new Error("Invalid user_name"));
  },

  /**
   * signOut
   */
  async signOut() {
    const keys = ["user_name", "isAuthenticated"];
    const properties = {
      user_name: "",
      isAuthenticated: false,
    };
    // localStorage から keys の値を削除する
    keys.forEach(localStorageUtils.remove);
    // authProvider のプロパティをpropertiesの値に更新する
    setAuthProvider(properties);
  },

  /**
   * changeTokui
   * @param tok_cd
   */
  async changeTokui(tok_cd: string) {
    // tok_cd が空の場合は削除する
    !tok_cd ? removeTokCd() : setTokCd(tok_cd);
  },
};
