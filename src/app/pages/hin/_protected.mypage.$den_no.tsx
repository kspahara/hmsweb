import { Card, ListGroup } from "react-bootstrap";
import { useProtectedMypageDenNoPage } from "../../hooks/hooks.ts";
import { BackBtn } from "../../components/BackBtn.tsx";
import { parseInttoStr } from "../../libs/libs.ts";

export function ProtectedMypageDenNoPage(): JSX.Element {
	const { data, message } = useProtectedMypageDenNoPage();

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
					<h2 className="h3">{data.details[0].den_no}</h2>
					<div className="col-sm-6 mx-auto">
						<Card className="shadow-sm mb-3">
							<Card.Body>
								<dl>
									<dt>den_no</dt>
									<dd>{data.details[0].den_no}</dd>
									<dt>den_no_view</dt>
									<dd>{data.details[0].den_no_view}</dd>
									<dt>syori_ymd</dt>
									<dd>{data.details[0].syori_ymd}</dd>
									<dt>tok_cd</dt>
									<dd>{data.details[0].tok_cd}</dd>
									<dt>tok_nm</dt>
									<dd>{data.details[0].tok_nm}</dd>
									<dt>tor_kbn_key</dt>
									<dd>{data.details[0].tor_kbn_key}</dd>
									<dt>tor_kbn</dt>
									<dd>{data.details[0].tor_kbn}</dd>
								</dl>
							</Card.Body>
							<ListGroup variant="flush">
								{data.details.map((detail, index) => (
									<ListGroup.Item key={index}>
										<dl className="mb-0">
											<dt>row_no</dt>
											<dd>{detail.row_no}</dd>
											<dt>hin_cd</dt>
											<dd>{detail.hin_cd}</dd>
											<dt>hin_nm</dt>
											<dd>{detail.hin_nm}</dd>
											<dt>suryo</dt>
											<dd>{detail.suryo}</dd>
											<dt>tanka</dt>
											<dd>&yen;{parseInttoStr(detail.tanka)}</dd>
											<dt>kingaku</dt>
											<dd>&yen;{parseInttoStr(detail.kingaku)}</dd>
										</dl>
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
