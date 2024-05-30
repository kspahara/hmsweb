import { redirect } from "react-router-dom";

export const clientLoader = () => {
  // const route = "/nyusyuko";
  const route = "/hin";

  return redirect(route);
};
