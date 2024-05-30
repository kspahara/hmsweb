import { Suspense } from "react";
import { Await, Link, useAsyncError, useAsyncValue } from "react-router-dom";
import { Alert, Card, ListGroup } from "react-bootstrap";
import { Fallback } from "./fallback.tsx";

type Props = {
  // data: Record<string, Item[]>;
  data: Record<string, Record<string, string>[]>;
  user?: string | null;
  noImage?: string;
  type?: string;
};

const Error = () => {
  const error = useAsyncError() as Error;
  const value = useAsyncValue();
  console.log("error", error);
  console.log("value", value);

  return (
    <Alert variant="danger">
      <i className="bi bi-exclamation-triangle-fill me-1" />
      {error.name} : {error.message}
    </Alert>
  );
};

/**
 *
 * @param props
 * @returns
 */
export function ContentAreaHacyu(props: Props): JSX.Element {
  const { data } = props;

  return (
    <Suspense fallback={<Fallback />}>
      <Await resolve={Promise.resolve(data)} errorElement={<Error />}>
        {(resolvedData: Record<string, Record<string, string>[]>) => {
          const hacyu_list = Object.entries(resolvedData);
          console.log("hacyu_list", hacyu_list);

          const contentLists_hacyu = hacyu_list.map(([date, items], index) => (
            <Card key={index} className="shadow-sm mb-3">
              <Card.Header>{date}</Card.Header>
              <ListGroup variant="flush">
                {items.map((item, itemIndex) => (
                  <ListGroup.Item
                    key={itemIndex}
                    as={Link}
                    to={`${item.den_no}`}
                    className="d-flex"
                    action
                  >
                    <span>{item.den_no}</span>
                    <i className="bi bi-chevron-right ms-auto" />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          ));

          return (
            <>
              <div id="list-header" className="text-end mb-2">
                <span className="me-1">count:</span>
                <span>{hacyu_list.length}</span>
              </div>
              <div id="list-body">{contentLists_hacyu}</div>
            </>
          );
        }}
      </Await>
    </Suspense>
  );
}
