import { Alert } from "react-bootstrap";
import { useAlertAsyncError } from "../hooks/hooks";

/**
 *
 * @returns
 */
export function AlertAsyncError(): JSX.Element {
  const { error, value } = useAlertAsyncError();
  console.log("AsyncError:", error);
  console.log("AsyncErrorvalue:", value);

  return (
    <Alert variant="danger" className="mb-0">
      <i className="bi bi-exclamation-triangle-fill me-1" />
      {error.name} : {error.message}
    </Alert>
  );
}
