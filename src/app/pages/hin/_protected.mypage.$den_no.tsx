import { Link, Form as RouterForm } from "react-router-dom";
import { Button, Card, Form, Stack } from "react-bootstrap";
import { CreateForm } from "../../components/createForm.tsx";
import { useProtectedMypageIdPage } from "../../hooks/hooks.ts";
import { BackBtn } from "../../components/BackBtn.tsx";

export function ProtectedMypageIdPage(): JSX.Element {
	const { data, forms, searchies, message, isEdit } = useProtectedMypageIdPage();

	const FormContents = (): JSX.Element => {
		return (
			<>
				<Form as={RouterForm} method="post" replace={true}>
					<fieldset disabled={!isEdit}>
						<Stack gap={3}>
							{forms.map((form, index) => (
								<CreateForm key={index} form={form} data={data} option={searchies} />
							))}
							<div>
								<Button variant="success" type="submit">
									Update
								</Button>
							</div>
						</Stack>
					</fieldset>
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
				<header>
					<h1 className="h2">{message}</h1>
					<nav className="mb-3">
						<BackBtn label="Back" />
					</nav>
				</header>
				<hr />
				<section>
					<h2 className="h3">{data.title}</h2>
					{isEdit ? (
						<BackBtn variant="secondary" label="Cancel" />
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
