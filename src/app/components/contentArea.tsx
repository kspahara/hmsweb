import { Suspense } from "react";
import {
  Await,
  Link,
  useAsyncError,
  useAsyncValue,
  //  useSubmit
} from "react-router-dom";
import { Alert, Card, ListGroup } from "react-bootstrap";
import { Fallback } from "./fallback.tsx";

type Props = {
  data: Record<string, string>[];
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
export function ContentArea(props: Props): JSX.Element {
  const { data, type } = props;

  return (
    <Suspense
      fallback={<Fallback />}
      children={
        <Await
          resolve={data}
          errorElement={<Error />}
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
