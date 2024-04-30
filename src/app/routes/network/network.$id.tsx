import { CrumbItem, Match } from "../../components/breadcrumbs";
import { getLocationPath } from "../../libs/libs";
import { NetWorkIdPage } from "../../pages/network/network.$id"

function loader() {
  const message="detail page"
  return {message}
}

const createCrumb = (match: Match<{ name: string }>): JSX.Element => (
	<CrumbItem props={{ linkProps: { to: `${match.pathname}` }, active: getLocationPath() === match.pathname }} label={<>{`aaa`}</>} />
);

const handle = {
	crumb: createCrumb,
};

export function NetworkId() {
    return (<><NetWorkIdPage /></>)
}
NetworkId.loader=loader
NetworkId.handle = handle;