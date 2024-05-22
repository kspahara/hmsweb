import { useEffect, useState } from "react";
import { useActionData, useFetchers, useFetcher, useLoaderData, useMatches, useNavigation, useRevalidator, useRouteError, useRouteLoaderData, useSubmit } from "react-router-dom";
import { FormType } from "../components/createForm.tsx";
import { IsAuthenticated, UserName } from "../provides/auth.ts";
import { Link } from "../routes/_index.tsx";

import noImage from "../assets/images/no_image.png";
import { CartSummaryProps } from "../components/CartSummary.tsx";

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
	const { user, isAuth, links, cart_data } = useLoaderData() as {
		user: UserName;
		isAuth: IsAuthenticated;
		links: Link[];
		cart_data: CartSummaryProps;
	};
	const fetcher = useFetcher();
	const index_link = links.find((link) => link.kbn === "index");
	const allrightsreserved = "© " + new Date().getFullYear() + " - All rights reserved";

	return {
		user,
		isAuth,
		links,
		isLoggingOut: fetcher.formData != null,
		FeacherForm: fetcher.Form,
		index_link,
		allrightsreserved,
		cart_data,
	};
}

/**
 * useLoginUser
 * @returns
 */
export function useLoginUser() {
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
		searchies: Record<string, string>[];
		searchParams: Record<string, string>;
		forms: FormType[];
		data: Record<string, string>[];
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
			...(searchParams ?? {}),
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
		data: {
			results: Record<string, string>[];
		};
	};
	const { user } = useRouteLoaderData("root") as {
		user: string | null;
	};

	return {
		user,
		item: data.results[0],
		noImage,
	};
}

/**
 * useProtectedNyusyukoPage
 * @returns
 */
export function useProtectedNyusyukoPage() {
	const { searchies, searchParams, forms, data } = useLoaderData() as {
		searchies: Record<string, string>[];
		searchParams: Record<string, string>;
		forms: FormType[];
		data: Record<string, string>[];
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
			...(searchParams ?? {}),
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
		type: "hacyu",
	};
}

/**
 * useProtectedMypagePage
 * @returns
 */
export function useProtectedCartPage() {
	const { data, searchParams, forms, searchies, message } = useLoaderData() as {
		data: {
			head: Record<string, string>;
			details: Record<string, string>[];
			nonyus: Record<string, string>[];
		};
		searchParams: Record<string, string>;
		forms: FormType[];
		searchies: Record<string, string>[];
		message: string;
	};

	const [query, setQuery] = useState<Record<string, string>>({
		...(searchParams ?? {}),
	});
	const fetchers = useFetchers();
	const navigation = useNavigation();

	useEffect(() => {
		setQuery({
			...(searchParams ?? {}),
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
		isSearching: navigation.formData?.get("keyword") != null,
		isLoading: navigation.state === "loading",
		fetcherInProgress: fetchers.some((f) => ["loading", "submitting"].includes(f.state)),
	};
}

/**
 * useProtectedMypagePage
 * @returns
 */
export function useProtectedMypagePage() {
	const { data, searchParams, forms, searchies, message } = useLoaderData() as {
		data: Record<string, string>[];
		searchParams: Record<string, string>;
		forms: FormType[];
		searchies: Record<string, string>[];
		message: string;
	};

	const [query, setQuery] = useState<Record<string, string>>({
		...(searchParams ?? {}),
	});
	const fetchers = useFetchers();
	const navigation = useNavigation();

	useEffect(() => {
		setQuery({
			...(searchParams ?? {}),
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
		isSearching: navigation.formData?.get("keyword") != null,
		isLoading: navigation.state === "loading",
		fetcherInProgress: fetchers.some((f) => ["loading", "submitting"].includes(f.state)),
		type: "mypage",
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
		...(searchParams ?? {}),
	});

	const navigation = useNavigation();

	useEffect(() => {
		setQuery({
			...(searchParams ?? {}),
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
		isSearching: navigation.formData?.get("keyword") != null,
		isLoading: navigation.state === "loading",
		type: "list",
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

	const navigation = useNavigation();

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
		isSearching: navigation.formData?.get("keyword") != null,
		isLoading: navigation.state === "loading",
		type: "list",
	};
}

/**
 * useProtectedMypageIdPage
 * @returns
 */
export function useProtectedMypageDenNoPage() {
	const { data, forms, searchies, message } = useLoaderData() as {
		data: { details: Record<string, string>[] };
		forms: FormType[];
		searchies: Record<string, string>[];
		message: string;
	};

	return {
		data,
		forms,
		searchies,
		message,
		isEdit: location.pathname.includes("edit"),
	};
}

/**
 * useProtectedAlbumsIdPage
 * @returns
 */
export function useProtectedAlbumsIdPage() {
	const { data, forms, searchies, message } = useLoaderData() as {
		data: Record<string, string>;
		forms: FormType[];
		searchies: Record<string, string>[];
		message: string;
	};

	return {
		data,
		forms,
		searchies,
		message,
		isEdit: location.pathname.includes("edit"),
	};
}

export function useBreadcrumbs() {
	const matches = useMatches();

	return { matches };
}
