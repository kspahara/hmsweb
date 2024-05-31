import { Fragment } from "react";
import { Form, Button, Col, Row, Image, FloatingLabel, InputGroup, Card } from "react-bootstrap";
import { BtnBack } from "../../components/btnBack.tsx";
import { useHinDetailPage } from "../../hooks/hooks.ts";

export function HinDetailPage(): JSX.Element {
  const { user, item, noImage, fields } = useHinDetailPage();
  const itemSrc = item.atch_flg === "1" ? `data:image/jpeg;base64,${item.atch_image}` : `${noImage}`;

  return (
    <>
      <section>
        <header>
          <h1 className="h2">商品詳細</h1>
          <p>商品の詳細を表示します。</p>
          <nav className="mb-2">
            <BtnBack label="商品一覧に戻る" />
          </nav>
        </header>
        <hr />
        <section id="hin-detail-contents">
          <h2 className="h4 mb-3">{item.hin_nm}</h2>
          <Card className="shadow-sm">
            <Card.Body>
              <Row>
                <Col sm={5} md={4} lg={3}>
                  <div className="mb-3">
                    <Image src={itemSrc} alt="image" fluid thumbnail />
                    {user && (
                      <Form>
                        <InputGroup>
                          <FloatingLabel controlId="suryo" label="数量">
                            <Form.Control type="number" placeholder="数量を入力してください" defaultValue={1} className="text-end" />
                          </FloatingLabel>
                          <Button type="button" variant="primary">
                            <i className="bi bi-cart-plus-fill me-1" />
                          </Button>
                        </InputGroup>
                      </Form>
                    )}
                  </div>
                </Col>
                <Col>
                  <Card.Title>{item.hin_nm}</Card.Title>
                  <Row as="dl">
                    {fields.detail.map((field, index) => (
                      <Fragment key={index}>
                        <Col as="dt" md={3} className="text-sm-end">
                          {field.label}
                        </Col>
                        <Col as="dd" md={9} className={`${field.className}`}>
                          {item[field.key] ? (field.format ? field.format(item[field.key]) : item[field.key]) : "-"}
                        </Col>
                      </Fragment>
                    ))}
                  </Row>
                </Col>
              </Row>
            </Card.Body>
            {item.biko1 && (
              <Card.Body>
                <section>
                  <h2 className="h4 border-bottom border-secondary">商品詳細</h2>
                  <p>{item.biko1}</p>
                </section>
              </Card.Body>
            )}
          </Card>
        </section>
      </section>
    </>
  );
}
