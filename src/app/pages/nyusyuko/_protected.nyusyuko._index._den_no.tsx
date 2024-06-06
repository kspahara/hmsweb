import { Form as RouterForm } from "react-router-dom";
// import { ContentArea } from "../../components/contentArea.tsx";
// import { SearchArea } from "../../components/searchArea.tsx";

import { useProtectedNyusyukoDenPage } from "../../hooks/hooks.ts";
import { Button, FloatingLabel, Form, Tab, Tabs } from "react-bootstrap";
import { ContentAreaHacyuMei } from "../../components/nyusyuko/contentAreaHacyuMei.tsx";

/**
 * nyusyuko_den_noPage
 * @returns
 */
export function ProtectedNyusyukoDenPage(): JSX.Element {
  const {
    // searchies,
    // forms,
    // query,
    // setQuery,
    // submit,
    // isSearching,
    isLoading,
    data,
    user,
    type,
    message,
  } = useProtectedNyusyukoDenPage();

  return (
    <>
      <section>
        <header>
          <h1 className="h2">{message}</h1>
          <p>発注明細一覧を表示します。</p>
          <div id="nyusyuko-den-contents-area" className="mb-3"></div>
        </header>
        <hr />

        <section id="nyusyuko-den-contents">
          <div
            id="nyusyuko-den-contents"
            className={isLoading ? "loading" : ""}
          >
            <Tabs
              defaultActiveKey="home"
              id="justify-tab-example"
              className="mb-3"
              justify
            >
              <Tab eventKey="home" title="仕入未">
                <Form as={RouterForm} method="post">
                  <FloatingLabel
                    controlId="jan_cd"
                    label="JANコード"
                    className="mb-3"
                  >
                    <Form.Control
                      name="jan_cd"
                      type="search"
                      placeholder="JANコード"
                      // pattern="^[a-zA-Z0-9]+$"
                      required
                    />
                  </FloatingLabel>

                  <Button type="submit" className="mb-3">
                    Submit
                  </Button>
                </Form>

                <ContentAreaHacyuMei {...{ data: data.dataM, user, type }} />
              </Tab>
              <Tab eventKey="profile" title="仕入済">
                <ContentAreaHacyuMei {...{ data: data.dataS, user, type }} />
              </Tab>
            </Tabs>
          </div>
        </section>
      </section>
    </>
  );
}
