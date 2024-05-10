import { Suspense } from "react";
import { Await, Link, Form as RouterForm, useAsyncError } from "react-router-dom";
import { Alert, Badge, Button, Card, Col, FloatingLabel, Form, InputGroup, ListGroup, Row } from "react-bootstrap";
import { Fallback } from "./fallback";
import { parseInttoStr } from "../libs/libs";

type Props = {
	data: Record<string, string>[];
	user?: string | null;
	noImage?: string;
	type?: string;
};

const Error = () => {
	const error = useAsyncError() as Error;
	console.log("error", error);

	return (
		<Alert variant="danger">
			<i className="bi bi-exclamation-triangle-fill me-1" />
			{error.name} : {error.message}
		</Alert>
	);
};

/**
 *
 * @param props
 * @returns
 */
export function ContentArea(props: Props): JSX.Element {
	const { data, user, noImage, type } = props;

	return (
		<Suspense
			fallback={<Fallback />}
			children={
				<Await
					resolve={data}
					errorElement={<Error />}
					children={(data: Record<string, string>[]) => {
						const contentLists = (
							<Card className="shadow-sm mb-3">
								<ListGroup variant="flush">
									{data.map((item, index) => (
										<ListGroup.Item key={index} as={Link} to={`${item.id}`} className="d-flex" action>
											{item.id}
											<span className="mx-1">:</span>
											{item.title}
											<i className="bi bi-chevron-right ms-auto" />
										</ListGroup.Item>
									))}
								</ListGroup>
							</Card>
						);

						const contentCards = (
							<Row lg={5} xl={6} className="gx-2 gy-3">
								{data.map((post, index) => (
									<Col key={index} xs={6} sm={4} md={3} xl={2}>
										<Card className="h-100 shadow-sm">
											<Link to={`/hin/${post.hin_cd}`} className="h-100 d-flex flex-column text-reset text-decoration-none">
												<Card.Img
													decoding="async"
													loading="lazy"
													variant="top"
													src={post.atch_flg === "1" ? `data:image/jpeg;base64,${post.atch_image}` : `${noImage}`}
												/>
												<Card.Body className="d-flex flex-column p-2">
													<Card.Title className="h6">
														<Badge bg="info">{post.han_name}</Badge>
														<div>{post.hin_nm}</div>
													</Card.Title>
													<Card.Text className="h6 mt-auto text-end">&yen;{parseInttoStr(post.tanka)}</Card.Text>
												</Card.Body>
											</Link>
											{user && (
												<Card.Footer className="p-2 bg-transparent">
													<div className="d-grid">
														<Form as={RouterForm}>
															<InputGroup>
																<FloatingLabel controlId={`suryo${index}`} label="数量">
																	<Form.Control type="number" placeholder="数量を入力してください" defaultValue={1} className="text-end" />
																</FloatingLabel>
																<Button type="button" variant="primary">
																	<i className="bi bi-cart-plus-fill me-1" />
																</Button>
															</InputGroup>
														</Form>
													</div>
												</Card.Footer>
											)}
										</Card>
									</Col>
								))}
							</Row>
						);

						return (
							<>
								<div id="list-header" className="text-end mb-2">
									<span className="me-1">count:</span>
									<span>{data.length}</span>
								</div>
								<div id="list-body">{type === "list" ? contentLists : contentCards}</div>
							</>
						);
					}}
				/>
			}
		/>
	);
}