import { Suspense } from "react";
import { Await, Link } from "react-router-dom";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { parseInttoStr } from "../../libs/libs.ts";
import { useContentAreaHin } from "../../hooks/hooks.ts";
import { Fallback } from "../fallback.tsx";
import { AlertAsyncError } from "../alertAsyncError.tsx";
import { AlertMessage } from "../alertMessage.tsx";
import { HinInputSuryo } from "./HinInputSuryo.tsx";

type Props = {
  data: Record<string, string>[];
  type?: string;
};

/**
 *
 * @param props
 * @returns
 */
const ContentCards = (props: Props): JSX.Element => {
  const { data } = props;
  const { noImage, user } = useContentAreaHin();

  return (
    <Row xs={2} sm={3} md={4} lg={5} xl={6} className="gx-2 gy-3">
      {data.map((post, index) => (
        <Col key={index}>
          <Card className="h-100 shadow-sm">
            <Link to={`${post.hin_cd}`} className="h-100 d-flex flex-column text-reset text-decoration-none focus-ring">
              <Card.Img decoding="async" loading="lazy" variant="top" src={post.atch_flg === "1" ? `data:image/jpeg;base64,${post.atch_image}` : `${noImage}`} />
              <Card.Body className="d-flex flex-column p-2">
                <Card.Text className="h6 mt-auto">{post.hin_nm}</Card.Text>
                <Card.Text className="h6 text-end">&yen;{parseInttoStr(post.tanka)}</Card.Text>
              </Card.Body>
            </Link>
            {user && (
              <Card.Footer className="p-2 bg-transparent">
                <HinInputSuryo data={post} />
              </Card.Footer>
            )}
          </Card>
        </Col>
      ))}
    </Row>
  );
};

/**
 *
 * @param props
 * @returns
 */
export function ContentAreaHin(props: Props): JSX.Element {
  const { data, type } = props;

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

            return (
              <>
                <div id="list-header" className="text-end mb-2">
                  <span className="me-1">count:</span>
                  <span>{data.length}</span>
                </div>
                <div id="list-body">
                  {data.length === 0 ? <AlertMessage message="商品がありません。" variant="warning" /> : type === "Adminlist" ? contentAdminLists : <ContentCards data={data} />}
                </div>
              </>
            );
          }}
        />
      }
    />
  );
}
