import { Link, Form as RouterForm, useLoaderData, useNavigate } from "react-router-dom";
import { Button, Card, Form, Stack } from "react-bootstrap";
import { CreateForm, FormType } from "../../components/createForm.tsx";

export function ProtectedCommentsIdPage() {
	const { data, forms, posts } = useLoaderData() as { data: Record<string, string>; forms: FormType[]; posts: Record<string, string>[] };
	const isEdit = location.pathname.includes("edit");
	const navigate = useNavigate();
	// console.log("data", data);
	// console.log("forms", forms);

	const FormContents = () => {
		return (
			<>
				<Form as={RouterForm} method={"post"} replace={true}>
					<fieldset disabled={!isEdit}>
						<Stack gap={3}>
							{forms.map((form, index) => (
								<CreateForm key={index} form={form} data={data} option={posts} />
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
				<h3>ProtectedCommentsIdPage</h3>
				<nav className={"mb-3"}>
					<Button
						type={"button"}
						variant={"link"}
						onClick={() => {
							navigate(-1);
						}}
					>
						Back
					</Button>
					{isEdit ? (
						<Button
							type={"button"}
							variant={"secondary"}
							onClick={() => {
								navigate(-1);
							}}
						>
							Cancel
						</Button>
					) : (
						<Link to={"edit"} className={"btn btn-primary"}>
							Edit
						</Link>
					)}
				</nav>
				<div className="col-sm-6 mx-auto">
					<Card body className={"shadow-sm mb-3"}>
						<Card.Title>{data.id}</Card.Title>
						{isEdit ? <FormContents /> : <Contents />}
					</Card>
				</div>
			</section>
		</>
	);
}
