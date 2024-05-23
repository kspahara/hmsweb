import { getPosts } from "../../data/jsonplaceholder/posts.ts";
import { ProtectedPostsPage } from "../../pages/jsonplaceholder/_protected.posts.tsx";
import { authProvider } from "../../provides/auth.ts";

const clientLoader = async () => {
  const isAuth = authProvider.isAuthenticated;

  return isAuth ? { data: await getPosts() } : null;
};

export function ProtectedPostsRoute(): JSX.Element {
  return <ProtectedPostsPage />;
}

ProtectedPostsRoute.loader = clientLoader;
