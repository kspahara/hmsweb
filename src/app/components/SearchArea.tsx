import { Suspense } from "react";
import { Await, Form } from "react-router-dom";
import { Badge, Col, Row, Stack } from "react-bootstrap";
import { CreateForm, FormType } from "./CreateForm.tsx";
import { Fallback } from "./Fallback.tsx";

type Props = {
	forms: FormType[];
	searchies: Record<string, string>[];
	query: Record<string, string>;
	setQuery: (query: Record<string, string>) => void;
	submit: (query: Record<string, string>, options: { replace: boolean }) => void;
};

export function SearchArea(props: Props): JSX.Element {
	const { forms, searchies, query, setQuery, submit } = props;

	return (
		<>
			<Form role="search" onChange={(e) => submit(e.currentTarget, { replace: true })}>
				<Row className={"g-3"}>
					<Suspense fallback={<Fallback />}>
						<Await
							resolve={searchies}
							errorElement={<div>Error</div>}
							children={(searchies): JSX.Element => (
								<>
									{forms.map((form, index) => {
										const { name } = form;
										return (
											<Col md key={index}>
												<CreateForm form={form} value={query[name]} event={(e) => setQuery({ ...query, [name]: e.currentTarget.value })} option={searchies} />
											</Col>
										);
									})}
									<Stack direction={"horizontal"} gap={2}>
										{forms.map((form, index) => {
											const { name, optionKey } = form;
											return (
												query[name] && (
													<Badge
														role={"button"}
														key={index}
														bg={"secondary"}
														pill={false}
														className={"btn mt-3"}
														onClick={() => {
															setQuery({ ...query, [name]: "" });
															submit({ ...query, [name]: "" }, { replace: true });
														}}
													>
														<i className={"bi bi-x me-1"}></i>
														{optionKey ? searchies.find((item: Record<string, string>) => item.id == query[name])?.name : query[name]}
													</Badge>
												)
											);
										})}
									</Stack>
								</>
							)}
						/>
					</Suspense>
				</Row>
			</Form>
		</>
	);
}
