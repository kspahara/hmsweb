import { Form as RouterForm, useActionData, useLoaderData, useNavigation } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Forms, Form as FormType } from "../components/Forms";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Fallback } from "../components/Fallback";

export function LoginPage() {
	const { searchParams, forms } = useLoaderData() as { searchParams: URLSearchParams; forms: FormType[] };
	const navigation = useNavigation();
	const actionData = useActionData() as { error: string } | undefined;
	const isLoggingIn = navigation.formData?.get("username") != null;
	const from = searchParams.get("from") || "/";

	return (
		<>
			<main id={"login-page"} className={`bg-light mt-5 py-5`} style={{ minHeight: "100vh" }}>
				<Container as={"section"}>
					<h1 className={"h3 border-bottom border-dark mb-3"}>Login</h1>
					<Breadcrumbs />
					<Row>
						<Col md={6} lg={4} className={"mx-auto"}>
							<Card body className={"mb-3 shadow-sm"}>
								<Form as={RouterForm} method={"post"} replace>
									<Forms forms={forms} />
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
				</Container>
			</main>
		</>
	);
}
