import { CrumbItem } from "../components/CrumbItem.tsx";
import { RootPage } from "../pages/_index.tsx";
import { authProvider } from "../provides/auth.ts";
import { getLocationPath } from "../libs/libs.ts";

type Link = { to: string; label: string };

export type Links = {
	external_links: { href: string; label: string }[];
	links: Link[];
	not_auth_links: Link[];
	protected_links: Link[];
};

const getLinks = async (): Promise<Links> => {
	const links: Links = {
		external_links: [{ href: "..", label: "Home" }],
		links: [
			{ to: "./", label: "Public" },
			{ to: "/hin", label: "Item" },
			{ to: "/albums", label: "Albums List (Protected)" },
		],
		not_auth_links: [{ to: "./login", label: "Login" }],
		protected_links: [
			{ to: "/albums", label: "Albums List" },
			{ to: "/comments", label: "Comments List" },
			{ to: "/photos", label: "Photos List" },
			{ to: "/posts", label: "Posts List" },
			{ to: "/todos", label: "Todos List" },
			{ to: "/users", label: "Users List" },
		],
	};

	return links;
};

const clientLoader = async () => {
	// ログインしている場合、rootルートは常にauthProviderを返す
	return { user: authProvider.username, isAuth: authProvider.isAuthenticated, links: await getLinks() };
};

type Match = {
	pathname: string;
};

const createCrumb = (match: Match): JSX.Element => {
	const props = {
		linkProps: { to: `${match.pathname}` },
		active: getLocationPath() === match.pathname,
	};
	const label = (
		<>
			<i className={"bi bi-house-door-fill me-1"}></i>Home
		</>
	);

	return <CrumbItem props={props} label={label} />;
};

const handle = {
	crumb: createCrumb,
};

export function RootRoute(): JSX.Element {
	return <RootPage />;
}

RootRoute.loader = clientLoader;
RootRoute.handle = handle;
