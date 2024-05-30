import { Suspense } from "react";
import { Await } from "react-router-dom";
import { Badge } from "react-bootstrap";
import { parseInttoStr } from "../../libs/libs";
import { AlertAsyncError } from "../alertAsyncError";
import { Fallback } from "../fallback";
import { Link } from "react-router-dom";

export type CartSummaryProps = {
  head: {
    detail_count: string;
    zeinuki_gaku: string;
  };
};

export function CartSummary(props: { data: CartSummaryProps }): JSX.Element {
  const { data } = props;

  return (
    <>
      {data && (
        <nav style={{ position: "fixed", top: "5rem", right: "1rem", zIndex: 1000 }}>
          <Suspense
            fallback={<Fallback />}
            children={
              <Await
                resolve={data}
                errorElement={<AlertAsyncError />}
                children={(data: CartSummaryProps) => (
                  <Link to="/cart">
                    <span className="rounded p-2 bg-info text-dark">
                      <i className="bi bi-cart-fill"></i>
                      <Badge bg="warning" text="dark" className="mx-1">
                        {data.head.detail_count}
                      </Badge>
                      &yen;{parseInttoStr(data.head.zeinuki_gaku)}
                    </span>
                  </Link>
                )}
              />
            }
          />
        </nav>
      )}
    </>
  );
}
