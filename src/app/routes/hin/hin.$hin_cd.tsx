import { NavLink, LoaderFunctionArgs } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import { getHinDetail } from "../../data/hin/getHinDetail";
import { HinDetailPage } from "../../pages/hin/hin.$hin_cd";
import { getLocationPath } from "../../libs/libs";



const clientLoader = async ({ params }: LoaderFunctionArgs) => {
	return { data: await getHinDetail(params.hin_cd) };
};

const handle = {
	crumb: (match: { pathname: string; data: { data: { results: { hin_nm: string }[] } } }): JSX.Element => {
		const props = {
			linkAs: NavLink,
			linkProps: { to: `${match.pathname}` },
			active: getLocationPath() === match.pathname,
		};
		const label = match.data.data.results[0].hin_nm;
		return <Breadcrumb.Item {...props}>{label}</Breadcrumb.Item>;
	},
};

export function HinDetailRoute(): JSX.Element {
	return <HinDetailPage />;
}

HinDetailRoute.loader = clientLoader;
HinDetailRoute.handle = handle;
