import { Form as RouterForm, useActionData, useLoaderData, useNavigation } from "react-router-dom";
import { FloatingForms, Form as FormType } from "../components/FloatingForms";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import { Fallback } from "../components/Fallback";

export function LoginPage() {
	const { searchParams, forms, message } = useLoaderData() as { searchParams: URLSearchParams; forms: FormType[]; message: string };
	const navigation = useNavigation();
	const actionData = useActionData() as { error: string } | undefined;
	const isLoggingIn = navigation.formData?.get("username") != null;
	const from = searchParams.get("from") || "/";

	return (
		<>
			<section id={"login-page"}>
				<header>
					<h1 className={"h2"}>{message}</h1>
					<p>{"Please login to continue."}</p>
				</header>
				<hr />
				<section>
					<Row>
						<Col md={6} lg={4} className={"mx-auto"}>
							<Card body className={"mb-3 shadow-sm"}>
								<h2 className={"h3"}>{"Login"}</h2>
								<Form as={RouterForm} method={"post"} replace>
									<FloatingForms forms={forms} />
									<Button type={"submit"} className={"w-100"}>
										{isLoggingIn ? <Fallback /> : <span>{"Login"}</span>}
									</Button>
									<Form.Control type={"hidden"} name={"redirectTo"} value={from} />
								</Form>
								{actionData && actionData.error && (
									<Alert variant={"danger"} className={"mt-3"}>
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
