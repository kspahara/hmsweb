import { useHinIndexPage } from "../../hooks/hooks.ts";
import { ContentAreaHin } from "../../components/contentAreaHin.tsx";
import { SearchArea } from "../../components/searchArea.tsx";

/**
 * HinIndexPage
 * @returns
 */
export function HinIndexPage(): JSX.Element {
  const { searchies, forms, query, setQuery, submit, isSearching, isLoading, data, user, noImage } = useHinIndexPage();

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
