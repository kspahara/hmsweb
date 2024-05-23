import { Suspense } from "react";
import { Await, NavLink, Outlet, ScrollRestoration, useAsyncError, useAsyncValue } from "react-router-dom";
import { Button, Form, Container, Navbar, Nav, NavDropdown, Alert } from "react-bootstrap";
import { ProgressNav } from "../components/progressNav.tsx";
import { Breadcrumbs } from "../components/breadcrumbs.tsx";
import { ReturnTopBtn } from "../components/returnTopBtn.tsx";
import { CartSummary } from "../components/CartSummary.tsx";
import { Fallback } from "../components/fallback.tsx";
import { useRootPage } from "../hooks/hooks.ts";

const Error = () => {
  const error = useAsyncError() as Error;
  const value = useAsyncValue();
  console.log("error", error);
  console.log("value", value);

  return (
    <Alert variant="danger">
      <i className="bi bi-exclamation-triangle-fill me-1" />
      {error.name} : {error.message}
    </Alert>
  );
};

/**
 * HeaderNavigation
 * @returns
 */
function HeaderNavigation(): JSX.Element {
  const { user, isAuth, links, isLoggingOut, FeacherForm, index_link, cart_data } = useRootPage();

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
            <Nav variant="underline" className="me-auto">
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
              <Nav variant="underline">
                {links
                  .filter((link) => link.kbn === "not_auth")
                  .map((link, idx: number) => (
                    <Nav.Link key={idx} as={NavLink} to={link.href}>
                      {link.label}
                      <i className="bi bi-arrow-right ms-1" />
                    </Nav.Link>
                  ))}
                {links
                  .filter((link) => link.kbn === "not_auth_user")
                  .map((link, idx: number) => (
                    <Nav.Link key={idx} as={NavLink} to={link.href}>
                      {link.label}
                      <i className="bi bi-arrow-right ms-1" />
                    </Nav.Link>
                  ))}
              </Nav>
            ) : (
              <>
                <Navbar.Text className="me-2">
                  <i className="bi bi-person-fill me-1" />
                  {user}
                </Navbar.Text>
                <Nav variant="underline" className="me-2">
                  <Nav.Link as={NavLink} to={"/cart"}>
                    <Suspense
                      fallback={<Fallback />}
                      children={<Await resolve={cart_data} errorElement={<Error />} children={(cart_data) => <CartSummary data={cart_data} />} />}
                    />
                  </Nav.Link>
                  <Nav.Link as={NavLink} to={"/mypage"}>
                    Mypage
                  </Nav.Link>
                </Nav>
                <Form as={FeacherForm} method="post" action="/logout">
                  <Button type="submit" variant="outline-secondary" disabled={isLoggingOut}>
                    {isLoggingOut ? "Signing out..." : "Sign out"}
                  </Button>
                </Form>
                <Form as={FeacherForm} method="post" action="/logout_user">
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
