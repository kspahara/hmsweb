import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

/**
 * ReturnTopBtn
 * @returns
 */
export function ReturnTopBtn(): JSX.Element {
	const [isBtnActive, setIsBtnActive] = useState(false);
	const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

	useEffect(() => {
		const scrollWindow = () => setIsBtnActive(window.scrollY > 200);
		window.addEventListener("scroll", scrollWindow);
		return () => window.removeEventListener("scroll", scrollWindow);
	}, []);

	return (
		<>
			<aside
				className={`fixed-bottom d-flex justify-content-center mb-3 ${isBtnActive ? "opacity-75" : "opacity-0"}`}
				style={{
					transition: "0.5s",
				}}
			>
				<Button variant="secondary" className="rounded-pill shadow-sm" onClick={scrollTop} aria-label="ページ上部へ戻る" disabled={!isBtnActive}>
					<i className="bi bi-arrow-up me-1" />
					TOP
				</Button>
			</aside>
		</>
	);
}
