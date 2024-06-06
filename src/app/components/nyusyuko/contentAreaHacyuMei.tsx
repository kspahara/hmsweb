import { Suspense } from "react";
import { Await } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";
import { Fallback } from "../fallback.tsx";
import { AlertAsyncError } from "../alertAsyncError.tsx";

type Props = {
  data: Record<string, string>[];
  type: string;
};

/**
 *
 * @param props
 * @returns
 */
export function ContentAreaHacyuMei(props: Props): JSX.Element {
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
                <ListGroup variant="flush" numbered>
                  {data.map((item, index) => (
                    <ListGroup.Item key={index} className="d-flex">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{item.hin_cd}</div>
                        <div>{item.hin_nm}</div>
                        <div>{item.jan_cd}</div>
                        <div>{item.hacyu_su_s}</div>
                      </div>
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
                <div id="list-body">
                  {type === "list" ? contentLists : null}
                </div>
              </>
            );
          }}
        />
      }
    />
  );
}
