import { Suspense, useEffect, useState } from "react";
import { Await, Form, Link, useLoaderData, useSubmit } from "react-router-dom";
import { Badge, Card, ListGroup, Stack } from "react-bootstrap";
import { FloatingForms, Form as FormType } from "../../components/FloatingForms";
import { Fallback } from "../../components/Fallback";
import { Album } from "../../data/jsonplaceholder/albums";

export function ProtectedAlbumsPage() {
	const { data, searchParams, forms, users, message } = useLoaderData() as {
		data: Record<string, string>;
		searchParams: URLSearchParams;
		forms: FormType[];
		users: Record<string, string>[];
		message: string;
	};
	const submit = useSubmit();
	const userId = searchParams.get("userId");
	const [query, setQuery] = useState({
		userId: userId || "",
	});
	useEffect(() => {
		setQuery({
			userId: userId || "",
		});
	}, [userId]);

	return (
		<>
			<section id={"protected-alubums-page"}>
				<header>
					<h1 className={"h2"}>{message}</h1>
					<p>Protected Albums</p>
					<div id={"search"}>
						<Form role="search" onChange={(event) => submit(event.currentTarget)}>
							<Suspense fallback={<Fallback />}>
								<Await
									resolve={users}
									errorElement={<div>Error</div>}
									children={(users): JSX.Element => (
										<>
											<FloatingForms forms={forms} data={data} value={query.userId} event={(value) => setQuery({ ...query, userId: value })} option={users} />
											<Stack direction={"horizontal"} gap={2}>
												{users
													.filter((item: Record<string, string>) => item.id == query.userId)
													.map((item: Record<string, string>, index: number) => (
														<Badge
															role="button"
															key={index}
															bg={"secondary"}
															pill={false}
															className="btn"
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
						</Form>
					</div>
				</header>
				<hr />
				<section>
					<h2 className={"h3"}>{"Album List"}</h2>
					<Card className={"shadow-sm mb-3"}>
						<ListGroup variant={"flush"}>
							<Suspense fallback={<ListGroup.Item>Loading...</ListGroup.Item>}>
								<Await resolve={data} errorElement={<div>Error</div>}>
									{(data: Album[]): JSX.Element => (
										<>
											{data.map((item, index) => (
												<ListGroup.Item key={index} as={Link} to={`${item.id}`} className={"d-flex"} action>
													{item.id}
													<span className={"mx-1"}>:</span>
													{item.title}
													<i className={"bi bi-chevron-right ms-auto"}></i>
												</ListGroup.Item>
											))}
										</>
									)}
								</Await>
							</Suspense>
						</ListGroup>
					</Card>
				</section>
			</section>
		</>
	);
}
