import { Card, FloatingLabel, Form, ListGroup, Button } from "react-bootstrap";
import { useProtectedCartPage } from "../../hooks/hooks.ts";
import { useFetcher } from "react-router-dom";

/**
 *
 * @returns
 */
export function ProtectedCartPage(): JSX.Element {
	const { data, message } = useProtectedCartPage();
	const fetcher = useFetcher();
	const FeacherForm = fetcher.Form;

	return (
		<>
			<section id="protected-alubums-page">
				<header>
					<h1 className="h2">{message}</h1>
					<p>Protected Cart</p>
				</header>
				<hr />
				<section>
					<h2 className="h3">Cart</h2>
					<div id="content">
						<Card body className="shadow-sm mb-3">
							<Card.Text as={"dl"}>
								<dt>zeinuki_gaku</dt>
								<dd>{data.head.zeinuki_gaku}</dd>
							</Card.Text>
						</Card>
						<Card className="shadow-sm mb-3">
							<ListGroup variant="flush">
								{data.details.map((item, index) => (
									<ListGroup.Item key={index}>
										<dl>
											<dt>row_no</dt>
											<dd>{item.row_no}</dd>
											<dt>disc_per</dt>
											<dd>{item.disc_per}</dd>
											<dt>hin_cd</dt>
											<dd>{item.hin_cd}</dd>
											<dt>hin_nm</dt>
											<dd>{item.hin_nm}</dd>
											<dt>htanka</dt>
											<dd>{item.htanka}</dd>
											<dt>kingaku</dt>
											<dd>{item.kingaku}</dd>
											{/* <dt>suryo</dt>
											<dd>{item.suryo}</dd> */}
											<FloatingLabel controlId={`suryo${index}`} label="数量">
												<Form.Control type="number" name="suryo" placeholder="数量を入力してください" defaultValue={1} className="text-end" />
											</FloatingLabel>
											<dt>tanka</dt>
											<dd>{item.tanka}</dd>
											<dt>zei_kbn</dt>
											<dd>{item.zei_kbn}</dd>
											<dt>zei_rate</dt>
											<dd>{item.zei_rate}</dd>
										</dl>
										<Form as={FeacherForm} method="post" name="form_cart">
											<Button type="submit" name="row_no" value={item.row_no} variant="danger">
												<i className="bi bi-trash me-1"></i>
												削除
											</Button>
										</Form>
									</ListGroup.Item>
								))}
							</ListGroup>
						</Card>
					</div>
				</section>
			</section>
		</>
	);
}
