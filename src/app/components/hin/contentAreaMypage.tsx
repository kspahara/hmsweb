import { Fragment, Suspense } from "react";
import { Await } from "react-router-dom";
import { Badge, Button, Card, Col, Row, Table } from "react-bootstrap";
import { Fallback } from "../fallback.tsx";
import { AlertAsyncError } from "../alertAsyncError.tsx";
import { Field } from "../../routes/hin/_protected.mypage._index.tsx";

type Props = {
  data: Record<string, string>[];
  type?: string;
  fields: {
    header: Field[];
    detail: Field[];
  };
};

type Data = Record<string, string> & {
  details: Record<string, string>[];
};

type ContentListsHinProps = {
  data: Data[];
  fields: {
    header: Field[];
    detail: Field[];
  };
};

const ContentListsHin = ({ data, fields }: ContentListsHinProps): JSX.Element => (
  <>
    {Object.entries(data).map(([idx, item]) => (
      <Card key={idx} className="shadow-sm mb-3">
        <Card.Header className="d-flex align-items-center bg-transparent border-bottom-0">
          <div className="me-auto">
            <Badge bg="warning" text="dark" className="me-1">
              未
            </Badge>
          </div>
          <Button type="button" variant="primary" size="sm">
            <i className="bi bi-pencil-fill me-1" />
            編集
          </Button>
        </Card.Header>
        <Card.Body className="pb-0">
          <Row as="dl" xs={2} md={"auto"} className="card-text">
            {fields.header.map((field, idx) => (
              <Fragment key={idx}>
                <Col as="dt" className="text-nowrap text-md-end">
                  {field.label}
                </Col>
                <Col as="dd" className="card-text">
                  {field.format ? field.format(item[field.key]) : item[field.key]}
                </Col>
              </Fragment>
            ))}
          </Row>
        </Card.Body>
        <Card.Body>
          <Table className="card-text" responsive>
            <thead>
              <tr>
                {fields.detail.map((field, idx) => (
                  <th key={idx} className={`text-nowrap ${field.labelClass}`}>
                    {field.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {item.details.map((detail, detailIdx: number) => (
                <tr key={detailIdx}>
                  {fields.detail.map((field, fieldIdx) => (
                    <td key={`${detailIdx}-${fieldIdx}`} className={field.className}>
                      {field.format ? field.format(detail[field.key]) : detail[field.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    ))}
  </>
);

/**
 *
 * @param props
 * @returns
 */
export function ContentAreaMypage(props: Props): JSX.Element {
  const { data, type, fields } = props;
  const isTypeMypage = type === "mypage";

  return (
    <Suspense
      fallback={<Fallback />}
      children={
        <Await
          resolve={data}
          errorElement={<AlertAsyncError />}
          children={(data: Data[]) => {
            return (
              <>
                <div id="list-header" className="text-end mb-2">
                  <span className="me-1">count:</span>
                  <span>{data.length}</span>
                </div>
                <div id="list-body">{isTypeMypage && <ContentListsHin {...{ data, fields }} />}</div>
              </>
            );
          }}
        />
      }
    />
  );
}
