import { NavLink } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";

type CrumbItemProps = {
	props: {
		linkProps: { to: string; end?: boolean };
		active: boolean;
	};
	label: JSX.Element;
};

export function CrumbItem({ props, label }: CrumbItemProps): JSX.Element {
	return (
		<Breadcrumb.Item {...props} linkAs={NavLink}>
			{label}
		</Breadcrumb.Item>
	);
}
