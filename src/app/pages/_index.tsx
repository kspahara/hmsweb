import { Fragment } from "react";
import { Link, NavLink, Outlet, ScrollRestoration } from "react-router-dom";
import { Button, Form, Container, Navbar, Nav, NavDropdown, Breadcrumb } from "react-bootstrap";
import { useRootPage } from "../hooks/hooks.ts";
import { ProgressNav } from "../components/ProgressNav.tsx";

/**
 * HeaderNavigation
 * @returns {JSX.Element}
 */
function HeaderNavigation(): JSX.Element {
	const { user, isAuth, links, isLoggingOut, FeacherForm } = useRootPage();

	return (
		<>
			<Navbar expand={"lg"} fixed={"top"} className={"bg-white shadow-sm"}>
				<Container fluid>
					<Navbar.Brand as={Link} to={".."}>
						Template-App
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

/**
 * ReturnTopBtn
 * @returns {JSX.Element}
 */
const ReturnTopBtn = (): JSX.Element => {
	const { isBtnActive } = useRootPage();

	return (
		<>
			<aside
				className={"fixed-bottom d-flex justify-content-center mb-3"}
				style={{
					opacity: isBtnActive ? 0.9 : 0,
					transition: "0.5s",
				}}
			>
				<Button variant={"secondary"} className={"rounded-pill shadow-sm"} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label={"ページ上部へ戻る"}>
					<i className={"bi bi-arrow-up me-1"}></i>TOP
				</Button>
			</aside>
		</>
	);
};

/**
 * Breadcrumbs
 * @returns {JSX.Element}
 */
function Breadcrumbs(): JSX.Element {
	const { matches } = useRootPage();

	return (
		<>
			<Breadcrumb>
				{matches
					.filter((match) => match.handle && match.handle.crumb)
					.map((match, index) => (
						<Fragment key={index}>{match.handle.crumb(match)}</Fragment>
					))}
			</Breadcrumb>
		</>
	);
}

/**
 * RootPage
 * @returns {JSX.Element}
 */
export function RootPage(): JSX.Element {
	return (
		<>
			<header id={"header"}>
				<HeaderNavigation />
				<ReturnTopBtn />
				<ProgressNav />
			</header>
			<main id={"main"} style={{ minHeight: "calc(100vh - 4rem)", paddingTop: "5rem" }}>
				<Container>
					<Breadcrumbs />
					<Outlet />
					<ScrollRestoration />
				</Container>
			</main>
			<footer>
				<hr />
				<p className={"text-center"}>
					<small className="text-muted">{"© " + new Date().getFullYear() + " - All rights reserved"}</small>
				</p>
			</footer>
		</>
	);
}
