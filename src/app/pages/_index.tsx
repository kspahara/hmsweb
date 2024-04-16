import { NavLink, Outlet, ScrollRestoration } from "react-router-dom";
import { Button, Form, Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { ProgressNav } from "../components/progressNav.tsx";
import { Breadcrumbs } from "../components/breadcrumbs.tsx";
import { ReturnTopBtn } from "../components/returnTopBtn.tsx";
import { useRootPage } from "../hooks/hooks.ts";

/**
 * HeaderNavigation
 * @returns
 */
function HeaderNavigation(): JSX.Element {
	const { user, isAuth, links, isLoggingOut, FeacherForm, index_link } = useRootPage();

	return (
		<>
			<Navbar expand="lg" fixed="top" className="bg-white shadow-sm">
				<Container fluid>
					{index_link && (
						<Navbar.Brand as={NavLink} to={index_link.href}>
							{index_link.label}
						</Navbar.Brand>
					)}
					<Navbar.Toggle aria-controls="navbar-nav" />
					<Navbar.Collapse id="navbar-nav">
						<Nav className="me-auto">
							{links
								.filter((link) => link.kbn === "public")
								.map((link, idx: number) => (
									<Nav.Link key={idx} as={NavLink} to={link.href}>
										{link.label}
									</Nav.Link>
								))}
							{isAuth && (
								<NavDropdown title="Dropdown" id="nav-dropdown">
									{links
										.filter((link) => link.kbn === "auth")
										.map((link, idx: number) => (
											<NavDropdown.Item key={idx} as={NavLink} to={link.href}>
												{link.label}
											</NavDropdown.Item>
										))}
								</NavDropdown>
							)}
						</Nav>
						{/* 右側 */}
						{!isAuth ? (
							<Nav>
								{links
									.filter((link) => link.kbn === "not_auth")
									.map((link, idx: number) => (
										<Nav.Link key={idx} as={NavLink} to={link.href}>
											{link.label}
										</Nav.Link>
									))}
							</Nav>
						) : (
							<>
								<Navbar.Text className="me-2">
									<i className="bi bi-person-fill me-1" />
									{user}
								</Navbar.Text>
								<Form as={FeacherForm} method="post" action="/logout">
									<Button type="submit" variant="outline-secondary" disabled={isLoggingOut}>
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
 * RootPage
 * @returns
 */
export function RootPage(): JSX.Element {
	const { allrightsreserved } = useRootPage();

	return (
		<>
			<header id="header">
				<HeaderNavigation />
				<ReturnTopBtn />
				<ProgressNav />
			</header>
			<main id="main" style={{ minHeight: "calc(100vh - 4rem)", paddingTop: "5rem" }}>
				<Container>
					<Breadcrumbs />
					<Outlet />
					<ScrollRestoration />
				</Container>
			</main>
			<footer>
				<hr />
				<div className="text-center mb-3">
					<small className="text-muted">{allrightsreserved}</small>
				</div>
			</footer>
		</>
	);
}
