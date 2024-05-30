import { useProgressNav } from "../hooks/hooks.ts";
import { authProvider } from "../provides/auth.ts";

/**
 * ProgressNav
 * @returns {JSX.Element | null}
 */
export function ProgressNav(): JSX.Element | null {
  const { navigation, revalidator, fetcherInProgress, isDebugMode } = useProgressNav();

  return isDebugMode ? (
    <>
      <fieldset style={{ position: "fixed", top: "5rem", right: "1rem", zIndex: 1 }}>
        {/* localstrage */}
        <small className="text-muted">
          <div>{`isAuthenticated: ${authProvider.isAuthenticated}`}</div>
          <div>{`user_cd: ${authProvider.user_cd}`}</div>
          <div>{`user_name: ${authProvider.user_name}`}</div>
          <div>{`user_kind: ${authProvider.user_kind}`}</div>
          <div>{`token_id: ${authProvider.token_id}`}</div>
          <div>{`session_id: ${authProvider.session_id}`}</div>
          <div>{`tok_cd: ${authProvider.tok_cd}`}</div>
        </small>
        {navigation.state !== "idle" && <small>Navigation in progress...</small>}
        {revalidator.state !== "idle" && <small>Revalidation in progress...</small>}
        {fetcherInProgress && <small>Fetcher in progress...</small>}
      </fieldset>
    </>
  ) : null;
}
