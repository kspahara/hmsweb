import { Fragment, Suspense } from "react";
import {
  Await,
  Link,
  useAsyncError,
  useAsyncValue,
  useFetcher,
  //  useSubmit
} from "react-router-dom";
import { Alert, Badge, Button, Card, Col, FloatingLabel, Form, InputGroup, ListGroup, Row } from "react-bootstrap";
import { Fallback } from "../fallback.tsx";
import { parseInttoStr } from "../../libs/libs.ts";

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
export function ContentAreaHin(props: Props): JSX.Element {
  const { data, user, noImage, type } = props;
  // const submit = useSubmit();
  const fetcher = useFetcher();
  const FeacherForm = fetcher.Form;
  const isFeaching = fetcher.state === "loading";

  return (
    <Suspense
      fallback={<Fallback />}
      children={
        <Await
          resolve={data}
          errorElement={<Error />}
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

            const contentListsHin = () => {
              const fields = [
                { label: "処理日:", key: "syori_ymd" },
                { label: "伝票番号:", key: "den_no" },
                { label: "取引種別:", key: "tori_nm" },
                { label: "税込額:", key: "zeikomi_gaku", format: (value: string) => `¥${parseInttoStr(value)}` },
              ];

              return (
                <Card className="shadow-sm mb-3">
                  <ListGroup variant="flush">
                    {data.map((item, index) => (
                      <ListGroup.Item key={index} as={Link} to={`${item.den_no}`} className="d-flex" action>
                        <Row as="dl" className="mb-0">
                          {fields.map((field, idx) => (
                            <Fragment key={idx}>
                              <Col as="dt" md={3} className="text-nowrap text-md-end">
                                {field.label}
                              </Col>
                              <Col as="dd" md={9}>
                                {item[field.key] ? (field.format ? field.format(item[field.key]) : item[field.key]) : "-"}
                              </Col>
                            </Fragment>
                          ))}
                        </Row>
                        <i className="bi bi-chevron-right ms-auto" />
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card>
              );
            };

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
                <div id="list-body">{type === "mypage" ? contentListsHin() : type === "Adminlist" ? contentAdminLists : contentCards}</div>
              </>
            );
          }}
        />
      }
    />
  );
}
