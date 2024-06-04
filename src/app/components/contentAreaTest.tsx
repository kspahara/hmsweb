import { Suspense } from "react";
import { Await, Link } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";
import { Fallback } from "./fallback.tsx";
import { AlertAsyncError } from "./alertAsyncError.tsx";

type Props = {
  data: Record<string, string>[];
  // data: Record<string, Record<string, string>[]>;

  type: string;
};
export function ContentAreaTest(props: Props): JSX.Element {
  const { data, type } = props;

  console.log('content',data);
  return (
    <Suspense
      fallback={<Fallback />}
      children={
        <Await
          resolve={data}
          errorElement={<AlertAsyncError />}
          children={(data: any) => {
            const contentLists = (
              <Card className="shadow-sm mb-3">
                <ListGroup variant="flush">
                  {data.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      className="d-flex"
                      action
                    >
                      {item.hin_nm}
                      {item.jan_cd}
                      <span className="mx-1">:</span>
                      <Link to={`${item.jan_cd}`}>
                        <i className="bi bi-chevron-right ms-auto" />
                      </Link>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                aaaa
              </Card>
            );

            return (
              <>
                <div id="list-header" className="text-end mb-2">
                  <span className="me-1">count:</span>
                  <span>{data.length}</span>
                </div>
                <div id="list-body">
                  {contentLists}
                  {/* {type === "list" ? contentLists : null} */}
                </div>
              </>
            );
          }}
        />
      }
    />
  );
}
