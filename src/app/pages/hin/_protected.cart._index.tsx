import { Card, FloatingLabel, Form, ListGroup, Button, Alert } from "react-bootstrap";
import { useProtectedCartPage } from "../../hooks/hooks.ts";
import { parseInttoStr } from "../../libs/libs.ts";

/**
 *
 * @returns
 */
export function ProtectedCartPage(): JSX.Element {
  const { data, message, FeacherForm } = useProtectedCartPage();

  return (
    <>
      <section id="protected-alubums-page">
        <header>
          <h1 className="h2">{message}</h1>
          <p>Protected Cart</p>
        </header>
        <hr />
        <section>
          <h2 className="h3">Cart</h2>
          <div id="content">
            <div className="row">
              <div className="col-sm">
                <Card className="shadow-sm mb-3">
                  <ListGroup variant="flush">
                    {data.details.length === 0 ? (
                      <ListGroup.Item>
                        <Alert variant="warning" className="mb-0">
                          <i className="bi bi-exclamation-triangle me-1"></i>
                          カートに商品がありません。
                        </Alert>
                      </ListGroup.Item>
                    ) : (
                      data.details.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <dl>
                            <dt>row_no</dt>
                            <dd>{item.row_no}</dd>
                            <dt>disc_per</dt>
                            <dd>{item.disc_per}</dd>
                            <dt>hin_cd</dt>
                            <dd>{item.hin_cd}</dd>
                            <dt>hin_nm</dt>
                            <dd>{item.hin_nm}</dd>
                            <dt>htanka</dt>
                            <dd>{item.htanka}</dd>
                            <dt>kingaku</dt>
                            <dd>{item.kingaku}</dd>
                            <FloatingLabel controlId={`suryo${index}`} label="数量">
                              <Form.Control
                                type="number"
                                name="suryo"
                                placeholder="数量を入力してください"
                                defaultValue={parseInt(item.suryo).toLocaleString()}
                                className="text-end"
                              />
                            </FloatingLabel>
                            <dt>tanka</dt>
                            <dd>{item.tanka}</dd>
                            <dt>zei_kbn</dt>
                            <dd>{item.zei_kbn}</dd>
                            <dt>zei_rate</dt>
                            <dd>{item.zei_rate}</dd>
                          </dl>
                          <Form as={FeacherForm} method="post" name="form_cart">
                            <Button type="submit" name="row_no" value={item.row_no} variant="danger">
                              <i className="bi bi-trash me-1"></i>
                              削除
                            </Button>
                          </Form>
                        </ListGroup.Item>
                      ))
                    )}
                  </ListGroup>
                </Card>
              </div>
              <div className="col-sm-3">
                <Card body className="shadow-sm mb-3">
                  <Card.Text as={"dl"}>
                    <dt>zeinuki_gaku</dt>
                    <dd>&yen;{parseInttoStr(data.head.zeinuki_gaku)}</dd>
                  </Card.Text>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
