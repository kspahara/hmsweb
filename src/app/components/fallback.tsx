import { Spinner } from "react-bootstrap";

type FallbackProps = {
  animation?: "border" | "grow";
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
};

/**
 *
 * @param props
 * @returns
 */
export function Fallback(props: FallbackProps): JSX.Element {
  return (
    <>
      <div id="fallback" className="text-center">
        <Spinner role="status" as="span" animation={props.animation} size="sm" variant={props.variant ? props.variant : "secondary"} aria-hidden={true}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </>
  );
}
