import { Form as RouterForm } from "react-router-dom";
import { Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
import { CreateForm } from "../components/createForm.tsx";
import { Fallback } from "../components/fallback.tsx";
import { useLogin } from "../hooks/hooks.ts";
import { AlertMessage } from "../components/alertMessage.tsx";

export function LoginPage() {
  const { forms, message, actionData, isLoggingIn, from, validated, setValidated } = useLogin();

  return (
    <>
      <section id="login-page">
        <header>
          <h1 className="h2">{message}</h1>
          <p>Please login to continue.</p>
        </header>
        <hr />
        <section>
          <Row md={2}>
            <Col className="mx-auto">
              <Card body className="mb-3 shadow-sm">
                <h2 className="h3">Login</h2>
                <Form as={RouterForm} method="post" replace noValidate validated={validated}>
                  <Stack gap={3}>
                    {forms.map((form, index) => (
                      <CreateForm key={index} form={form} />
                    ))}
                    <Button
                      type="submit"
                      className="w-100"
                      onClick={(event) => {
                        const form = event.currentTarget;
                        if (form.checkValidity() === false) {
                          event.preventDefault();
                          event.stopPropagation();
                        }
                        setValidated(true);
                        // submit(form);
                      }}
                    >
                      {isLoggingIn ? <Fallback /> : <span>Login</span>}
                    </Button>
                  </Stack>
                  <Form.Control type="hidden" name="redirectTo" value={from} />
                </Form>
                {actionData && actionData.error && <AlertMessage message={actionData.error} variant="danger" classes="mt-3" />}
              </Card>
            </Col>
          </Row>
        </section>
      </section>
    </>
  );
}
