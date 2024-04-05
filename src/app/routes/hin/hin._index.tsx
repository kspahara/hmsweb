import { LoaderFunctionArgs, defer } from "react-router-dom";
import { getHinCond } from "../../data/hin/getHinCond";
import { getHinList } from "../../data/hin/getHinList";
import { HinPage } from "../../pages/hin/hin._index";

export type SelectItem = {
	id: string;
	name: string;
	label: string;
};

const getSelectItems = async () => {
	const select_items: SelectItem[] = [
		{ id: "cat", name: "cat_cd", label: "出版社" },
		{ id: "extcat1", name: "ext_cat1_cd", label: "種類" },
		{ id: "extcat2", name: "ext_cat2_cd", label: "教材分類" },
		{ id: "extcat3", name: "ext_cat3_cd", label: "科目" },
		{ id: "extcat4", name: "ext_cat4_cd", label: "準拠" },
		{ id: "extcat5", name: "ext_cat5_cd", label: "学年" },
	];
	return select_items;
};

const getSearchParam = async (searchParams: URLSearchParams) => {
	const p_key = ["keyword", "cat_cd", "ext_cat1_cd", "ext_cat2_cd", "ext_cat3_cd", "ext_cat4_cd", "ext_cat5_cd"];
	const searchParams_key: Record<string, string> = {};
	p_key.forEach((key) => {
		searchParams_key[key] = searchParams.get(key) || "";
	});

	return searchParams_key;
};

const clientLoader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const search_params = url.searchParams;
	const [select_items, searchParams] = await Promise.all([getSelectItems(), getSearchParam(search_params)]);

	return defer({
		select_items,
		searchParams,
		hin_cond: getHinCond(),
		hin_list: getHinList(search_params),
	});
};

export function HinRoute(): JSX.Element {
	return <HinPage />;
}

HinRoute.loader = clientLoader;
