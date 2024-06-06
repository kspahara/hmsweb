import { Form as RouterForm, useLoaderData } from "react-router-dom";
import { BtnBack } from "../../components/btnBack.tsx";
import { CreateForm, FormType } from "../../components/createForm.tsx";
import { Form, Stack, Button, Col, Row, Card } from "react-bootstrap";

export function ProtectedCartRowNoRoutePage(): JSX.Element {
  const { data, message, forms, searchies } = useLoaderData() as {
    data: Record<string, Record<string, string>>;
    message: string;
    forms: FormType[];
    searchies: Record<string, Record<string, string>[]>;
  };

  return (
    <>
      <section>
        <header>
          <h1 className="h2">{message}</h1>
          <p>カートの詳細を表示します。</p>
          <nav className="mb-2">
            <BtnBack label="Back" />
          </nav>
        </header>
        <hr />
        <section id="hin-detail-contents">
          <Row>
            <Col md={3}>
              <header>
                <h2 className="h4 mb-3">{data.detail.hin_nm}</h2>
                <p>カートの詳細を表示します。</p>
              </header>
            </Col>
            <Col>
              <Card className="mb-3 shadow-sm">
                <Card.Body>
                  <Form as={RouterForm} method="post">
                    <Stack gap={3}>
                      {forms.map((form, index) => (
                        <CreateForm key={index} form={form} option={searchies[form.controlId]} />
                      ))}
                      <hr />
                      <Button variant="success" type="submit">
                        <i className="bi bi-check2 me-1" />
                        登録
                      </Button>
                    </Stack>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
      </section>
    </>
  );
}
