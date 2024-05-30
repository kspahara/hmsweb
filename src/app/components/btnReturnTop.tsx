import { Button } from "react-bootstrap";
import { useBtnReturnTop } from "../hooks/hooks";

/**
 * BtnReturnTop
 * @returns
 */
export function BtnReturnTop(): JSX.Element {
  const { scrollTop, isBtnActive } = useBtnReturnTop();

  return (
    <aside
      className={`fixed-bottom d-flex justify-content-center mb-3 ${isBtnActive ? "opacity-75" : "opacity-0"}`}
      style={{
        transition: "0.5s",
      }}
    >
      <Button variant="secondary" className="rounded-pill shadow-sm" onClick={scrollTop} aria-label="ページ上部へ戻る" disabled={!isBtnActive}>
        <i className="bi bi-arrow-up me-1" />
        TOP
      </Button>
    </aside>
  );
}
