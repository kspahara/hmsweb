import { ActionFunctionArgs, redirect } from "react-router-dom";
import { authProvider } from "../../provides/auth.ts";

export const clientAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  await authProvider.changeTokui(formData.get("tok_cd") as string);

  return redirect("/mypage/mypage_admin");
};
