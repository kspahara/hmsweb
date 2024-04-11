import { useEffect, useState } from "react";
import {
	useActionData,
	useFetchers,
	useFetcher,
	useLoaderData,
	useMatches,
	useNavigate,
	useNavigation,
	useRevalidator,
	useRouteError,
	useRouteLoaderData,
	useSubmit,
} from "react-router-dom";
import { FormType } from "../components/createForm.tsx";
import { HinCondList } from "../data/hin/hin_cond.ts";
import { HinList } from "../data/hin/hin.ts";
import { IsAuthenticated, UserName } from "../provides/auth.ts";
import { Link } from "../routes/_index.tsx";

import noImage from "../assets/images/no_image.png";

const isDebugMode = import.meta.env.VITE_DEBBUG === "true";

/**
 * useProgressNav
 * @returns
 */
export function useProgressNav() {
	const fetchers = useFetchers();

	return {
		navigation: useNavigation(),
		revalidator: useRevalidator(),
		fetcherInProgress: fetchers.some((f) => ["loading", "submitting"].includes(f.state)),
		isDebugMode,
	};
}

/**
 * useHeaderNavigation
 * @returns
 */
export function useRootPage() {
	const { user, isAuth, links } = useLoaderData() as {
		user: UserName;
		isAuth: IsAuthenticated;
		links: Link[];
	};
	const fetcher = useFetcher();

	return {
		user,
		isAuth,
		links,
		isLoggingOut: fetcher.formData != null,
		FeacherForm: fetcher.Form,
	};
}

/**
 * useLogin
 * @returns
 */
export function useLogin() {
	const { from, forms, message } = useLoaderData() as {
		from: string;
		forms: FormType[];
		message: string;
	};
	const navigation = useNavigation();

	const [validated, setValidated] = useState(false);

	return {
		from,
		forms,
		message,
		actionData: useActionData() as { error: string } | undefined,
		isLoggingIn: navigation.formData?.get("username") != null,
		validated,
		setValidated,
	};
}

/**
 * usePublicPage
 * @returns
 */
export function usePublicPage() {
	const { user } = useRouteLoaderData("root") as {
		user: string | null;
	};
	const { message } = useLoaderData() as {
		message: string;
	};

	return {
		user,
		message,
	};
}

/**
 * useErrorPage
 * @returns
 */
export function useErrorPage() {
	return {
		error: useRouteError() as Error,
	};
}

/**
 * useHinIndexPage
 * @returns
 */
export function useHinIndexPage() {
	const { searchies, searchParams, forms, data } = useLoaderData() as {
		searchies: HinCondList;
		searchParams: Record<string, string>;
		forms: FormType[];
		data: HinList;
	};
	const { user } = useRouteLoaderData("root") as {
		user: string | null;
	};
	const navigation = useNavigation();

	const [query, setQuery] = useState<Record<string, string>>({
		...(searchParams ?? {}),
	});

	useEffect(() => {
		setQuery({
			keyword: searchParams.keyword ?? "",
			cat_cd: searchParams.cat_cd ?? "",
			ext_cat1_cd: searchParams.ext_cat1_cd ?? "",
			ext_cat2_cd: searchParams.ext_cat2_cd ?? "",
			ext_cat3_cd: searchParams.ext_cat3_cd ?? "",
			ext_cat4_cd: searchParams.ext_cat4_cd ?? "",
			ext_cat5_cd: searchParams.ext_cat5_cd ?? "",
		});
	}, [searchParams]);

	return {
		searchies,
		forms,
		data,
		user,
		query,
		setQuery,
		submit: useSubmit(),
		isSearching: navigation.formData?.get("keyword") != null,
		isLoading: navigation.state === "loading",
		noImage,
	};
}

/**
 * useHinDetailPage
 * @returns
 */
export function useHinDetailPage() {
	const { data } = useLoaderData() as {
		data: HinList;
	};
	const { user } = useRouteLoaderData("root") as {
		user: string | null;
	};

	return {
		user,
		item: data.results[0],
		navigate: useNavigate(),
		noImage,
	};
}

/**
 * useProtectedAlbumsPage
 * @returns
 */
export function useProtectedAlbumsPage() {
	const { data, searchParams, forms, searchies, message } = useLoaderData() as {
		data: Record<string, string>[];
		searchParams: Record<string, string>;
		forms: FormType[];
		searchies: Record<string, string>[];
		message: string;
	};

	const [query, setQuery] = useState<Record<string, string>>({
		...searchParams,
	});

	useEffect(() => {
		setQuery({
			...searchParams,
		});
	}, [searchParams]);

	return {
		data,
		forms,
		searchies,
		message,
		query,
		setQuery,
		submit: useSubmit(),
	};
}

/**
 * useCommentsPage
 * @returns
 */
export function useCommentsPage() {
	const { data, searchParams, forms, searchies, message } = useLoaderData() as {
		data: Record<string, string>[];
		searchParams: Record<string, string>;
		forms: FormType[];
		searchies: Record<string, string>[];
		message: string;
	};

	const [query, setQuery] = useState<Record<string, string>>({
		...searchParams,
	});

	useEffect(() => {
		setQuery({
			...searchParams,
		});
	}, [searchParams]);

	return {
		data,
		forms,
		searchies,
		message,
		query,
		setQuery,
		submit: useSubmit(),
	};
}

/**
 * useProtectedAlbumsIdPage
 * @returns
 */
export function useProtectedAlbumsIdPage() {
	const { data, forms, users, message } = useLoaderData() as {
		data: Record<string, string>;
		forms: FormType[];
		users: Record<string, string>[];
		message: string;
	};

	return {
		data,
		forms,
		users,
		message,
		isEdit: location.pathname.includes("edit"),
		navigate: useNavigate(),
	};
}

export function useBreadcrumbs() {
	const matches = useMatches();

	return { matches };
}
