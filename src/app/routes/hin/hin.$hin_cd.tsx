import { LoaderFunctionArgs } from "react-router-dom";
import { CrumbItem, Match } from "../../components/breadcrumbs.tsx";
import { getHinDetail } from "../../data/hin/hin.ts";
import { HinDetailPage } from "../../pages/hin/hin.$hin_cd.tsx";
import { getLocationPath } from "../../libs/libs.ts";

const clientLoader = async ({ params }: LoaderFunctionArgs) => {
	return {
		data: await getHinDetail(params.hin_cd),
	};
};

const createCrumb = (match: Match<{ results: { hin_nm: string }[] }>): JSX.Element => (
	<CrumbItem props={{ linkProps: { to: `${match.pathname}` }, active: getLocationPath() === match.pathname }} label={<>{match.data.data.results[0].hin_nm}</>} />
);

const handle = {
	crumb: createCrumb,
};

/**
 * HinDetailRoute
 * @returns
 */
export function HinDetailRoute(): JSX.Element {
	return <HinDetailPage />;
}

HinDetailRoute.loader = clientLoader;
HinDetailRoute.handle = handle;
