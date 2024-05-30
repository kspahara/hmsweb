import { Outlet, ScrollRestoration } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ProgressNav } from "../components/progressNav.tsx";
import { Breadcrumbs } from "../components/breadcrumbs.tsx";
import { BtnReturnTop } from "../components/btnReturnTop.tsx";
import { useRootPage } from "../hooks/hooks.ts";
import { HeaderNavigation } from "../components/headerNavigation.tsx";
import { CartSummary } from "../components/hin/cartSummary.tsx";

/**
 * RootPage
 * @returns
 */
export function RootPage(): JSX.Element {
  const { allrightsReserved, cart_data } = useRootPage();

  return (
    <>
      <header id="header">
        <HeaderNavigation />
        <CartSummary data={cart_data} />
        <BtnReturnTop />
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
          <small className="text-muted">{allrightsReserved}</small>
        </div>
      </footer>
    </>
  );
}
