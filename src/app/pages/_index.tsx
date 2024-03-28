import { NavLink, Outlet, useFetcher, useRouteLoaderData } from "react-router-dom";
import { ProgressNav } from "../components/ProgressNav";
import { IsAuthenticated, UserName } from "../provides/auth";
import { Button, Form, Container } from "react-bootstrap";

const HeaderNavigation = (): JSX.Element => {
	type Link = { to: string; label: string };
	interface Links {
		external_links: { href: string; label: string }[];
		links: Link[];
		not_auth_links: Link[];
		protected_links: Link[];
	}
	interface Auth {
		user: UserName;
		isAuth: IsAuthenticated;
	}

	const links: Links = {
		external_links: [{ href: "..", label: "Home Page" }],
		links: [
			{ to: "./", label: "Public Page" },
			{ to: "/albums", label: "Albums List Page (Protected)" },
		],
		not_auth_links: [{ to: "./login", label: "Login Page" }],
		protected_links: [
			{ to: "/albums", label: "Albums List Page" },
			{ to: "/comments", label: "Comments List Page" },
			{ to: "/photos", label: "Photos List Page" },
			{ to: "/posts", label: "Posts List Page" },
			{ to: "/todos", label: "Todos List Page" },
			{ to: "/users", label: "Users List Page" },
		],
	};
	const { user, isAuth } = useRouteLoaderData("root") as Auth;
	const fetcher = useFetcher();
	const isLoggingOut = fetcher.formData != null;
	const FeacherForm = fetcher.Form;
	const isDebugMode = import.meta.env.VITE_DEBBUG === "true";

	return (
		<>
			<header id={"header"}>
				<nav>
					{isDebugMode && <ProgressNav />}
					<ul>
						{links.external_links.map((link, idx: number) => (
							<li key={idx}>
								<a href={link.href}>{link.label}</a>
							</li>
						))}
					</ul>
					<ul>
						{links.links.map((link, idx: number) => (
							<li key={idx}>
								<NavLink to={link.to}>{link.label}</NavLink>
							</li>
						))}
						{!isAuth ? (
							<>
								{links.not_auth_links.map((link, idx: number) => (
									<li key={idx}>
										<NavLink to={link.to}>{link.label}</NavLink>
									</li>
								))}
							</>
						) : (
							<>
								{links.protected_links.map((link, idx: number) => (
									<li key={idx}>
										<NavLink to={link.to}>{link.label}</NavLink>
									</li>
								))}
							</>
						)}
					</ul>
					{!isAuth ? (
						<>
							<p>You are not logged in.</p>
						</>
					) : (
						<>
							<p>Welcome {user}!</p>
							<Form as={FeacherForm} method={"post"} action={"/logout"}>
								<Button type={"submit"} variant={"link"} disabled={isLoggingOut}>
									{isLoggingOut ? "Signing out..." : "Sign out"}
								</Button>
							</Form>
						</>
					)}
				</nav>
			</header>
		</>
	);
};

export function RootPage(): JSX.Element {
	return (
		<>
			<HeaderNavigation />
			<Container>
				<Outlet />
			</Container>
		</>
	);
}
