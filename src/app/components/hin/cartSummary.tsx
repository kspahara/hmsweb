import { Badge } from "react-bootstrap";
import { parseInttoStr } from "../../libs/libs";

export type CartSummaryProps = {
  head: {
    detail_count: string;
    zeinuki_gaku: string;
  };
};

export function CartSummary(props: { data: CartSummaryProps }): JSX.Element {
  const { data } = props;
  // console.log("CartSummary", data.head);

  return (
    <>
      {data && data.head && (
        <span className="rounded p-1 bg-info text-dark">
          <i className="bi bi-cart-fill"></i>
          <Badge bg="warning" text="dark" className="mx-1">
            {data.head.detail_count}
          </Badge>
          &yen;{parseInttoStr(data.head.zeinuki_gaku)}
        </span>
      )}
    </>
  );
}
