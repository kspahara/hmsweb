import { CrumbItem } from "../../components/CrumbItem.tsx";
import { getLocationPath } from "../../libs/libs.ts";

type Match = {
	pathname: string;
};

const createCrumb = (match: Match): JSX.Element => {
	const props = {
		linkProps: { to: `${match.pathname}`, end: true },
		active: getLocationPath() === match.pathname,
	};
	const label = <>{"商品一覧"}</>;

	return <CrumbItem props={props} label={label} />;
};

export const handle = {
	crumb: createCrumb,
};
