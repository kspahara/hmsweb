import { Form as RouterForm } from "react-router-dom";
import { Alert, Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
import { CreateForm } from "../components/createForm.tsx";
import { Fallback } from "../components/fallback.tsx";
import { useLoginUser } from "../hooks/hooks.ts";

export function LoginUserPage() {
  const { forms, message, actionData, isLoggingIn, from, validated, setValidated } = useLoginUser();

  return (
    <>
      <section id="login-page">
        <header>
          <h1 className="h2">{message}</h1>
          <p>Please login to continue.</p>
        </header>
        <hr />
        <section>
          <Row>
            <Col md={6}>
              <h2 className="h3 mb-3">Tokui Login</h2>
              <Card body className="mb-3 shadow-sm">
                <Form as={RouterForm} method="post" name="form_tokui" replace noValidate validated={validated}>
                  <Stack gap={3}>
                    {forms.map((form, index) => (
                      <CreateForm key={index} form={form} />
                    ))}
                    <hr />
                    <Button
                      type="submit"
                      className="w-100"
                      onClick={(e) => {
                        const form = e.currentTarget;
                        if (form.checkValidity() === false) {
                          e.preventDefault();
                          e.stopPropagation();
                        }
                        setValidated(true);
                        // submit(form);
                      }}
                    >
                      {isLoggingIn ? (
                        <Fallback />
                      ) : (
                        <>
                          Tokui Login
                          <i className="bi bi-box-arrow-in-right ms-2"></i>
                        </>
                      )}
                    </Button>
                  </Stack>
                  <Form.Control type="hidden" name="redirectTo" value={from} />
                  <Form.Control type="hidden" name="loginType" value="tokui" />
                </Form>
                {actionData && actionData.error && (
                  <Alert variant="danger" className="mt-3">
                    {actionData.error}
                  </Alert>
                )}
              </Card>
            </Col>
            <Col md={6}>
              <h2 className="h3 mb-3">Tanto Login</h2>
              <Card bg="info" body className="mb-3 shadow-sm">
                <Form as={RouterForm} method="post" name="form_tanto" replace noValidate validated={validated}>
                  <Stack gap={3}>
                    {forms.map((form, index) => (
                      <CreateForm key={index} form={form} />
                    ))}
                    <hr />
                    <Button
                      type="submit"
                      variant="warning"
                      className="w-100"
                      onClick={(e) => {
                        const form = e.currentTarget;
                        if (form.checkValidity() === false) {
                          e.preventDefault();
                          e.stopPropagation();
                        }
                        setValidated(true);
                        // submit(form);
                      }}
                    >
                      {isLoggingIn ? (
                        <Fallback />
                      ) : (
                        <>
                          Tanto Login
                          <i className="bi bi-box-arrow-in-right ms-2"></i>
                        </>
                      )}
                    </Button>
                  </Stack>
                  <Form.Control type="hidden" name="redirectTo" value={from} />
                  <Form.Control type="hidden" name="loginType" value="tanto" />
                </Form>
                {actionData && actionData.error && (
                  <Alert variant="danger" className="mt-3">
                    {actionData.error}
                  </Alert>
                )}
              </Card>
            </Col>
          </Row>
        </section>
      </section>
    </>
  );
}
