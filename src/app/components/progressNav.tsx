import { useProgressNav } from "../hooks/hooks.ts";

/**
 * ProgressNav
 * @returns {JSX.Element | null}
 */
export function ProgressNav(): JSX.Element | null {
	const { navigation, revalidator, fetcherInProgress, isDebugMode } = useProgressNav();

	return isDebugMode ? (
		<>
			<fieldset style={{ position: "fixed", top: "5rem", right: "1rem", zIndex: 1 }}>
				{navigation.state !== "idle" && <small>Navigation in progress...</small>}
				{revalidator.state !== "idle" && <small>Revalidation in progress...</small>}
				{fetcherInProgress && <small>Fetcher in progress...</small>}
				{/* localstrage */}
				<small className="text-muted">
					<div>{`isAuthenticated: ${localStorage.getItem("isAuthenticated")} `}</div>
					<div>{`usercd: ${localStorage.getItem("usercd")} `}</div>
					<div>{`username: ${localStorage.getItem("username")} `}</div>
					<div>{`token_id: ${localStorage.getItem("token_id")} `}</div>
				</small>
			</fieldset>
		</>
	) : null;
}
