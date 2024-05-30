import { SearchArea } from "../../components/searchArea.tsx";
import { ContentAreaHin } from "../../components/hin/contentAreaHin.tsx";
import { useProtectedMypageAdminPage } from "../../hooks/hooks.ts";
import { Form as RouterForm } from "react-router-dom";
import { Form } from "react-bootstrap";

/**
 *
 * @returns
 */
export function ProtectedMypageAdminPage(): JSX.Element {
  const { data, type, message, ...props } = useProtectedMypageAdminPage();

  return (
    <>
      <section id="protected-alubums-page">
        <header>
          <h1 className="h2">{message}</h1>
          <p>Protected Mypage Admin</p>
          <div id="search">
            <SearchArea {...props} />
          </div>
        </header>
        <hr />
        <section>
          <h2 className="h3">Mypage Admin</h2>
          <div id="content">
            <Form as={RouterForm} method="post">
              <ContentAreaHin {...{ data, type }} />
            </Form>
          </div>
        </section>
      </section>
    </>
  );
}
