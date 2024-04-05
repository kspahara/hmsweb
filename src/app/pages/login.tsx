import { useState } from "react";
import { Form as RouterForm, useActionData, useLoaderData, useNavigation } from "react-router-dom";
import { Alert, Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
import { CreateForm, FormType } from "../components/CreateForm.tsx";
import { Fallback } from "../components/Fallback.tsx";

export function LoginPage() {
	const { searchParams, forms, message } = useLoaderData() as { searchParams: URLSearchParams; forms: FormType[]; message: string };
	const navigation = useNavigation();
	const actionData = useActionData() as { error: string } | undefined;
	const isLoggingIn = navigation.formData?.get("username") != null;
	const from = searchParams.get("from") || "/";
	const [validated, setValidated] = useState(false);
	console.log("actionData", actionData);
	// const submit = useSubmit();
	// const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
	// 	const form = event.currentTarget;
	// 	if (form.checkValidity() === false) {
	// 		event.preventDefault();
	// 		event.stopPropagation();
	// 	}

	// 	setValidated(true);
	// };

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
								<Form as={RouterForm} method={"post"} replace noValidate validated={validated}>
									<Stack gap={3}>
										{forms.map((form, index) => (
											<CreateForm key={index} form={form} />
										))}
										<Button
											type={"submit"}
											className={"w-100"}
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
											{isLoggingIn ? <Fallback /> : <span>{"Login"}</span>}
										</Button>
									</Stack>
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
