import { Suspense } from "react";
import { Await, Link } from "react-router-dom";
import { Badge, Button, Card, Col, FloatingLabel, Form, InputGroup, ListGroup, Row } from "react-bootstrap";
import { Fallback } from "../fallback.tsx";
import { parseInttoStr } from "../../libs/libs.ts";
import { AlertAsyncError } from "../alertAsyncError.tsx";
import { useContentAreaHin } from "../../hooks/hooks.ts";
import { AlertMessage } from "../alertMessage.tsx";

type Props = {
  data: Record<string, string>[];
  type?: string;
};

/**
 *
 * @param props
 * @returns
 */
export function ContentAreaHin(props: Props): JSX.Element {
  const { data, type } = props;
  const { isFeaching, FeacherForm, noImage, user } = useContentAreaHin();

  return (
    <Suspense
      fallback={<Fallback />}
      children={
        <Await
          resolve={data}
          errorElement={<AlertAsyncError />}
          children={(data: Record<string, string>[]) => {
            const contentAdminLists = (
              <Card className="shadow-sm mb-3">
                <ListGroup variant="flush">
                  {data.map((item, index) => (
                    <ListGroup.Item key={index} className="d-flex align-items-center">
                      {item.id}
                      <span className="mx-1">:</span>
                      {item.title}
                      <Button type="submit" size="sm" name="tok_cd" value={item.id} variant="primary" className="ms-auto text-nowrap">
                        <i className="bi bi-pencil-fill me-1" />
                        編集
                      </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            );

            const contentCards = (
              <Row lg={5} xl={6} className="gx-2 gy-3">
                {data.map((post, index) => (
                  <Col key={index} xs={6} sm={4} md={3} xl={2}>
                    <Card className="h-100 shadow-sm">
                      <Link to={`${post.hin_cd}`} className="h-100 d-flex flex-column text-reset text-decoration-none">
                        <Card.Img
                          decoding="async"
                          loading="lazy"
                          variant="top"
                          src={post.atch_flg === "1" ? `data:image/jpeg;base64,${post.atch_image}` : `${noImage}`}
                          className="p-4 pb-0"
                        />
                        <Card.Body className="d-flex flex-column p-2">
                          <Card.Title className="h6">
                            <Badge bg="info">{post.han_name}</Badge>
                            <div>{post.hin_nm}</div>
                          </Card.Title>
                          <Card.Text className="h6 mt-auto text-end">&yen;{parseInttoStr(post.tanka)}</Card.Text>
                        </Card.Body>
                      </Link>
                      {user && (
                        <Card.Footer className="p-2 bg-transparent">
                          <div className="d-grid">
                            <Form as={FeacherForm} method="post" name="form_favorite">
                              <fieldset disabled={isFeaching}>
                                <Button
                                  type="submit"
                                  name="hin_attr_cd"
                                  value={post.hin_attr_cd === "1" ? "0" : "1"}
                                  variant={post.hin_attr_cd === "1" ? "warning" : "light"}
                                  aria-label={post.hin_attr_cd === "1" ? "お気に入りを外す" : "お気に入りに追加"}
                                  className="btn btn-sm lh-sm mb-2 w-100"
                                >
                                  {isFeaching ? (
                                    <Fallback variant={post.hin_attr_cd === "1" ? "dark" : "secondary"} />
                                  ) : (
                                    <>
                                      <i className="bi bi-star-fill me-1" />
                                      {post.hin_attr_cd === "1" ? "お気に入りを外す" : "お気に入りに追加"}
                                    </>
                                  )}
                                </Button>
                                <Form.Control type="hidden" name="form_type" value="favorite" />
                                <Form.Control type="hidden" name="hin_cd" value={post.hin_cd} />
                              </fieldset>
                            </Form>
                            <Form as={FeacherForm} method="post" name="form_cart">
                              <fieldset disabled={isFeaching}>
                                <InputGroup>
                                  <FloatingLabel controlId={`suryo${index}`} label="数量">
                                    <Form.Control type="number" name="suryo" placeholder="数量を入力してください" defaultValue={1} className="text-end" />
                                  </FloatingLabel>
                                  <Button type="submit" name="hin_cd" value={post.hin_cd} variant="primary" className="lh-sm">
                                    {isFeaching ? (
                                      <Fallback variant="light" />
                                    ) : (
                                      <>
                                        <div>
                                          <small className="">カートに入れる</small>
                                        </div>
                                        <i className="bi bi-cart-plus-fill" />
                                      </>
                                    )}
                                  </Button>
                                </InputGroup>
                                <Form.Control type="hidden" name="form_type" value="cart" />
                              </fieldset>
                            </Form>
                          </div>
                        </Card.Footer>
                      )}
                    </Card>
                  </Col>
                ))}
              </Row>
            );

            return (
              <>
                <div id="list-header" className="text-end mb-2">
                  <span className="me-1">count:</span>
                  <span>{data.length}</span>
                </div>
                <div id="list-body">
                  {data.length === 0 ? (
                    <AlertMessage
                      {...{
                        message: "商品がありません。",
                        variant: "warning",
                      }}
                    />
                  ) : type === "Adminlist" ? (
                    contentAdminLists
                  ) : (
                    contentCards
                  )}
                  {/* {type === "Adminlist" ? contentAdminLists : contentCards} */}
                </div>
              </>
            );
          }}
        />
      }
    />
  );
}
