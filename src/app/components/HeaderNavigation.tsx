import { Link, NavLink, useFetcher, useRouteLoaderData } from "react-router-dom";
import { Button, Form, Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { IsAuthenticated, UserName } from "../provides/auth";

export function HeaderNavigation(): JSX.Element {
	type Link = { to: string; label: string };
	type Links = {
		external_links: { href: string; label: string }[];
		links: Link[];
		not_auth_links: Link[];
		protected_links: Link[];
	};
	type Auth = {
		user: UserName;
		isAuth: IsAuthenticated;
	};

	const links: Links = {
		external_links: [{ href: "..", label: "Home" }],
		links: [
			{ to: "./", label: "Public" },
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
	const { user, isAuth } = useRouteLoaderData("root") as Auth;
	const fetcher = useFetcher();
	const isLoggingOut = fetcher.formData != null;
	const FeacherForm = fetcher.Form;

	return (
		<>
			<Navbar expand={"lg"} fixed={"top"} className={"bg-white _border-bottom shadow-sm"}>
				<Container fluid>
					<Navbar.Brand as={Link} to={".."}>
						React-Bootstrap
					</Navbar.Brand>
					<Navbar.Toggle aria-controls={"basic-navbar-nav"} />
					<Navbar.Collapse id={"basic-navbar-nav"}>
						<Nav className={"me-auto"}>
							{links.external_links.map((link, idx: number) => (
								<Nav.Link key={idx} href={link.href}>
									{link.label}
								</Nav.Link>
							))}
							{links.links.map((link, idx: number) => (
								<Nav.Link key={idx} as={NavLink} to={link.to}>
									{link.label}
								</Nav.Link>
							))}
							{isAuth && (
								<NavDropdown title={"Dropdown"} id={"basic-nav-dropdown"}>
									{links.protected_links.map((link, idx: number) => (
										<NavDropdown.Item key={idx} as={NavLink} to={link.to}>
											{link.label}
										</NavDropdown.Item>
									))}
								</NavDropdown>
							)}
						</Nav>

						{!isAuth ? (
							<Nav>
								{links.not_auth_links.map((link, idx: number) => (
									<Nav.Link key={idx} as={NavLink} to={link.to}>
										{link.label}
									</Nav.Link>
								))}
							</Nav>
						) : (
							<>
								<Navbar.Text className={"me-2"}>
									<i className={"bi bi-person-fill me-1"}></i>
									{user}
								</Navbar.Text>
								<Form as={FeacherForm} method={"post"} action={"/logout"}>
									<Button type={"submit"} variant={"outline-secondary"} disabled={isLoggingOut}>
										{isLoggingOut ? "Signing out..." : "Sign out"}
									</Button>
								</Form>
							</>
						)}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}
