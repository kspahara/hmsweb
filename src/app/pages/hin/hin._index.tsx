import { Suspense } from "react";
import { Await, NavLink, useAsyncError, useAsyncValue } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { ContentAreaHin } from "../../components/hin/contentAreaHin.tsx";
import { SearchArea } from "../../components/searchArea.tsx";
import { Fallback } from "../../components/fallback.tsx";
import { CartSummary } from "../../components/hin/cartSummary.tsx";
import { useHinIndexPage } from "../../hooks/hooks.ts";

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
 * HinIndexPage
 * @returns
 */
export function HinIndexPage(): JSX.Element {
  const { searchies, forms, query, setQuery, submit, isSearching, isLoading, data, user, noImage, cart_data } = useHinIndexPage();

  // console.log(data);
  return (
    <>
      <section>
        <header>
          <h1 className="h2">商品案内</h1>
          <p>商品の一覧を表示します。</p>
          <div id="hin-search-area" className="mb-3">
            <SearchArea {...{ searchies, forms, query, setQuery, submit, isSearching }} />
          </div>
          <NavLink to="/cart">
            <Suspense fallback={<Fallback />} children={<Await resolve={cart_data} errorElement={<Error />} children={(cart_data) => <CartSummary data={cart_data} />} />} />
          </NavLink>
        </header>
        <hr />
        <section id="hin-contents">
          <h2 className="h3 mb-3">商品一覧</h2>
          <div id="hin-contents-page" className={isLoading ? "loading" : ""}>
            <ContentAreaHin {...{ data, user, noImage }} />
          </div>
        </section>
      </section>
    </>
  );
}
