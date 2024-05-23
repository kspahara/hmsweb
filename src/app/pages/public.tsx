import { usePublicPage } from "../hooks/hooks.ts";

export function PublicPage(): JSX.Element {
  const { user, message } = usePublicPage();

  return (
    <>
      <section id={"public-page"}>
        <header>
          <h1>{message}</h1>
          <p>Welcome, {user || "guest"}!</p>
        </header>
        <hr />
        <section>
          <h2>{"Public Page"}</h2>
          <p>{"This is a public route."}</p>
        </section>
      </section>
    </>
  );
}
