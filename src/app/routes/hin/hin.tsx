import { CrumbItem, Match } from "../../components/breadcrumbs.tsx";
import { getLocationPath } from "../../libs/libs.ts";

const createCrumb = (match: Match<unknown>): JSX.Element => (
	<CrumbItem props={{ linkProps: { to: `${match.pathname}`, end: true }, active: getLocationPath() === match.pathname }} label={<>{"商品一覧"}</>} />
);

export const handle = {
	crumb: createCrumb,
};
