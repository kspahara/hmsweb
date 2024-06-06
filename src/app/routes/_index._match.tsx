import { redirect } from "react-router-dom";

const logInMode = import.meta.env.VITE_LOGIN_MODE;

export const clientLoader = () => {
  const route = logInMode === "tokui" ? "hin" : logInMode === "tanto" ? "mypage" : undefined;

  return redirect(`/${route}`);
};
