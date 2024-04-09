import { CrumbItem } from "../../components/CrumbItem";
import { getLocationPath } from "../../libs/libs";

type Match = {
	pathname: string;
};

const createCrumb = (match: Match): JSX.Element => {
	const props = {
		linkProps: { to: `${match.pathname}`, end: true },
		active: getLocationPath() === match.pathname,
	};
	const label = <>{"Comments"}</>;

	return <CrumbItem props={props} label={label} />;
};

export const handle = {
	crumb: createCrumb,
};
