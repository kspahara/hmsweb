import { CrumbItem } from "../../components/CrumbItem";
import { getLocationPath } from "../../libs/libs";

type Match = {
	pathname: string;
};

const createCrumb = (match: Match): JSX.Element => {
	const props = {
		props: {
			linkProps: { to: `${match.pathname}`, end: true },
			active: getLocationPath() === match.pathname,
		},
		label: <>{"Albums"}</>,
	};

	return <CrumbItem {...props} />;
};

export const handle = {
	crumb: createCrumb,
};
