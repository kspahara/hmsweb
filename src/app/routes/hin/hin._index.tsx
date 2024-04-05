import { LoaderFunctionArgs, defer } from "react-router-dom";
import { getHinCond } from "../../data/hin/getHinCond.ts";
import { getHinList } from "../../data/hin/getHinList.ts";
import { HinIndexPage } from "../../pages/hin/hin._index.tsx";
import { FormType } from "../../components/CreateForm.tsx";

const getSearchParam = async (searchParams: URLSearchParams) => {
	const p_key = ["keyword", "cat_cd", "ext_cat1_cd", "ext_cat2_cd", "ext_cat3_cd", "ext_cat4_cd", "ext_cat5_cd"];
	const searchParams_key: Record<string, string> = {};
	p_key.forEach((key) => {
		searchParams_key[key] = searchParams.get(key) || "";
	});

	return searchParams_key;
};

const getForms = async () => {
	const forms: FormType[] = [
		{
			type: "search",
			controlId: "keyword",
			name: "keyword",
			label: "キーワード検索",
			placeholder: "キーワードで絞り込む",
			ariaLabel: "KeywordSearch",
		},
		{
			as: "select",
			controlId: "cat",
			name: "cat_cd",
			label: "出版社:",
			placeholder: "",
			ariaLabel: "Publisher",
			optionKey: { key: "han_cd", value: "han_name" },
		},
		{
			as: "select",
			controlId: "extcat1",
			name: "ext_cat1_cd",
			label: "種類:",
			placeholder: "",
			ariaLabel: "Type",
			optionKey: { key: "han_cd", value: "han_name" },
		},
		{
			as: "select",
			controlId: "extcat2",
			name: "ext_cat2_cd",
			label: "教材分類:",
			placeholder: "",
			ariaLabel: "TextbookClassification",
			optionKey: { key: "han_cd", value: "han_name" },
		},
		{
			as: "select",
			controlId: "extcat3",
			name: "ext_cat3_cd",
			label: "科目:",
			placeholder: "",
			ariaLabel: "Subject",
			optionKey: { key: "han_cd", value: "han_name" },
		},
		{
			as: "select",
			controlId: "extcat4",
			name: "ext_cat4_cd",
			label: "準拠:",
			placeholder: "",
			ariaLabel: "Compliance",
			optionKey: { key: "han_cd", value: "han_name" },
		},
		{
			as: "select",
			controlId: "extcat5",
			name: "ext_cat5_cd",
			label: "学年:",
			placeholder: "",
			ariaLabel: "Grade",
			optionKey: { key: "han_cd", value: "han_name" },
		},
	];
	return forms;
};

const clientLoader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const search_params = url.searchParams;
	const [searchParams, forms] = await Promise.all([getSearchParam(search_params), getForms()]);

	return defer({
		searchParams,
		hin_cond: getHinCond(),
		hin_list: getHinList(search_params),
		forms,
	});
};

export function HinIndexRoute(): JSX.Element {
	return <HinIndexPage />;
}

HinIndexRoute.loader = clientLoader;
