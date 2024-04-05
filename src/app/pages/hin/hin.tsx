import { Outlet } from "react-router-dom";

export function HinPage(): JSX.Element {
	return (
		<>
			<section>
				<header>
					<h1 className={"h2"}>{"商品案内"}</h1>
					<p>{"商品の一覧を表示します。"}</p>
				</header>
				<hr />
				<Outlet />
			</section>
		</>
	);
}
