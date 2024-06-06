import { Fragment } from "react";
import { NavLink, Form as RouterForm, Link } from "react-router-dom";
import { Card, FloatingLabel, Form, ListGroup, Button, Nav, Col, Row, Image } from "react-bootstrap";
import { useProtectedCartPage } from "../../hooks/hooks.ts";
import { parseInttoStr } from "../../libs/libs.ts";
import { Fallback } from "../../components/fallback.tsx";
import { AlertMessage } from "../../components/alertMessage.tsx";
import { BtnBack } from "../../components/btnBack.tsx";

/**
 *
 * @returns
 */
const CartNavigation = () => {
  const { fields } = useProtectedCartPage();

  return (
    <Nav variant="pills" fill className="my-3">
      {fields.navigation.map((item, index) => (
        <Nav.Item key={index}>
          <NavLink to={item.to} end className={`nav-link border rounded-0 ${item.className} disabled`}>
            <span className="me-1">{index + 1}.</span>
            {item.label}
            <i className="bi bi-chevron-right ms-1"></i>
          </NavLink>
        </Nav.Item>
      ))}
    </Nav>
  );
};

/**
 *
 * @param param0
 * @returns
 */
const FormCartDelete = ({ data }: { data: Record<string, string> }): JSX.Element => {
  const { isFeaching, FeacherForm } = useProtectedCartPage();

  return (
    <Form as={FeacherForm} method="post" name="form_cart">
      <fieldset disabled={isFeaching}>
        <Button type="submit" name="row_no" value={data.row_no} size="sm" variant="light" className="text-nowrap">
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
  );
};

/**
 *
 * @param param0
 * @returns
 */
const FormCartSuryo = ({ data }: { data: Record<string, string> }): JSX.Element => {
  const { isFeaching, FeacherForm, Feachersubmit } = useProtectedCartPage();

  return (
    <Form
      as={FeacherForm}
      method="post"
      name={`form_suryo_${data.row_no}`}
      onBlur={(e) => {
        Feachersubmit(e.currentTarget);
      }}
    >
      <fieldset disabled={isFeaching}>
        <FloatingLabel controlId="suryo" label={isFeaching ? <Fallback variant="light" /> : <>数量</>} className="mb-3">
          <Form.Control type="number" name="suryo" min="1" placeholder="数量を入力してください" defaultValue={parseInt(data.suryo).toLocaleString()} className="text-end" />
        </FloatingLabel>
      </fieldset>
      <Form.Control type="hidden" name="mode" value="form_suryo" />
      <Form.Control type="hidden" name="row_no" value={data.row_no} />
    </Form>
  );
};

/**
 *
 * @returns
 */
const ContentCommit = (): JSX.Element => {
  const { message } = useProtectedCartPage();

  return (
    <>
      <header>
        <h1 className="h2">{message}</h1>
        <p>Protected Cart</p>
      </header>
      <hr />
      <section>
        <h2 className="h3">ご注文ありがとうございました</h2>
        <div id="content">
          <AlertMessage message="ご注文が完了しました。" variant="success" />
          <div>
            <Link to="/mypage" className="btn btn-link">
              MyPageへ
              <i className="bi bi-chevron-right ms-1"></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
const ContentAction = (): JSX.Element => {
  const { data, isLocPathCart, isLocPathEdit, isLocPathConfirm } = useProtectedCartPage();

  return (
    <>
      {isLocPathCart && (
        <Link to="/cart/edit" className={`btn btn-primary w-100 ${data.details.length === 0 && "disabled"}`}>
          <i className="bi bi-pencil-square me-1"></i>
          レジに進む
        </Link>
      )}
      {isLocPathEdit && (
        <Form as={RouterForm} method="post" id="cart_edit">
          <Button type="submit" name="mode" value="edit" variant="primary" className="w-100">
            <i className="bi bi-check-circle me-1"></i>
            確認する
          </Button>
        </Form>
      )}
      {isLocPathConfirm && (
        <Form as={RouterForm} method="post" id="cart_confirm">
          <Button type="submit" name="mode" value="confirm" variant="success" className="w-100">
            <i className="bi bi-check-circle me-1"></i>
            注文する
          </Button>
        </Form>
      )}
    </>
  );
};

const ContentNonyuArea = (): JSX.Element => {
  const { data, fields, isLocPathEdit } = useProtectedCartPage();
  const header_msg = "納入先";

  return (
    <>
      <section className="mb-3">
        <h3 className="h4">{header_msg}</h3>
        {data.nonyus.length == 0 ? (
          <ListGroup.Item>
            <AlertMessage message="納入先がありません。" variant="warning" classes="mb-0" />
          </ListGroup.Item>
        ) : (
          <>
            <Card className="shadow-sm mb-3">
              {isLocPathEdit && (
                <Card.Header className="bg-transparent">
                  <AlertMessage message="納入先を選択してください。" variant="info" classes="card-text" />
                </Card.Header>
              )}
              <ListGroup variant="flush">
                {isLocPathEdit ? (
                  <>
                    {data.nonyus.map((item, index) => (
                      <ListGroup.Item key={index} as="label" action>
                        <Row>
                          <Col md="auto">
                            <Row as="dl" className="card-text">
                              <Col as="dt" xs="auto" className="text-nowrap">
                                選択:
                              </Col>
                              <Col as="dd" className="card-text">
                                <Form.Check
                                  type="radio"
                                  name="nonyu_no"
                                  id="nonyu_no"
                                  form="cart_edit"
                                  value={item.nonyu_no}
                                  defaultChecked={!data.head.nonyu_no ? index === 0 : data.head.nonyu_no === item.nonyu_no}
                                  className="mb-0"
                                />
                              </Col>
                            </Row>
                          </Col>
                          <Col md>
                            <Row as="dl" md={2} className="card-text">
                              {fields.nonyu.map((field, idx) => (
                                <Fragment key={idx}>
                                  <Col as="dt" md={2} className="text-nowrap text-md-end">
                                    {field.label}
                                  </Col>
                                  <Col as="dd" md={10} className="card-text">
                                    {item[field.key] ? item[field.key] : "-"}
                                  </Col>
                                </Fragment>
                              ))}
                            </Row>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </>
                ) : (
                  <>
                    <ListGroup.Item>
                      <Row>
                        <Col md>
                          <Row as="dl" md={2} className="card-text">
                            {fields.nonyu_head.map((field, idx) => (
                              <Fragment key={idx}>
                                <Col as="dt" md={2} className="text-nowrap text-md-end">
                                  {field.label}
                                </Col>
                                <Col as="dd" md={10} className="card-text">
                                  {data.head[field.key] ? data.head[field.key] : "-"}
                                </Col>
                              </Fragment>
                            ))}
                          </Row>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </>
                )}
              </ListGroup>
              <Card.Body>
                {isLocPathEdit ? (
                  <>
                    <FloatingLabel controlId={data.head.biko1} label="備考">
                      <Form.Control as="textarea" name="biko1" form="cart_edit" placeholder="備考を入力してください" defaultValue={data.head.biko1} />
                    </FloatingLabel>
                  </>
                ) : (
                  <>
                    <Row as="dl" md={2} className="card-text">
                      <Col as="dt" md={2} className="text-nowrap text-md-end">
                        備考:
                      </Col>
                      <Col as="dd" md={10} className="card-text">
                        {data.head.biko1 ? data.head.biko1 : "-"}
                      </Col>
                    </Row>
                  </>
                )}
              </Card.Body>
            </Card>
          </>
        )}
      </section>
    </>
  );
};

const ContentItemArea = (): JSX.Element => {
  const { data, fields, noImage, isLocPathCart } = useProtectedCartPage();
  const itemSrc = `${noImage}`;
  const header_msg = "ご注文商品";

  return (
    <section>
      <h3 className="h4">{header_msg}</h3>
      {data.details.length === 0 ? (
        <ListGroup.Item>
          <AlertMessage message="カートに商品がありません。" variant="warning" classes="mb-0" />
        </ListGroup.Item>
      ) : (
        <Card className="shadow-sm mb-3">
          {isLocPathCart && (
            <Card.Header className="bg-transparent">
              <AlertMessage message="数量を確認して、レジに進んでください。" variant="info" classes="card-text" />
            </Card.Header>
          )}
          <ListGroup variant="flush">
            {data.details.map((item, index) => (
              <ListGroup.Item key={index}>
                <div className="d-flex align-items-center mb-2">
                  <small className="text-nowrap"># {Number(item.row_no) + 1}</small>
                  {isLocPathCart && (
                    <>
                      <div className="ms-auto">
                        <Link to={`${item.row_no}`} className="btn btn-link btn-sm">
                          <i className="bi bi-pencil-square me-1"></i>
                          編集
                        </Link>
                      </div>
                      <FormCartDelete data={item} />
                    </>
                  )}
                </div>
                <Row xs={2}>
                  <Col md={4} xl={3}>
                    <div className="mb-3">
                      <Image src={itemSrc} alt="image" className="p-2" fluid thumbnail />
                    </div>
                  </Col>
                  <Col md={8} xl={9}>
                    {!isLocPathCart ? (
                      <Row as="dl" md={2} className="card-text">
                        {fields.cart_fixed.map((field, idx) => (
                          <Fragment key={idx}>
                            <Col as="dt" md={2} className="text-nowrap text-md-end">
                              {field.label}
                            </Col>
                            <Col as="dd" md={10} className="card-text">
                              {item[field.key] ? (field.format ? field.format(item[field.key]) : item[field.key]) : "-"}
                            </Col>
                          </Fragment>
                        ))}
                      </Row>
                    ) : (
                      <Row xs={1} lg={2}>
                        <Col lg={8} xl={7}>
                          <Row as="dl" className="card-text">
                            {fields.cart.map((field, idx) => (
                              <Fragment key={idx}>
                                <Col as="dt" xl={3} className="text-nowrap text-xl-end">
                                  {field.label}
                                </Col>
                                <Col as="dd" xl={9} className="card-text">
                                  {item[field.key] ? (field.format ? field.format(item[field.key]) : item[field.key]) : "-"}
                                </Col>
                              </Fragment>
                            ))}
                          </Row>
                        </Col>
                        <Col lg={4} xl={5}>
                          <Row as="dl" className="card-text">
                            <Col as="dt" xl={3} className="text-nowrap text-xl-end">
                              小計:
                            </Col>
                            <Col as="dd" xl={9} className="card-text">
                              {item.kingaku ? <>&yen;{parseInttoStr(item.kingaku)}</> : "-"}
                            </Col>
                          </Row>
                          <FormCartSuryo data={item} />
                        </Col>
                      </Row>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      )}
    </section>
  );
};

/**
 *
 * @returns
 */
export function ProtectedCartPage(): JSX.Element {
  const { data, message, locPath, fields, isLocPathCart, isLocPathCommit } = useProtectedCartPage();
  const navName = !isLocPathCommit && fields.navigation.filter((item) => item.to === locPath).map((item) => item.label);
  // console.log("navName", navName);

  return (
    <>
      <section id="protected-cart-page">
        {isLocPathCommit ? (
          <ContentCommit />
        ) : (
          <>
            <header>
              <h1 className="h2">{message}</h1>
              <p>Protected Cart</p>
              <CartNavigation />
              <nav className="mb-3">
                <BtnBack label="Back" />
              </nav>
            </header>
            <hr />
            <section>
              <header>
                <h2 className="h3 mb-3">{navName && navName}</h2>
                <p>商品の数量を確認して、レジに進んでください。</p>
              </header>
              <div id="content">
                <Row>
                  <Col>
                    {!isLocPathCart && <ContentNonyuArea />}
                    <ContentItemArea />
                  </Col>
                  <Col lg={3}>
                    <div className="sticky-top" style={{ top: "5rem" }}>
                      <Card body className="shadow-sm mb-3">
                        <Card.Text as="dl">
                          <dt className="text-nowrap">小計:</dt>
                          <dd className="card-text">&yen;{parseInttoStr(data.head.zeinuki_gaku)}</dd>
                          <dt className="text-nowrap">送料:</dt>
                          <dd className="card-text">&yen;0</dd>
                          <dt className="text-nowrap">税額:</dt>
                          <dd className="card-text">&yen;{parseInttoStr(data.head.zei_gaku)}</dd>
                          <hr />
                          <dt className="text-nowrap">合計:</dt>
                          <dd className="card-text">&yen;{parseInttoStr(data.head.zeikomi_gaku)}</dd>
                        </Card.Text>
                        <hr />
                        <ContentAction />
                      </Card>
                    </div>
                  </Col>
                </Row>
              </div>
            </section>
          </>
        )}
      </section>
    </>
  );
}
