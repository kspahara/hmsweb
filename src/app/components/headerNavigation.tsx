import { NavLink } from "react-router-dom";
import { Form, Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Fallback } from "./fallback.tsx";
import { useHeaderNavigation } from "../hooks/hooks.ts";

/**
 * HeaderNavigation
 * @returns
 */
export function HeaderNavigation(): JSX.Element {
  const { user, isAuth, links, isLoggingOut, FeacherForm, index_link } = useHeaderNavigation();

  const Contents = (): JSX.Element => {
    return (
      <>
        <Nav variant="underline" className="me-auto">
          {links
            .filter((link) => link.kbn === "public")
            .map((link, idx: number) => (
              <Nav.Link key={idx} as={NavLink} to={link.href}>
                {link.label}
              </Nav.Link>
            ))}
          {isAuth && (
            <NavDropdown title="Auth Links" id="nav-dropdown">
              <NavDropdown.Header>Links</NavDropdown.Header>
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
          <>
            <Nav variant="underline">
              {links
                .filter((link) => link.kbn === "not_auth_user")
                .map((link, idx: number) => (
                  <Nav.Link key={idx} as={NavLink} to={link.href}>
                    {link.label}
                    <i className="bi bi-arrow-right ms-1" />
                  </Nav.Link>
                ))}
            </Nav>
          </>
        ) : (
          <>
            <Nav variant="underline">
              <NavDropdown
                title={
                  <>
                    <i className="bi bi-person-fill me-1" />
                    {user}
                  </>
                }
                id="nav-dropdown"
              >
                <NavDropdown.Header>Menu</NavDropdown.Header>
                <NavDropdown.Item as={NavLink} to="/mypage">
                  Mypage
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Header>Account</NavDropdown.Header>
                <Form as={FeacherForm} method="post" action="/logout_user">
                  <NavDropdown.Item as="button" type="submit" disabled={isLoggingOut}>
                    {isLoggingOut ? (
                      <Fallback />
                    ) : (
                      <>
                        Sign out
                        <i className="bi bi-box-arrow-right ms-1"></i>
                      </>
                    )}
                  </NavDropdown.Item>
                </Form>
              </NavDropdown>
            </Nav>
          </>
        )}
      </>
    );
  };

  return (
    <>
      <Navbar expand="lg" fixed="top" bg="white" className="shadow-sm">
        <Container fluid>
          {index_link && <Navbar.Brand href={index_link.href}>{index_link.label}</Navbar.Brand>}
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">{true && <Contents />}</Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
