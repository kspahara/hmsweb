import { Suspense, useEffect, useState } from "react";
import { Badge, Card, InputGroup, Accordion, Alert, Button, Col, FloatingLabel, Form, Row, Spinner } from "react-bootstrap";
import { Link, useRouteLoaderData, Await, useLoaderData, Form as RouterForm, useSubmit, useNavigation } from "react-router-dom";
import noImage from "../../assets/images/no_image.png";
import { parseInttoStr } from "../../libs/libs";
import { HinCond } from "../../data/hin/getHinCond";
import { Fallback } from "../../components/Fallback";
import { SelectItem } from "../../routes/hin/hin._index";

const HinSearchArea = (): JSX.Element => {
	const Contents = (): JSX.Element => {
		interface HinConds {
			results: HinCond[];
		}
		const { select_items, hin_cond, searchParams } = useLoaderData() as { select_items: SelectItem[]; hin_cond: HinConds; searchParams: Record<string, string> };

		const [value, setValue] = useState<Record<string, string>>({
			keyword: searchParams.keyword,
			cat_cd: searchParams.cat_cd,
			ext_cat1_cd: searchParams.ext_cat1_cd,
			ext_cat2_cd: searchParams.ext_cat2_cd,
			ext_cat3_cd: searchParams.ext_cat3_cd,
			ext_cat4_cd: searchParams.ext_cat4_cd,
			ext_cat5_cd: searchParams.ext_cat5_cd,
		});

		useEffect(() => {
			setValue({
				keyword: searchParams.keyword,
				cat_cd: searchParams.cat_cd,
				ext_cat1_cd: searchParams.ext_cat1_cd,
				ext_cat2_cd: searchParams.ext_cat2_cd,
				ext_cat3_cd: searchParams.ext_cat3_cd,
				ext_cat4_cd: searchParams.ext_cat4_cd,
				ext_cat5_cd: searchParams.ext_cat5_cd,
			});
		}, [searchParams]);
		const submit = useSubmit();
		console.log("submit", submit);
		const navigation = useNavigation();
		const isSearching = navigation.formData?.get("keyword") != null;

		return (
			<>
				<Form
					as={RouterForm}
					role={"search"}
					// onChange={(event) => {
					// 	const isFirstSearch = searchParams.get("keyword") === null;
					// 	console.log("searchParams", searchParams.get("keyword"));
					// 	console.log("isFirstSearch", isFirstSearch);
					// 	submit(event.currentTarget, {
					// 		replace: !isFirstSearch,
					// 	});
					// }}
				>
					<fieldset disabled={isSearching}>
						<FloatingLabel controlId={"keyword"} label={"キーワード検索"} className={"mb-3"}>
							<Form.Control
								type={"search"}
								name={"keyword"}
								placeholder={"キーワードで絞り込む"}
								value={value.keyword}
								onChange={(e) => {
									// submit(e.currentTarget.form as HTMLFormElement);
									setValue({ ...value, keyword: e.target.value });
								}}
							/>
						</FloatingLabel>
						<div className={"gy-3"}>
							<fieldset>
								<legend className={"h6"}>{"絞り込む"}</legend>
								<Row>
									{select_items.map((selectId, index) => (
										<Col key={index} md={6} lg={2}>
											<FloatingLabel controlId={selectId.id} label={selectId.label} className={"mb-3"}>
												<Suspense fallback={<Form.Select />}>
													<Await resolve={hin_cond} errorElement={<Alert variant={"danger"}>{"商品が見つかりませんでした"}</Alert>}>
														{(hin_cond): JSX.Element => (
															<Form.Select
																aria-label={selectId.id}
																name={selectId.name}
																// defaultValue={value[selectId.name]}
																value={value[selectId.name]}
																onChange={(e) => {
																	// submit(e.currentTarget.form as HTMLFormElement);
																	setValue({ ...value, [selectId.name]: e.target.value });
																}}
															>
																{hin_cond.results[selectId.id].map((item: HinCond, index: number) => (
																	<option key={index} value={index === 0 ? "" : item.han_cd}>
																		{index === 0 ? "" : item.han_name}
																	</option>
																))}
															</Form.Select>
														)}
													</Await>
												</Suspense>
											</FloatingLabel>
										</Col>
									))}
								</Row>
							</fieldset>
							<div className={"text-end"}>
								<Button
									variant={"secondary"}
									type={"button"}
									className={"me-2"}
									onClick={(e) => {
										setValue({
											keyword: "",
											cat_cd: "",
											ext_cat1_cd: "",
											ext_cat2_cd: "",
											ext_cat3_cd: "",
											ext_cat4_cd: "",
											ext_cat5_cd: "",
										});
										// submit(e.currentTarget.form as HTMLFormElement);
										e.currentTarget.form?.reset();
									}}
								>
									{isSearching ? (
										<>
											<Spinner size={"sm"} role={"status"} aria-hidden={"true"} className={"me-1"}>
												<span className={"visually-hidden"}>{"Loading..."}</span>
											</Spinner>
										</>
									) : (
										<i className={"bi bi-arrow-counterclockwise me-1"}></i>
									)}
									{"リセット"}
								</Button>
								<Button variant={"primary"} type={"submit"}>
									<i className={"bi bi-search me-1"}></i>
									{"検索"}
								</Button>
							</div>
						</div>
					</fieldset>
				</Form>
			</>
		);
	};

	return (
		<>
			<div id={"hin-search-area"} className={"mb-3"}>
				<Accordion defaultActiveKey={"0"} className={"shadow-sm"}>
					<Accordion.Item eventKey={"0"}>
						<Accordion.Header as={"div"}>
							<i className={"bi bi-funnel-fill"}></i>
						</Accordion.Header>
						<Accordion.Body>
							<Contents />
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
			</div>
		</>
	);
};

const HinContentsArea = (): JSX.Element => {
	interface HinList {
		hin_cd: string;
		han_name: string;
		hin_nm: string;
		tanka: string;
		atch_flg: string;
		atch_image: string;
	}
	interface HinLists {
		results: HinList[];
	}
	const { user } = useRouteLoaderData("root") as { user: string | null };
	const { hin_list } = useLoaderData() as { hin_list: HinLists };

	return (
		<>
			<div id={"hin-content-area"}>
				{/* {hin_list.results.length === 0 && <Alert variant={"danger"}>{"商品が見つかりませんでした"}</Alert>}
				<div id={"list-header"} className={"text-end mb-2"}>
					<span className={"me-1"}>{"count:"}</span>
					<span>{hin_list.results.length}</span>
				</div>
				<div id={"list-body"}>
					<Row lg={5} xl={6} className={"gx-2 gy-3"}>
						{hin_list.results.map((post: HinList, index: number) => (
							<Col key={index} xs={6} sm={4} md={3} xl={2}>
								<Card className={"h-100 shadow-sm"}>
									<Link to={`/${post.hin_cd}`} className={"h-100 d-flex flex-column text-reset text-decoration-none"}>
										<Card.Img
											decoding={"async"}
											loading={"lazy"}
											variant={"top"}
											src={post.atch_flg === "1" ? `data:image/jpeg;base64,${post.atch_image}` : `${noImage}`}
										/>
										<Card.Body className={"d-flex flex-column p-2"}>
											<Card.Title className={"h6"}>
												<Badge bg={"info"}>{post.han_name}</Badge>
												<div>{post.hin_nm}</div>
											</Card.Title>
											<Card.Text className={"h6 mt-auto text-end"}>&yen;{parseInttoStr(post.tanka)}</Card.Text>
										</Card.Body>
									</Link>
									{user && (
										<Card.Footer className={"p-2 bg-transparent"}>
											<div className={"d-grid"}>
												<Form as={RouterForm}>
													<InputGroup>
														<FloatingLabel controlId={`suryo${index}`} label={"数量"}>
															<Form.Control type={"number"} placeholder={"数量を入力してください"} defaultValue={1} className={"text-end"} />
														</FloatingLabel>
														<Button type={"button"} variant={"primary"}>
															<i className={"bi bi-cart-plus-fill me-1"}></i>
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
				</div> */}

				<Suspense fallback={<Fallback />}>
					<Await resolve={hin_list} errorElement={<Alert variant={"danger"}>{"商品が見つかりませんでした"}</Alert>}>
						{(hin_list): JSX.Element => (
							<>
								<div id={"list-header"} className={"text-end mb-2"}>
									<span className={"me-1"}>count:</span>
									<span>{hin_list.results.length}</span>
								</div>
								<div id={"list-body"}>
									<Row lg={5} xl={6} className={"gx-2 gy-3"}>
										{hin_list.results.map((post: HinList, index: number) => (
											<Col key={index} xs={6} sm={4} md={3} xl={2}>
												<Card className={"h-100"}>
													<Link to={`/hin/${post.hin_cd}`} className={"h-100 d-flex flex-column text-reset text-decoration-none"}>
														<Card.Img
															decoding={"async"}
															loading={"lazy"}
															variant={"top"}
															src={post.atch_flg === "1" ? `data:image/jpeg;base64,${post.atch_image}` : `${noImage}`}
														/>
														<Card.Body className={"d-flex flex-column p-2"}>
															<Card.Title className={"h6"}>
																<Badge bg={"info"}>{post.han_name}</Badge>
																<div>{post.hin_nm}</div>
															</Card.Title>
															<Card.Text className={"h6 mt-auto text-end"}>&yen;{parseInttoStr(post.tanka)}</Card.Text>
														</Card.Body>
													</Link>
													{user && (
														<Card.Footer className={"p-2 bg-transparent"}>
															<div className={"d-grid"}>
																<Form as={RouterForm}>
																	<InputGroup>
																		<FloatingLabel controlId={`suryo${index}`} label={"数量"}>
																			<Form.Control
																				type={"number"}
																				placeholder={"数量を入力してください"}
																				defaultValue={1}
																				className={"text-end"}
																			/>
																		</FloatingLabel>
																		<Button type={"button"} variant={"primary"}>
																			<i className={"bi bi-cart-plus-fill me-1"}></i>
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
								</div>
							</>
						)}
					</Await>
				</Suspense>
			</div>
		</>
	);
};

export function HinPage(): JSX.Element {
	const navigation = useNavigation();
	const isLoading = navigation.state === "loading";

	return (
		<>
			<section id={"hin-contents"}>
				<h2 className={"h3 mb-3"}>{"商品を探す"}</h2>
				<HinSearchArea />
				<div id={"hin-contents-page"} className={`${isLoading ? "loading" : ""}`}>
					<HinContentsArea />
				</div>
			</section>
		</>
	);
}
