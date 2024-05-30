import { redirect } from "react-router-dom";
import { authProvider } from "../provides/auth.ts";

const route_name = "LogoutRoute";

export const clientAction = async () => {
  return await authProvider.signOut(), console.log(`${route_name} redirect`), redirect("/");
};
