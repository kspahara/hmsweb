import { Alert } from "react-bootstrap";
import { AlertProps } from "react-bootstrap/esm/Alert";

type AlertMessageProps = AlertProps & {
  message: string;
  classes?: string;
};

/**
 * AlertMessage
 * @param props
 * @returns
 */
export function AlertMessage(props: AlertMessageProps): JSX.Element {
  const { message, variant, classes } = props;

  return (
    <Alert variant={variant} className={`${classes} text-center`}>
      {variant === "danger" ? (
        <i className="bi bi-exclamation-triangle me-1" />
      ) : variant === "warning" ? (
        <i className="bi bi-exclamation-circle me-1" />
      ) : (
        <i className="bi bi-check-circle me-1" />
      )}
      {message}
    </Alert>
  );
}
