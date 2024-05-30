import { Card, ListGroup, Row, Col } from "react-bootstrap";
import { useProtectedMypageDenNoPage } from "../../hooks/hooks.ts";
import { BackBtn } from "../../components/backBtn.tsx";
import { parseInttoStr } from "../../libs/libs.ts";
import { Fragment } from "react/jsx-runtime";

export function ProtectedMypageDenNoPage(): JSX.Element {
  const { data, message } = useProtectedMypageDenNoPage();
  const fields_head = [
    { label: "den_no", key: "den_no" },
    { label: "den_no_view", key: "den_no_view" },
    { label: "syori_ymd", key: "syori_ymd" },
    { label: "tok_cd", key: "tok_cd" },
    { label: "tok_nm", key: "tok_nm" },
    { label: "tor_kbn_key", key: "tor_kbn_key" },
    { label: "tor_kbn", key: "tor_kbn" },
  ];
  const fields_detail = [
    { label: "row_no", key: "row_no" },
    { label: "hin_cd", key: "hin_cd" },
    { label: "hin_nm", key: "hin_nm" },
    { label: "suryo", key: "suryo" },
    { label: "tanka", key: "tanka", format: (value: string) => `¥${parseInttoStr(value)}` },
    { label: "kingaku", key: "kingaku", format: (value: string) => `¥${parseInttoStr(value)}` },
  ];

  return (
    <>
      <section>
        <header>
          <h1 className="h2">{message}</h1>
          <nav className="mb-3">
            <BackBtn label="Back" />
          </nav>
        </header>
        <hr />
        <section>
          <h2 className="h3">{data.details[0].den_no}</h2>
          <Card body className="shadow-sm mb-3">
            <Card.Text as="dl">
              <Row as="dl" className="mb-0">
                {fields_head.map((field, idx) => (
                  <Fragment key={idx}>
                    <Col as="dt" md={3} className="text-md-end">
                      {field.label}
                    </Col>
                    <Col as="dd" md={9}>
                      {data.details[0][field.key]}
                    </Col>
                  </Fragment>
                ))}
              </Row>
            </Card.Text>
          </Card>
          <Card className="shadow-sm mb-3">
            <ListGroup variant="flush">
              {data.details.map((detail, index) => (
                <ListGroup.Item key={index}>
                  <Row as="dl" className="mb-0">
                    {fields_detail.map((field, idx) => (
                      <Fragment key={idx}>
                        <Col as="dt" md={3} className="text-md-end">
                          {field.label}
                        </Col>
                        <Col as="dd" md={9}>
                          {detail[field.key] ? (field.format ? field.format(detail[field.key]) : detail[field.key]) : "-"}
                        </Col>
                      </Fragment>
                    ))}
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </section>
      </section>
    </>
  );
}
