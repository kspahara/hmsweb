import { Link, Form as RouterForm, useLoaderData, useNavigate } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import { Forms, Form as FormType } from "../components/Forms";

export function ProtectedAlbumsIdPage(): JSX.Element {
	const { data, forms, users } = useLoaderData() as { data: Record<string, string>; forms: FormType[]; users: Record<string, string>[] };
	const isEdit = location.pathname.includes("edit");
	const navigate = useNavigate();
	// console.log("data", data);
	// console.log("forms", forms);

	const FormContents = (): JSX.Element => {
		return (
			<>
				<Form as={RouterForm} method={"post"} replace={true}>
					<fieldset disabled={!isEdit}>
						<Forms forms={forms} data={data} option={users} />
					</fieldset>
					<div className={"d-flex justify-content-between"}>
						<Button variant={"success"} type={"submit"}>
							Update
						</Button>
					</div>
				</Form>
			</>
		);
	};

	const Contents = (): JSX.Element => {
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
				<h2>ProtectedAlbumsIdPage</h2>
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
