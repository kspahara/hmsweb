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
			</fieldset>
		</>
	) : null;
}
