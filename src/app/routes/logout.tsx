import { redirect } from "react-router-dom";
import { authProvider } from "../provides/auth.ts";

export const clientAction = async () => {
	// fetcher.Formからアクセスできる "resource route "にsignoutする
	await authProvider.signout();
	return redirect("/");
};
