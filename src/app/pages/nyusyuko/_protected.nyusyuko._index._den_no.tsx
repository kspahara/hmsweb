import { ContentAreaTest } from "../../components/contentAreaTest.tsx";
import { useProtectedNyusyukoDenPage } from "../../hooks/hooks.ts";
// import { SearchArea } from "../../components/searchArea.tsx";
import { Button, Form, ListGroup, Tab, Tabs } from "react-bootstrap";
// import { ContentArea } from "../../components/contentArea.tsx";
// import { ContentAreaTest } from "../../components/contentAreaTest.tsx";
// import { ContentArea } from "../../components/contentArea.tsx";
// import { ContentAreaTest } from "../../components/contentAreaTest.tsx";

/**
 * HinIndexPage
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
    // dataS,
    user,
    type,
    message,
  } = useProtectedNyusyukoDenPage();

  console.log("page", data);

  // const dataM = data.dataM;
  // console.log(dataM);

  return (
    <>
      <section>
        <header>
          <h1 className="h2">{message}</h1>
          <p>明細一覧を表示します。</p>
          <div id="hin-search-area" className="mb-3"></div>
        </header>
        <hr />

        <section id="hin-contents">
          <div id="hin-contents-page" className={isLoading ? "loading" : ""}>
            <Tabs
              defaultActiveKey="home"
              id="justify-tab-example"
              className="mb-3"
              justify
            >
              <Tab eventKey="home" title="仕入未">
                <Form method="post">
                  {/* <SearchArea
                    {...{
                      searchies,
                      forms,
                      query,
                      setQuery,
                      submit,
                      isSearching,
                    }}
                  /> */}

                  {/* <Form.Group className="mb-3" controlId="loginid">
                  <Form.Label>JANコード</Form.Label>
                  <Form.Control
                    name="jan_cd"
                    id="jan_cd"
                    type="search"
                    placeholder="JANコード"
                    pattern="^[a-zA-Z0-9]+$"
                  />
                </Form.Group> */}

                  <Button type="submit" className="mb-3">
                    新規登録
                  </Button>
                </Form>

                <ContentAreaTest
                  {...{ data: data.results.hacyuzan_lists_mi, user, type }}
                />

                {/* <ListGroup as="ol" numbered>
                  {data.results.hacyuzan_lists_mi.map((item, idx) => (
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                      key={idx}
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{item.hin_nm}</div>
                        <div>{item.hin_nm}</div>
                        <div>{item.jan_cd}</div>
                        <div>{item.hacyu_su_s}</div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup> */}
              </Tab>
              <Tab eventKey="profile" title="仕入済">
                {/* <ListGroup as="ol" numbered>
                  {data.results.hacyuzan_lists_sumi.map((item, idx) => (
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                      key={idx}
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{item.hin_nm}</div>
                        <div>{item.hin_nm}</div>
                        <div>{item.jan_cd}</div>
                        <div>{item.hacyu_su_s}</div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup> */}
                <ContentAreaTest
                  {...{ data: data.results.hacyuzan_lists_sumi, user, type }}
                />
              </Tab>
            </Tabs>

            {/* <ContentAreaHacyu {...{ data, user, type }} /> */}
          </div>
        </section>
      </section>
    </>
  );
}
