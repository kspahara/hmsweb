import { useProtectedNyusyukoPage } from "../../hooks/hooks.ts";
import { ContentArea } from "../../components/contentArea.tsx";
import { SearchArea } from "../../components/searchArea.tsx";
import { Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

/**
 * HinIndexPage
 * @returns
 */
export function ProtectedNyusyukoPage(): JSX.Element {
  const {
    searchies,
    forms,
    query,
    setQuery,
    submit,
    isSearching,
    isLoading,
    data,
    user,
    type,
  } = useProtectedNyusyukoPage();

//   console.log(data);

  return (
    <>
      <section>
        <header>
          <h1 className="h2">入荷一覧画面</h1>
          <p>入荷一覧を表示します。</p>
          <div id="hin-search-area" className="mb-3">
            <SearchArea
              {...{ searchies, forms, query, setQuery, submit, isSearching }}
            />
          </div>
        </header>
        <hr />

        {/* <section id="hin-contents">
          <h2 className="h3 mb-3">入荷一覧</h2>
          <div id="hin-contents-page" className={isLoading ? "loading" : ""}>
            {Object.entries(data).map(
              ([date, items]: [string, unknown], index) => (
                <Card key={index} className="shadow-sm mb-3">
                  <Card.Header>{date}</Card.Header>
                  <ListGroup variant="flush">
                    {(items as Record<string, string>[]).map(
                      (item: Record<string, string>, itemIndex: number) => (
                        <ListGroup.Item
                          key={itemIndex}
                          as={Link}
                          to={`${item.den_no}`}
                          className="d-flex"
                          action
                        >
                          <span>{item.den_no}</span>
                          <i className="bi bi-chevron-right ms-auto" />
                        </ListGroup.Item>
                      )
                    )}
                  </ListGroup>
                </Card>
              )
            )}
          </div>
        </section> */}

        <section id="hin-contents">
          <h2 className="h3 mb-3">商品一覧</h2>
          <div id="hin-contents-page" className={isLoading ? "loading" : ""}>
            <ContentArea {...{ data, user, type }} />
          </div>
        </section>


      </section>
    </>
  );
}
