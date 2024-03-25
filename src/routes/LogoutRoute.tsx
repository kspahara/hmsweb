import { redirect } from "react-router-dom";
import { authProvider } from "../provides/auth";

export async function clientAction() {
	// fetcher.Formからアクセスできる "resource route "にsignoutする
	await authProvider.signout();
	return redirect("/");
}
