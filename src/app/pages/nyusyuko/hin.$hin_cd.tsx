import { Fragment } from "react";
import { Form, Button, Col, Row, Image, FloatingLabel, InputGroup, Card } from "react-bootstrap";
import { BackBtn } from "../../components/BackBtn.tsx";
import { useHinDetailPage } from "../../hooks/hooks.ts";

export function HinDetailPage(): JSX.Element {
	const { user, item, noImage } = useHinDetailPage();
	const itemSrc = item.atch_flg === "1" ? `data:image/jpeg;base64,${item.atch_image}` : `${noImage}`;
	const itemDetails = [
		{ label: "商品番号：", value: item.hin_cd ? item.hin_cd : "-" },
		{ label: "商品名：", value: item.hin_nm ? item.hin_nm : "-" },
		{ label: "単価：", value: `¥${item.tanka ? parseInt(item.tanka).toLocaleString() : "-"}` },
		{ label: "ページ数：", value: item.density ? item.density : "-" },
		{ label: "判型：", value: item.size_cd ? item.size_cd : "-" },
		{ label: "付属品等：", value: item.hosoku1 ? item.hosoku1 : "-" },
	];

	return (
		<>
			<section>
				<header>
					<h1 className="h2">商品詳細</h1>
					<p>商品の詳細を表示します。</p>
					<nav className="mb-2">
						<BackBtn label="商品一覧に戻る" />
					</nav>
				</header>
				<hr />
				<section id="hin-detail-contents">
					<h2 className="h4 mb-3">{item.hin_nm}</h2>
					<Card className="shadow-sm">
						<Card.Body>
							<Row>
								<Col sm={5} md={4} lg={3}>
									<div className="mb-3">
										<Image src={itemSrc} alt="image" fluid thumbnail />
									</div>
								</Col>
								<Col>
									<Card.Title>{item.hin_nm}</Card.Title>
									<Row as="dl">
										{itemDetails.map((detail, index) => (
											<Fragment key={index}>
												<Col as="dt" md={3} className="text-sm-end">
													{detail.label}
												</Col>
												<Col as="dd" md={9}>
													{detail.value}
												</Col>
											</Fragment>
										))}
									</Row>

									{user && (
										<Form>
											<InputGroup>
												<FloatingLabel controlId="suryo" label="数量">
													<Form.Control type="number" placeholder="数量を入力してください" defaultValue={1} className="text-end" />
												</FloatingLabel>
												<Button type="button" variant="primary">
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
								<section>
									<h2 className="h4 border-bottom border-secondary">商品詳細</h2>
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
