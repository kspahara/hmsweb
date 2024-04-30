import { useLoaderData} from "react-router-dom"
export function NetWorkIdPage () {
    const {message} =useLoaderData()

    return (<>
    {message}
    
      <section id={"protected-network-detail-page"}>
        <header>
          <h1 className={"h2"}>{message}</h1>
          <p>Protected Network Detail</p>
          <div id={"search"}>
          </div>
        </header>
        <hr />
        <section>
          <h2 className={"h3"}>{"Network Detail"}</h2>
          <div id={"content"}>
            {/* <ContentArea {...{ data, type }} /> */}
          </div>
        </section>
      </section>
    </>)
}