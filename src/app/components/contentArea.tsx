import { Suspense } from "react";
import { Await, Link } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";

type Props = {
	data: Record<string, string>[];
};

/**
 *
 * @param props
 * @returns
 */
export function ContentArea(props: Props): JSX.Element {
	const { data } = props;

	return (
		<>
			<Suspense fallback={<ListGroup.Item>Loading...</ListGroup.Item>}>
				<Await
					resolve={data}
					errorElement={<div>Error</div>}
					children={(data: Record<string, string>[]): JSX.Element => {
						const processedData = data.map((item) => {
							return {
								id: item.id,
								title: item.title,
							};
						});

						return (
							<>
								<div id={"list-header"} className={"text-end mb-2"}>
									<span className={"me-1"}>count:</span>
									<span>{processedData.length}</span>
								</div>
								<div id={"list-body"}>
									<Card className={"shadow-sm mb-3"}>
										<ListGroup variant={"flush"}>
											{processedData.map((item, index) => (
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
						);
					}}
				/>
			</Suspense>
		</>
	);
}
