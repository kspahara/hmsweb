import { useState } from "react";
import { Form as RouterForm, useLoaderData, useNavigate } from "react-router-dom";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { Album } from "../data/jsonplaceholder/getAlbums";

export function ProtectedAlbumsIdPage() {
	const [edit, setEdit] = useState(false);
	const { data } = useLoaderData() as { data: Album };
	const navigate = useNavigate();

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
					<Button variant={edit ? "secondary" : "primary"} type={"button"} onClick={() => setEdit(!edit)}>
						{edit ? "Cancel" : "Edit"}
					</Button>
				</nav>
				<div className="col-6 mx-auto">
					<h4>{data.id}</h4>
					<Form as={RouterForm} method={"post"}>
						<FloatingLabel controlId={"title"} label={"Title"} className={"mb-3"}>
							<Form.Control type={"text"} name={"title"} defaultValue={data.title} readOnly={!edit} plaintext={!edit} />
						</FloatingLabel>
						<FloatingLabel controlId={"userId"} label={"UserId"} className={"mb-3"}>
							<Form.Control type={"text"} name={"userId"} defaultValue={data.userId} readOnly={!edit} plaintext={!edit} />
						</FloatingLabel>
						<div className={"text-end"}>
							<Button variant={"success"} type={"submit"} hidden={!edit}>
								Update
							</Button>
						</div>
					</Form>
				</div>
			</section>
		</>
	);
}
