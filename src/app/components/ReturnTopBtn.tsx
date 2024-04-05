import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export const ReturnTopBtn = () => {
	const [isBtnActive, setIsBtnActive] = useState(false);
	const scrollWindow = () => {
		setIsBtnActive(window.scrollY > 200);
	};
	useEffect(() => {
		window.addEventListener("scroll", scrollWindow);
		return () => window.removeEventListener("scroll", scrollWindow);
	}, []);

	return (
		<>
			<aside
				className={"fixed-bottom d-flex justify-content-center mb-3"}
				style={{
					opacity: isBtnActive ? 0.9 : 0,
					transition: "0.5s",
				}}
			>
				<Button variant={"secondary"} className={"rounded-pill"} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label={"ページ上部へ戻る"}>
					<i className={"bi bi-arrow-up me-1"}></i>TOP
				</Button>
			</aside>
		</>
	);
};
