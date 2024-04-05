import { Suspense, useEffect, useState } from "react";
import { Await, Form, Link, useLoaderData, useSubmit } from "react-router-dom";
import { Badge, Card, Col, ListGroup, Row, Stack } from "react-bootstrap";
import { CreateForm, FormType } from "../../components/CreateForm.tsx";
import { Fallback } from "../../components/Fallback.tsx";
import { Album } from "../../data/jsonplaceholder/albums.ts";

export function ProtectedAlbumsPage() {
	const { data, searchParams, forms, users, message } = useLoaderData() as {
		data: Record<string, string>;
		searchParams: Record<string, string>;
		forms: FormType[];
		users: Record<string, string>[];
		message: string;
	};
	const submit = useSubmit();
	const [query, setQuery] = useState<Record<string, string>>({
		userId: searchParams.userId,
		title: searchParams.title,
	});
	useEffect(() => {
		setQuery({
			userId: searchParams.userId,
			title: searchParams.title,
		});
	}, [searchParams]);

	return (
		<>
			<section id={"protected-alubums-page"}>
				<header>
					<h1 className={"h2"}>{message}</h1>
					<p>Protected Albums</p>
					<div id={"search"}>
						<Form role="search" onChange={(event) => submit(event.currentTarget)}>
							<Row className={"g-3"}>
								<Suspense fallback={<Fallback />}>
									<Await
										resolve={users}
										errorElement={<div>Error</div>}
										children={(users): JSX.Element => (
											<>
												{forms.map((form, index) => (
													<Col md key={index}>
														<CreateForm
															form={form}
															data={data}
															value={query[form.controlId]}
															event={(e) => setQuery({ ...query, [form.controlId]: e.target.value })}
															option={users}
														/>
													</Col>
												))}

												<Stack direction={"horizontal"} gap={2}>
													{users
														.filter((item: Record<string, string>) => item.id == query.userId)
														.map((item: Record<string, string>, index: number) => (
															<Badge
																role="button"
																key={index}
																bg={"secondary"}
																pill={false}
																className={"btn"}
																aroa-label={"Remove"}
																onClick={() => {
																	setQuery({ userId: "" });
																	submit({ userId: "" });
																}}
															>
																<i className={"bi bi-x me-1"}></i>
																{item.name}
															</Badge>
														))}
												</Stack>
											</>
										)}
									/>
								</Suspense>
							</Row>
						</Form>
					</div>
				</header>
				<hr />
				<section>
					<h2 className={"h3"}>{"Album List"}</h2>

					<Suspense fallback={<ListGroup.Item>Loading...</ListGroup.Item>}>
						<Await resolve={data} errorElement={<div>Error</div>}>
							{(data: Album[]): JSX.Element => (
								<>
									<div id={"list-header"} className={"text-end mb-2"}>
										<span className={"me-1"}>count:</span>
										<span>{data.length}</span>
									</div>
									<div id={"list-body"}>
										<Card className={"shadow-sm mb-3"}>
											<ListGroup variant={"flush"}>
												{data.map((item, index) => (
													<ListGroup.Item key={index} as={Link} to={`${item.id}`} className={"d-flex"} action>
														{item.id}
														<span className={"mx-1"}>:</span>
														{item.title}
														<i className={"bi bi-chevron-right ms-auto"}></i>
													</ListGroup.Item>
												))}
											</ListGroup>
										</Card>
									</div>
								</>
							)}
						</Await>
					</Suspense>
				</section>
			</section>
		</>
	);
}
