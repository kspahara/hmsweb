import { useFetchers, useNavigation, useRevalidator } from "react-router-dom";

export function ProgressNav(): JSX.Element {
	const navigation = useNavigation();
	const revalidator = useRevalidator();
	const fetchers = useFetchers();
	const fetcherInProgress = fetchers.some((f) => ["loading", "submitting"].includes(f.state));
	const username = localStorage.getItem("username");
	const isAuthenticated = localStorage.getItem("isAuthenticated");

	return (
		<>
			<fieldset style={{ position: "fixed", top: "5rem", right: "1rem", zIndex: 1 }}>
				<legend className={"h6"}>Debug</legend>
				<div>username: {username ? username : "null"}</div>
				<div>isAuthenticated: {isAuthenticated ? isAuthenticated : "null"}</div>
				{navigation.state !== "idle" && <small>Navigation in progress...</small>}
				{revalidator.state !== "idle" && <small>Revalidation in progress...</small>}
				{fetcherInProgress && <small>Fetcher in progress...</small>}
			</fieldset>
		</>
	);
}
