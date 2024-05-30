import { Spinner } from "react-bootstrap";
import { SpinnerProps } from "react-bootstrap/esm/Spinner";

/**
 *
 * @param props
 * @returns
 */
export function Fallback(props: SpinnerProps): JSX.Element {
  return (
    <>
      <div id="fallback" className="text-center">
        <Spinner role="status" as="span" animation={props.animation} size={props.size ? props.size : "sm"} variant={props.variant ? props.variant : "secondary"} aria-hidden={true}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </>
  );
}
