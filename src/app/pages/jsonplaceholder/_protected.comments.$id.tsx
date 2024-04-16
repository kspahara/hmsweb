import { Link, Form as RouterForm, useLoaderData, useNavigate } from "react-router-dom";
import { Button, Card, Form, Stack } from "react-bootstrap";
import { CreateForm, FormType } from "../../components/createForm.tsx";

function useProtectedCommentsId() {
	const { data, forms, searchies, message } = useLoaderData() as {
		data: Record<string, string>;
		forms: FormType[];
		searchies: Record<string, string>[];
		message: string;
	};

	return {
		data,
		forms,
		searchies,
		isEdit: location.pathname.includes("edit"),
		navigate: useNavigate(),
		message,
	};
}

export function ProtectedCommentsIdPage() {
	const { data, forms, searchies, isEdit, navigate,message } = useProtectedCommentsId();

	const FormContents = (): JSX.Element => {
		return (
			<>
				<Form as={RouterForm} method={"post"} replace={true}>
					<fieldset disabled={!isEdit}>
						<Stack gap={3}>
							{forms.map((form, index) => (
								<CreateForm key={index} form={form} data={data} option={searchies} />
							))}
							<div>
								<Button variant={"success"} type={"submit"}>
									Update
								</Button>
							</div>
						</Stack>
					</fieldset>
				</Form>
			</>
		);
	};

	const Contents = () => {
		return (
			<>
				{forms.map((form, index) => (
					<dl key={index}>
						<dt>{form.label}</dt>
						<dd>{data[form.controlId]}</dd>
					</dl>
				))}
			</>
		);
	};

	return (
		<>
			<section>
				<header>
					<h1 className="h2">{message}</h1>
					<nav className="mb-3">
						<Button type="button" variant="link" onClick={() => navigate(-1)}>
							<i className="bi bi-arrow-left me-1" />
							Back
						</Button>
					</nav>
				</header>
				<hr />
				<section>
					<h2 className="h3">{data.title}</h2>
					{isEdit ? (
						<Button type="button" variant="secondary" onClick={() => navigate(-1)}>
							Cancel
						</Button>
					) : (
						<Link to="edit" className="btn btn-primary">
							Edit
						</Link>
					)}
					<div className="col-sm-6 mx-auto">
						<Card body className="shadow-sm mb-3">
							{isEdit ? <FormContents /> : <Contents />}
						</Card>
					</div>
				</section>
			</section>
		</>
	);
}
