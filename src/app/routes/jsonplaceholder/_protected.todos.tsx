import { getTodos } from "../../data/jsonplaceholder/todos.ts";
import { ProtectedTodosPage } from "../../pages/jsonplaceholder/_protected.todos.tsx";
import { authProvider } from "../../provides/auth.ts";

const clientLoader = async () => {
  const isAuth = authProvider.isAuthenticated;

  return isAuth ? { data: await getTodos() } : null;
};

export function ProtectedTodosRoute(): JSX.Element {
  return <ProtectedTodosPage />;
}

ProtectedTodosRoute.loader = clientLoader;
