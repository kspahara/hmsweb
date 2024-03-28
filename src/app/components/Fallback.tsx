import { Spinner } from "react-bootstrap";

export function Fallback(props: { animation?: "border" | "grow" }) {
	const animation = props.animation;

	return (
		<>
			<div id={"fallback"} className={"text-center"}>
				<Spinner as={"span"} animation={animation} size={"sm"} variant={"secondary"} role={"status"} aria-hidden={"true"}>
					<span className={"visually-hidden"}>{"Loading..."}</span>
				</Spinner>
			</div>
		</>
	);
}
