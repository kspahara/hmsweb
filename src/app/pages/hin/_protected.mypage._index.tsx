import { SearchArea } from "../../components/searchArea.tsx";
import { ContentArea } from "../../components/contentArea.tsx";
import { useProtectedMypagePage } from "../../hooks/hooks.ts";
import { Outlet, Form as RouterForm } from "react-router-dom";
import { authProvider } from "../../provides/auth.ts";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

/**
 *
 * @returns
 */
export function ProtectedMypagePage(): JSX.Element {
  const { data, type, message, ...props } = useProtectedMypagePage();

  return (
    <>
      <section id="protected-alubums-page">
        <header>
          <div className="alert alert-info">
            tok_cd: {authProvider.tok_cd}
            <Form as={RouterForm} action="/remove_tok_cd" method="post" className="d-inline-block">
              <Button type="submit" size="sm" name="tok_cd" variant="info" className=" ms-2">
                切替
                <i className="bi bi-arrow-repeat ms-1" />
              </Button>
            </Form>
          </div>
          <h1 className="h2">{message}</h1>
          <p>Protected Mypage</p>
          <div id="search">
            <SearchArea {...props} />
          </div>
        </header>
        <hr />
        <section>
          <h2 className="h3">Mypage</h2>
          <div id="content">
            <ContentArea {...{ data, type }} />
          </div>
        </section>
        <Outlet />
      </section>
    </>
  );
}
