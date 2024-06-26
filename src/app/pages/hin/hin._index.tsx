import { ContentAreaHin } from "../../components/hin/contentAreaHin.tsx";
import { SearchArea } from "../../components/searchArea.tsx";
import { useHinIndexPage } from "../../hooks/hooks.ts";

/**
 * HinIndexPage
 * @returns
 */
export function HinIndexPage(): JSX.Element {
  const { isLoading, data, message, ...props } = useHinIndexPage();

  return (
    <>
      <section>
        <header>
          <h1 className="h2">{message}</h1>
          <p>商品の一覧を表示します。</p>
          <div id="hin-search-area" className="mb-3">
            <SearchArea {...{ ...props }} />
          </div>
        </header>
        <hr />
        <section id="hin-contents">
          <h2 className="h3 mb-3">商品一覧</h2>
          <div id="hin-contents-page" className={isLoading ? "loading" : ""}>
            <ContentAreaHin {...{ data }} />
          </div>
        </section>
      </section>
    </>
  );
}
