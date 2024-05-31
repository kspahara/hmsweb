import { Form as RouterForm } from "react-router-dom";
import { Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
import { CreateForm } from "../components/createForm.tsx";
import { Fallback } from "../components/fallback.tsx";
import { useLoginUser } from "../hooks/hooks.ts";
import { AlertMessage } from "../components/alertMessage.tsx";

export function LoginUserPage() {
  const { forms, message, actionData, isLoggingIn, from, validated, setValidated, route } = useLoginUser();
  const route_tanto = route == "nyusyuko" ? true : false;
  const route_tokui = route === "hin" ? true : false;

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
            {route_tokui && (
              <Col md={6} className="mx-auto">
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
                  {actionData && actionData.error && <AlertMessage message={actionData.error} variant="danger" classes="mt-3" />}
                </Card>
              </Col>
            )}
            {route_tanto && (
              <Col md={6} className="mx-auto">
                <h2 className="h3 mb-3">Tanto Login</h2>
                <Card body className="mb-3 shadow-sm">
                  <Form as={RouterForm} method="post" name="form_tanto" replace noValidate validated={validated}>
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
                            Tanto Login
                            <i className="bi bi-box-arrow-in-right ms-2"></i>
                          </>
                        )}
                      </Button>
                    </Stack>
                    <Form.Control
                      {...{
                        type: "hidden",
                        name: "redirectTo",
                        value: from,
                      }}
                      type="hidden"
                      name="redirectTo"
                      value={from}
                    />
                    <Form.Control type="hidden" name="loginType" value="tanto" />
                  </Form>
                  {actionData && actionData.error && (
                    <AlertMessage
                      {...{
                        message: actionData.error,
                        variant: "danger",
                        classes: "mt-3",
                      }}
                    />
                  )}
                </Card>
              </Col>
            )}
          </Row>
        </section>
      </section>
    </>
  );
}
