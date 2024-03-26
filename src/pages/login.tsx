import { Form, useActionData, useLoaderData, useNavigation } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function LoginPage() {
	const { searchParams } = useLoaderData() as { searchParams: URLSearchParams };
	const navigation = useNavigation();
	const actionData = useActionData() as { error: string } | undefined;
	const isLoggingIn = navigation.formData?.get("username") != null;
	const from = searchParams.get("from") || "/";

	return (
		<>
			<main id={"login-page"}>
				<h1>Login</h1>
				<Breadcrumbs />
				<Form method={"post"} replace>
					<label>
						Username: <input name={"username"} />
					</label>
					<button type={"submit"}>
						{isLoggingIn ? (
							<>
								<span style={{ color: "red" }}>Logging in...</span>
							</>
						) : (
							<>
								<span style={{ color: "glay" }}>Login</span>
							</>
						)}
					</button>

					{actionData && actionData.error ? (
						<>
							<p style={{ color: "red" }}>{actionData.error}</p>
						</>
					) : null}

					<input type={"hidden"} name={"redirectTo"} value={from} />
				</Form>
			</main>
		</>
	);
}
