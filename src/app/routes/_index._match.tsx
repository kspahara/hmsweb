import { redirect } from "react-router-dom";

const route = import.meta.env.VITE_APP_MODE;

export const clientLoader = () => {
  return redirect(`/${route}`);
};
