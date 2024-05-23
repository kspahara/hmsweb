import { CrumbItem, Match } from "../components/breadcrumbs.tsx";
import { RootPage } from "../pages/_index.tsx";
import { authProvider } from "../provides/auth.ts";
import { getLocationPath } from "../libs/libs.ts";
import { getCartCount } from "../data/hin/hin.ts";

// const paths = ["/", "/hin", "/login", "/albums", "/comments", "/photos", "/posts", "/todos", "/users"] as const;
/**
 * kbns = index: ルートページ | public: リンク | not_auth: 非認証 | auth: 認証
 */
export type Link = {
  // href: (typeof paths)[number];
  href: string;
  label: string;
  kbn: "index" | "public" | "not_auth" | "not_auth_user" | "auth" | "auth_user";
};

const getLinks = async (): Promise<Link[]> => {
  return [
    { href: "/", label: "HMS-App", kbn: "index" },
    { href: "/hin", label: "Item", kbn: "public" },
    { href: "/login", label: "Login", kbn: "not_auth" },
    { href: "/login_user", label: "User Login", kbn: "not_auth_user" },
    { href: "/albums", label: "Albums List", kbn: "auth" },
    { href: "/comments", label: "Comments List", kbn: "auth" },
    { href: "/photos", label: "Photos List", kbn: "auth" },
    { href: "/posts", label: "Posts List", kbn: "auth" },
    { href: "/todos", label: "Todos List", kbn: "auth" },
    { href: "/users", label: "Users List", kbn: "auth" },
    { href: "/network", label: "Network List", kbn: "auth" },
    { href: "/nyusyuko", label: "nyusyukolist", kbn: "auth" },
  ];
};

const clientLoader = async () => {
  const isAuth = authProvider.isAuthenticated;
  // console.log("RootRoute username", authProvider.username);

  return {
    // ログインしている場合、rootルートは常にauthProviderを返す
    user: authProvider.username,
    isAuth: authProvider.isAuthenticated,
    links: await getLinks(),
    cart_data: isAuth ? await getCartCount() : null,
  };
};

const handle = {
  crumb: (match: Match<unknown>): JSX.Element => (
    <CrumbItem
      props={{ linkProps: { to: `${match.pathname}` }, active: getLocationPath() === match.pathname }}
      label={
        <>
          <i className="bi bi-house-door-fill me-1" />
          Home
        </>
      }
    />
  ),
};

export function RootRoute(): JSX.Element {
  return <RootPage />;
}

RootRoute.loader = clientLoader;
RootRoute.handle = handle;
