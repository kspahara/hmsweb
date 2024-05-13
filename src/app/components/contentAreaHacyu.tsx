import { Suspense } from "react";
import {
  Await,
  Link,
  // Form as RouterForm,
  useAsyncError,
  useAsyncValue,
} from "react-router-dom";
import {
  Alert,
  // Badge,
  // Button,
  Card,
  // Col,
  // FloatingLabel,
  // Form,
  // InputGroup,
  ListGroup,
  // Row,
} from "react-bootstrap";
import { Fallback } from "./fallback.tsx";
// import { parseInttoStr } from "../libs/libs.ts";

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
export function ContentAreaHacyu(props: Props): JSX.Element {
  // const { data, user, noImage, type } = props;
  const { data } = props;

  console.log(data);

  return (
    <Suspense
      fallback={<Fallback />}
      children={
        <Await
          resolve={data}
          errorElement={<Error />}
          children={(data: Record<string, string>[][]) => {
            const contentLists_hacyu = (
              <Card className="shadow-sm mb-3">
                <ListGroup variant="flush">
                  {Object.entries(data).map(
                    ([date, items]: [string, unknown], index) => (
                      <Card key={index} className="_shadow-sm mb-3">
                        <Card.Header>{date}</Card.Header>
                        <ListGroup variant="flush">
                          {(items as Record<string, string>[]).map(
                            (
                              item: Record<string, string>,
                              itemIndex: number
                            ) => (
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
                            )
                          )}
                        </ListGroup>
                      </Card>
                    )
                  )}
                </ListGroup>
              </Card>
            );

            return (
              <>
                <div id="list-header" className="text-end mb-2">
                  <span className="me-1">count:</span>
                  <span>{data.length}</span>
                </div>
                <div id="list-body">{contentLists_hacyu}</div>
              </>
            );
          }}
        />
      }
    />
  );
}
