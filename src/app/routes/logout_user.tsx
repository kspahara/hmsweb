import { redirect } from "react-router-dom";
import { authProvider } from "../provides/auth.ts";

const route_name = "LogoutRoute";

export const clientAction = async () => {
	// fetcher.Formからアクセスできる "resource route "にsignoutする
	return await authProvider.signoutUser(), console.log(`${route_name} redirect`), redirect("/");
};
