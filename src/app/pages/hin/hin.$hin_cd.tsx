import { Form, Button, Col, Row, Image, FloatingLabel, InputGroup, Card } from "react-bootstrap";
import { useHinDetailPage } from "../../hooks/hooks";

export function HinDetailPage(): JSX.Element {
	const { user, item, navigate, noImage } = useHinDetailPage();

	return (
		<>
			<section>
				<header>
					<h1 className={"h2"}>{"商品詳細"}</h1>
					<p>{"商品の詳細を表示します。"}</p>
					<nav className={"mb-2"}>
						<Button
							type={"button"}
							variant={"link"}
							onClick={() => {
								navigate(-1);
							}}
						>
							<i className="bi bi-chevron-left me-1" />
							商品一覧に戻る
						</Button>
					</nav>
				</header>
				<hr />
				<section id={"hin-detail-contents"}>
					<h2 className={"h4 mb-3"}>{item.hin_nm}</h2>
					<Card className={"shadow-sm"}>
						<Card.Body>
							<Row>
								<Col sm={5} md={4} lg={3}>
									<div className={"mb-3"}>
										<Image src={item.atch_flg === "1" ? `data:image/jpeg;base64,${item.atch_image}` : `${noImage}`} alt="image" fluid thumbnail />
									</div>
								</Col>
								<Col>
									<Card.Title>{item.hin_nm}</Card.Title>
									<Row as={"dl"}>
										<Col as={"dt"} md={3} className={"text-sm-end"}>
											{"商品番号："}
										</Col>
										<Col as={"dd"} md={9}>
											{item.hin_cd}
										</Col>
										<Col as={"dt"} md={3} className={"text-sm-end"}>
											{"商品名："}
										</Col>
										<Col as={"dd"} md={9}>
											{item.hin_nm}
										</Col>
										<Col as={"dt"} md={3} className={"text-sm-end"}>
											{"単価："}
										</Col>
										<Col as={"dd"} md={9}>
											&yen;{parseInt(item.tanka).toLocaleString()}
										</Col>
										<Col as={"dt"} md={3} className={"text-sm-end"}>
											{"ページ数："}
										</Col>
										<Col as={"dd"} md={9}>
											{!item.density ? "-" : item.density}
										</Col>
										<Col as={"dt"} md={3} className={"text-sm-end"}>
											{"判型："}
										</Col>
										<Col as={"dd"} md={9}>
											{!item.size_cd ? "-" : item.size_cd}
										</Col>
										<Col as={"dt"} md={3} className={"text-sm-end"}>
											{"付属品等："}
										</Col>
										<Col as={"dd"} md={9}>
											{!item.hosoku1 ? "-" : item.hosoku1}
										</Col>
									</Row>

									{user && (
										<Form>
											<InputGroup>
												<FloatingLabel controlId={`suryo`} label={"数量"}>
													<Form.Control type={"number"} placeholder={"数量を入力してください"} defaultValue={1} className={"text-end"} />
												</FloatingLabel>
												<Button type={"button"} variant={"primary"}>
													<i className="bi bi-cart-plus-fill me-1" />
												</Button>
											</InputGroup>
										</Form>
									)}
								</Col>
							</Row>
						</Card.Body>
						{item.biko1 && (
							<Card.Body>
								<section className={"_mb-3"}>
									<h2 className={"h4 border-bottom border-secondary"}>{"商品詳細"}</h2>
									<p>{item.biko1}</p>
								</section>
							</Card.Body>
						)}
					</Card>
				</section>
			</section>
		</>
	);
}
