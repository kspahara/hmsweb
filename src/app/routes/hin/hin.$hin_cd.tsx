import { LoaderFunctionArgs } from "react-router-dom";
import { CrumbItem } from "../../components/CrumbItem.tsx";
import { getHinDetail } from "../../data/hin/hin.ts";
import { HinDetailPage } from "../../pages/hin/hin.$hin_cd.tsx";
import { getLocationPath } from "../../libs/libs.ts";

const clientLoader = async ({ params }: LoaderFunctionArgs) => {
	return { data: await getHinDetail(params.hin_cd) };
};

/**
 * @param T
 */
type Match<T> = {
	pathname: string;
	data: {
		data: {
			results: T[];
		};
	};
};

type Hin = {
	hin_nm: string;
};

const createCrumb = (match: Match<Hin>): JSX.Element => {
	const props = {
		linkProps: { to: `${match.pathname}` },
		active: getLocationPath() === match.pathname,
	};
	const label = <>{match.data.data.results[0].hin_nm}</>;

	return <CrumbItem props={props} label={label} />;
};

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
