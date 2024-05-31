import { useProtectedNyusyukoPage } from "../../hooks/hooks.ts";
// import { ContentArea } from "../../components/contentArea.tsx";
import { SearchArea } from "../../components/searchArea.tsx";
import { ContentAreaHacyu } from "../../components/nyusyuko/contentAreaHacyu.tsx";
// import { Card, ListGroup } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { ContentAreaHacyu } from "../../components/contentAreaHacyu.tsx";

/**
 * HinIndexPage
 * @returns
 */
export function ProtectedNyusyukoPage(): JSX.Element {
  const { searchies, forms, query, setQuery, submit, isSearching, isLoading, data, user, type, message } = useProtectedNyusyukoPage();

  // console.log(data);

  return (
    <>
      <section>
        <header>
          <h1 className="h2">{message}</h1>
          <p>入荷一覧を表示します。</p>
          <div id="hin-search-area" className="mb-3">
            <SearchArea
              {...{
                searchies,
                forms,
                query,
                setQuery,
                submit,
                isSearching,
              }}
            />
          </div>
        </header>
        <hr />

        <section id="hin-contents">
          <div id="hin-contents-page" className={isLoading ? "loading" : ""}>
            <ContentAreaHacyu {...{ data, user, type }} />
          </div>
        </section>
      </section>
    </>
  );
}
