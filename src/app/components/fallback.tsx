import { Spinner } from "react-bootstrap";

/**
 *
 * @param props
 * @returns
 */
export function Fallback(props: { animation?: "border" | "grow" }): JSX.Element {
  return (
    <>
      <div id="fallback" className="text-center">
        <Spinner role="status" as="span" animation={props.animation} size="sm" variant="secondary" aria-hidden={true}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </>
  );
}
