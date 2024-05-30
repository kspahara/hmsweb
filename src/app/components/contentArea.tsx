import { Suspense } from "react";
import { Await, Link } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";
import { Fallback } from "./fallback.tsx";
import { AlertAsyncError } from "./alertAsyncError.tsx";

type Props = {
  data: Record<string, string>[];
  type: string;
};

/**
 *
 * @param props
 * @returns
 */
export function ContentArea(props: Props): JSX.Element {
  const { data, type } = props;

  return (
    <Suspense
      fallback={<Fallback />}
      children={
        <Await
          resolve={data}
          errorElement={<AlertAsyncError />}
          children={(data: Record<string, string>[]) => {
            const contentLists = (
              <Card className="shadow-sm mb-3">
                <ListGroup variant="flush">
                  {data.map((item, index) => (
                    <ListGroup.Item key={index} as={Link} to={`${item.id}`} className="d-flex" action>
                      {item.id}
                      <span className="mx-1">:</span>
                      {item.title}
                      <i className="bi bi-chevron-right ms-auto" />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            );

            return (
              <>
                <div id="list-header" className="text-end mb-2">
                  <span className="me-1">count:</span>
                  <span>{data.length}</span>
                </div>
                <div id="list-body">{type === "list" ? contentLists : null}</div>
              </>
            );
          }}
        />
      }
    />
  );
}
