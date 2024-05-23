import { CrumbItem, Match } from "../../components/breadcrumbs.tsx";
import { getLocationPath } from "../../libs/libs.ts";

export const handle = {
  crumb: (match: Match<unknown>): JSX.Element => (
    <CrumbItem props={{ linkProps: { to: `${match.pathname}`, end: true }, active: getLocationPath() === match.pathname }} label={<>{"Mypage Adimn"}</>} />
  ),
};
