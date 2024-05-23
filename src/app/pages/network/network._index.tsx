import {
  Link,
  Outlet,
  // , useLoaderData
} from "react-router-dom";
// import { ContentArea } from "../../components/contentArea.tsx";

export function NetworkPage() {
  // const { message, data, type } = useLoaderData();
  return (
    <>
      <section id={"protected-network-page"}>
        <header>
          {/* <h1 className={"h2"}>{message}</h1> */}
          <p>Protected Network</p>
          <div id={"search"}>
            <Link to={"bunrui"}>PC</Link>
            <br />
            <Link to={"printer"}>プリンター</Link>
          </div>
        </header>
        <hr />
        <Outlet />
        <section>
          <h2 className={"h3"}>{"Network List"}</h2>
          <div id={"content"}>{/* <ContentArea {...{ data, type }} /> */}</div>
        </section>
      </section>
    </>
  );
}
