import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ButtonVariant } from "react-bootstrap/esm/types";

type BackBtnProps = {
  label?: string;
  variant?: ButtonVariant;
};

/**
 *
 * @param param0
 * @returns
 */
export function BackBtn({ label = "戻る", variant = "link" }: BackBtnProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <Button type="button" variant={variant} onClick={() => navigate(-1)}>
      <i className="bi bi-chevron-left me-1" />
      {label}
    </Button>
  );
}
