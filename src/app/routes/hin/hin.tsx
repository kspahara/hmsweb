import {
	// LoaderFunctionArgs,
	//  defer,
	NavLink,
} from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
// import { HinPage } from "../../pages/hin/hin";
import { getLocationPath } from "../../libs/libs.ts";

// export const clientLoader = async ({ request }: LoaderFunctionArgs) => {
// 	const url = new URL(request.url);
// 	const searchParams = url.searchParams;

// 	return defer({ searchParams });
// };

export const handle = {
	crumb: (match: { pathname: string }): JSX.Element => {
		const props = {
			linkAs: NavLink,
			linkProps: { to: `${match.pathname}`, end: true },
			active: getLocationPath() === match.pathname,
		};
		const label = "商品一覧";
		return <Breadcrumb.Item {...props}>{label}</Breadcrumb.Item>;
	},
};

// export function HinRoute(): JSX.Element {
// 	return <HinPage />;
// }

// HinRoute.loader = clientLoader;
// HinRoute.handle = handle;
