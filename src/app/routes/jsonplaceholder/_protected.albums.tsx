import { CrumbItem, Match } from "../../components/breadcrumbs";
import { getLocationPath } from "../../libs/libs";

const createCrumb = (match: Match<unknown>): JSX.Element => (
	<CrumbItem props={{ linkProps: { to: `${match.pathname}`, end: true }, active: getLocationPath() === match.pathname }} label={<>{"Albums"}</>} />
);

export const handle = {
	crumb: createCrumb,
};
