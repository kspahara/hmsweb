import { NavLink, Form as RouterForm, useLocation, useSubmit } from "react-router-dom";
import { Card, FloatingLabel, Form, ListGroup, Button, Nav, Col, Row } from "react-bootstrap";
import { useProtectedCartPage } from "../../hooks/hooks.ts";
import { parseInttoStr } from "../../libs/libs.ts";
import { BtnBack } from "../../components/btnBack.tsx";
import { Fallback } from "../../components/fallback.tsx";
import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { AlertMessage } from "../../components/alertMessage.tsx";

/**
 *
 * @returns
 */
export function ProtectedCartPage(): JSX.Element {
  const { data, message, FeacherForm, isFeaching } = useProtectedCartPage();
  const submit = useSubmit();
  const location = useLocation();
  const locPath = location.pathname;
  // console.log(location.pathname);
  const navItems = [
    { to: "/cart", text: "Cart", className: "rounded-start border-end-0" },
    { to: "/cart/edit", text: "Edit", className: "" },
    { to: "/cart/confirm", text: "Confirm", className: "rounded-end border-start-0" },
  ];
  const fields_nonyu = [
    { label: "納入先名:", key: "nonyu_nm" },
    { label: "住所:", key: "addr" },
    { label: "TEL:", key: "tel_no" },
    // { label: "biko1", key: "biko1" },
    // { label: "nonyu_tan", key: "nonyu_tan" },
    // { label: "tok_cd", key: "tok_cd" },
    // { label: "zip_no", key: "zip_no" },
  ];
  const fields_cart = [
    // { label: "row_no", key: "row_no" },
    // { label: "disc_per", key: "disc_per" },
    { label: "商品:", key: "hin_cd" },
    { label: "", key: "hin_nm" },
    // { label: "htanka", key: "htanka", format: (value: string) => parseInt(value).toLocaleString() },
    { label: "単価:", key: "tanka", format: (value: string) => <>&yen;{parseInt(value).toLocaleString()}</> },
    // { label: "zei_kbn", key: "zei_kbn" },
    // { label: "zei_rate", key: "zei_rate" },
  ];

  return (
    <>
      <section id="protected-alubums-page">
        <header>
          <h1 className="h2">{message}</h1>
          <p>Protected Cart</p>
          <Nav variant="pills" fill className="my-3">
            {navItems.map((item, index) => (
              <Nav.Item key={index}>
                <NavLink to={item.to} end className={`nav-link border rounded-0 ${item.className} disabled`}>
                  <span className="me-1">{index + 1}.</span>
                  {item.text}
                  <i className="bi bi-chevron-right ms-1"></i>
                </NavLink>
              </Nav.Item>
            ))}
          </Nav>
          <nav className="mb-3">
            <BtnBack label="Back" />
          </nav>
        </header>
        <hr />
        <section>
          <h2 className="h3">Cart</h2>
          <div id="content">
            <div className="row">
              <div className="col-sm">
                {locPath === "/cart/edit" && (
                  <section className="mb-3">
                    <h3 className="h4">納入先</h3>
                    {data.nonyus.length == 0 ? (
                      <ListGroup.Item>
                        <AlertMessage message="納入先がありません。" variant="warning" classes="mb-0" />
                      </ListGroup.Item>
                    ) : (
                      <Card className="shadow-sm mb-3">
                        <Card.Body>
                          <AlertMessage message="納入先を選択してください。" variant="info" classes="mb-0" />
                        </Card.Body>
                        <ListGroup variant="flush">
                          {data.nonyus.map((item, index) => (
                            <ListGroup.Item key={index} as="label" action>
                              <Row>
                                <Col md="auto">
                                  <Row as="dl" className="mb-sm-0">
                                    <Col as="dt" xs="auto">
                                      選択:
                                    </Col>
                                    <Col as="dd" className="mb-0">
                                      <Form.Check
                                        type="radio"
                                        form="cart_edit"
                                        label=""
                                        name="nonyu_no"
                                        id="nonyu_no"
                                        value={item.nonyu_no}
                                        defaultChecked={!data.head.nonyu_no ? index === 0 : data.head.nonyu_no === item.nonyu_no}
                                        className="mb-0"
                                      />
                                    </Col>
                                  </Row>
                                </Col>
                                <Col md>
                                  <Row as="dl" md={2} className="mb-0">
                                    {fields_nonyu.map((field, idx) => {
                                      const isRowEnd = idx === fields_nonyu.length - 1;

                                      return (
                                        <Fragment key={idx}>
                                          <Col as="dt" md={2} className="text-md-end">
                                            {field.label}
                                          </Col>
                                          <Col as="dd" md={10} className={isRowEnd ? "mb-0" : ""}>
                                            {item[field.key] ? item[field.key] : "-"}
                                          </Col>
                                        </Fragment>
                                      );
                                    })}
                                  </Row>
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                        <Card.Body>
                          <FloatingLabel controlId={data.head.biko1} label="備考">
                            <Form.Control as="textarea" name="biko1" form="cart_edit" placeholder="備考を入力してください" defaultValue={data.head.biko1} />
                          </FloatingLabel>
                        </Card.Body>
                      </Card>
                    )}
                  </section>
                )}
                {locPath === "/cart" && (
                  <section>
                    <h3 className="h4">ご注文商品</h3>
                    {data.details.length === 0 ? (
                      <ListGroup.Item>
                        <AlertMessage message="カートに商品がありません。" variant="warning" classes="mb-0" />
                      </ListGroup.Item>
                    ) : (
                      <Card className="shadow-sm mb-3">
                        <Card.Body>
                          <AlertMessage message="数量を確認して、レジに進んでください。" variant="info" classes="mb-0" />
                        </Card.Body>
                        <ListGroup variant="flush">
                          {data.details.map((item, index) => (
                            <ListGroup.Item key={index}>
                              <div className="d-flex align-items-center mb-2">
                                <small className="text-nowrap"># {item.row_no}</small>
                                <div className="ms-auto">
                                  <Form as={FeacherForm} method="post" name="form_cart">
                                    <fieldset disabled={isFeaching}>
                                      <Button type="submit" name="row_no" value={item.row_no} size="sm" variant="light" className="text-nowrap">
                                        {isFeaching ? (
                                          <Fallback variant="light" />
                                        ) : (
                                          <>
                                            <i className="bi bi-trash me-1"></i>
                                            削除
                                          </>
                                        )}
                                      </Button>
                                    </fieldset>
                                    <Form.Control type="hidden" name="mode" value="form_delete" />
                                  </Form>
                                </div>
                              </div>
                              <Row>
                                <Col md>
                                  <Row as="dl" md={2} className="mb-0">
                                    {fields_cart.map((field, idx) => (
                                      <Fragment key={idx}>
                                        <Col as="dt" md={2} className="text-md-end">
                                          {field.label}
                                        </Col>
                                        <Col as="dd" md={10}>
                                          {item[field.key] ? (field.format ? field.format(item[field.key]) : item[field.key]) : "-"}
                                        </Col>
                                      </Fragment>
                                    ))}
                                  </Row>
                                </Col>
                                <Col md="auto" className="mt-auto">
                                  <Row as="dl" md={2} className="mb-0">
                                    <Col as="dt" md="auto" className="text-md-end">
                                      小計:
                                    </Col>
                                    <Col as="dd">{item.kingaku ? <>&yen;{parseInt(item.kingaku).toLocaleString()}</> : "-"}</Col>
                                  </Row>
                                  <Form
                                    as={FeacherForm}
                                    method="post"
                                    name="form_suryo"
                                    onChange={(e) => {
                                      submit(e.currentTarget);
                                    }}
                                  >
                                    <fieldset disabled={isFeaching}>
                                      <FloatingLabel controlId="suryo" label={isFeaching ? <Fallback variant="light" /> : <>数量</>} className="mb-3">
                                        <Form.Control
                                          type="number"
                                          name="suryo"
                                          min="1"
                                          placeholder="数量を入力してください"
                                          defaultValue={parseInt(item.suryo).toLocaleString()}
                                          className="text-end"
                                        />
                                      </FloatingLabel>
                                    </fieldset>
                                    <Form.Control type="hidden" name="mode" value="form_suryo" />
                                    <Form.Control type="hidden" name="row_no" value={item.row_no} />
                                  </Form>
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      </Card>
                    )}
                  </section>
                )}
              </div>
              <div className="col-sm-3">
                <div className="sticky-top" style={{ top: "5rem" }}>
                  <Card body className="shadow-sm mb-3">
                    <Card.Text as="dl">
                      <dt>合計:</dt>
                      <dd>{isFeaching ? <Fallback variant="light" /> : <>&yen;{parseInttoStr(data.head.zeinuki_gaku)}</>}</dd>
                    </Card.Text>
                    <hr />
                    {locPath === "/cart" && (
                      <Link to="/cart/edit" className={`btn btn-primary w-100 ${data.details.length === 0 && "disabled"} ${isFeaching ? "disabled" : ""}`}>
                        {isFeaching ? (
                          <Fallback variant="light" />
                        ) : (
                          <>
                            <i className="bi bi-pencil-square me-1"></i>
                            レジに進む
                          </>
                        )}
                      </Link>
                    )}
                    {locPath === "/cart/edit" && (
                      <Form as={RouterForm} method="post" id="cart_edit">
                        <Button type="submit" name="mode" value="edit" variant="primary" className="w-100">
                          <i className="bi bi-check-circle me-1"></i>
                          確認する
                        </Button>
                      </Form>
                    )}
                    {locPath === "/cart/confirm" && (
                      <Form as={RouterForm} method="post" id="cart_confirm">
                        <Button type="submit" name="mode" value="confirm" variant="success" className="w-100">
                          <i className="bi bi-check-circle me-1"></i>
                          注文する
                        </Button>
                      </Form>
                    )}
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
