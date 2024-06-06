import { useEffect, useState } from "react";
import {
  useActionData,
  useFetchers,
  useFetcher,
  useLoaderData,
  useNavigation,
  useRevalidator,
  useRouteError,
  useRouteLoaderData,
  useSubmit,
  useAsyncError,
  useAsyncValue,
  useMatches,
  useLocation,
} from "react-router-dom";
import noImage from "../assets/images/no_image.png";
import { FormType } from "../components/createForm.tsx";
import { CartSummaryProps } from "../components/hin/cartSummary.tsx";
import { Crumb } from "../components/breadcrumbs.tsx";
import { IsAuthenticated, UserName } from "../provides/auth.ts";
import { Link } from "../routes/_index.tsx";
import { Field } from "../routes/hin/_protected.mypage._index.tsx";
import { FieldsNav } from "../routes/hin/_protected.cart._index.tsx";

const logInMode = import.meta.env.VITE_LOGIN_MODE;
const isDebugMode = import.meta.env.VITE_DEBBUG === "true";

/**
 * useHinInputSuryo
 * @returns
 */
export function useHinInputSuryo() {
  const fetcher = useFetcher();

  return {
    FeacherForm: fetcher.Form,
    isFeaching: fetcher.state === "loading",
  };
}

/**
 * useBreadcrumbs
 * @returns
 */
export function useBreadcrumbs() {
  return {
    matches: useMatches() as Crumb[],
  };
}

/**
 * useAlertAsyncError
 * @returns
 */
export function useAlertAsyncError() {
  return {
    error: useAsyncError() as Error,
    value: useAsyncValue(),
  };
}

/**
 * useContentAreaHin
 * @returns
 */
export function useContentAreaHin() {
  const { user } = useRouteLoaderData("root") as {
    user: string | null;
  };

  return {
    noImage,
    user,
  };
}

/**
 * useBtnReturnTop
 * @returns
 */
export function useBtnReturnTop() {
  const [isBtnActive, setIsBtnActive] = useState(false);
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const scrollWindow = () => setIsBtnActive(window.scrollY > 200);

  useEffect(() => {
    window.addEventListener("scroll", scrollWindow);

    return () => window.removeEventListener("scroll", scrollWindow);
  }, []);

  return {
    scrollTop,
    isBtnActive,
  };
}

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
export function useHeaderNavigation() {
  const { links, ...loaderData } = useLoaderData() as {
    user: UserName;
    isAuth: IsAuthenticated;
    links: Link[];
  };
  const fetcher = useFetcher();

  return {
    ...loaderData,
    links,
    isLoggingOut: fetcher.formData != null,
    FeacherForm: fetcher.Form,
  };
}

/**
 * useRootPage
 * @returns
 */
export function useRootPage() {
  const { ...loaderData } = useLoaderData() as {
    cart_data: CartSummaryProps;
  };
  const allrightsReserved = "© " + new Date().getFullYear() + " - All rights reserved";

  return {
    allrightsReserved,
    ...loaderData,
  };
}

/**
 * useLoginUser
 * @returns
 */
export function useLoginUser() {
  const { ...loaderData } = useLoaderData() as {
    from: string;
    forms: FormType[];
    message: string;
  };
  const navigation = useNavigation();

  const [validated, setValidated] = useState(false);

  return {
    ...loaderData,
    actionData: useActionData() as { error: string } | undefined,
    isLoggingIn: navigation.formData?.get("user_name") != null,
    validated,
    setValidated,
    logInMode,
  };
}

/**
 * useLogin
 * @returns
 */
export function useLogin() {
  const { ...loaderData } = useLoaderData() as {
    from: string;
    forms: FormType[];
    message: string;
  };
  const navigation = useNavigation();

  const [validated, setValidated] = useState(false);

  return {
    ...loaderData,
    actionData: useActionData() as { error: string } | undefined,
    isLoggingIn: navigation.formData?.get("user_name") != null,
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
  const { ...loaderData } = useLoaderData() as {
    message: string;
  };

  return {
    user,
    ...loaderData,
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
  const { searchParams, ...loaderData } = useLoaderData() as {
    searchies: Record<string, string>[];
    searchParams: Record<string, string>;
    forms: FormType[];
    data: Record<string, string>[];
    cart_data: CartSummaryProps;
    message: string;
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
    ...loaderData,
    query,
    setQuery,
    submit: useSubmit(),
    isSearching: navigation.formData?.get("keyword") != null,
    isLoading: navigation.state === "loading",
  };
}

/**
 * useHinDetailPage
 * @returns
 */
export function useHinDetailPage() {
  const { data, ...loaderData } = useLoaderData() as {
    fields: {
      detail: Field[];
    };
    data: Record<string, string>;
  };
  const { user } = useRouteLoaderData("root") as {
    user: string | null;
  };

  return {
    user,
    item: data,
    noImage,
    ...loaderData,
  };
}

/**
 *
 * @returns
 */
export function useProtectedNyusyukoPage() {
  const { searchParams, ...loaderData } = useLoaderData() as {
    searchParams: Record<string, string>;
    searchies: Record<string, string>[];
    forms: FormType[];
    data: Record<string, Record<string, string>[]>;
    message: string;
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
    ...loaderData,
    user,
    query,
    setQuery,
    submit: useSubmit(),
    isSearching: navigation.formData?.get("keyword") != null,
    isLoading: navigation.state === "loading",
    type: "hacyu",
  };
}

/**
 *
 * @returns
 */
export function useProtectedNyusyukoDenPage() {
  const { searchParams, ...loaderData } = useLoaderData() as {
    searchParams: Record<string, string>;
    searchies: Record<string, string>[];
    forms: FormType[];
    data: Record<string, Record<string, string>[]>;
    // data: any;
    message: string;
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
    ...loaderData,
    user,
    query,
    setQuery,
    submit: useSubmit(),
    isSearching: navigation.formData?.get("keyword") != null,
    isLoading: navigation.state === "loading",
    type: "list",
  };
}



/**
 * useProtectedMypagePage
 * @returns
 */
export function useProtectedCartPage() {
  const { ...loaderData } = useLoaderData() as {
    data: {
      head: Record<string, string>;
      details: Record<string, string>[];
      nonyus: Record<string, string>[];
    };
    searchParams: Record<string, string>;
    forms: FormType[];
    searchies: Record<string, string>[];
    message: string;
    fields: {
      navigation: FieldsNav[];
      nonyu: Field[];
      cart: Field[];
      cart_fixed: Field[];
      nonyu_head: Field[];
    };
  };
  const fetcher = useFetcher();
  const location = useLocation();
  const locPath = location.pathname;
  const isLocPath = (path: string) => locPath === path;

  return {
    ...loaderData,
    FeacherForm: fetcher.Form,
    isFeaching: fetcher.state === "loading",
    Feachersubmit: fetcher.submit,
    locPath: location.pathname,
    noImage,
    isLocPathCart: isLocPath("/cart"),
    isLocPathEdit: isLocPath("/cart/edit"),
    isLocPathConfirm: isLocPath("/cart/confirm"),
    isLocPathCommit: isLocPath("/cart/commit"),
  };
}

/**
 * useProtectedMypagePage
 * @returns
 */
export function useProtectedMypageAdminPage() {
  const { searchParams, ...loaderData } = useLoaderData() as {
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
    ...loaderData,
    query,
    setQuery,
    submit: useSubmit(),
    isSearching: navigation.formData?.get("keyword") != null,
    isLoading: navigation.state === "loading",
    fetcherInProgress: fetchers.some((f) => ["loading", "submitting"].includes(f.state)),
    type: "Adminlist",
  };
}

/**
 * useProtectedMypagePage
 * @returns
 */
export function useProtectedMypagePage() {
  const { searchParams, ...loaderData } = useLoaderData() as {
    data: Record<string, string>[];
    searchParams: Record<string, string>;
    forms: FormType[];
    searchies: Record<string, string>[];
    message: string;
    fields: {
      header: Field[];
      detail: Field[];
    };
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
    ...loaderData,
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
  const { searchParams, ...loaderData } = useLoaderData() as {
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
    ...loaderData,
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
  const { searchParams, ...loaderData } = useLoaderData() as {
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
    ...loaderData,
    query,
    setQuery,
    submit: useSubmit(),
    isSearching: navigation.formData?.get("keyword") != null,
    isLoading: navigation.state === "loading",
    type: "list",
  };
}

/**
 * useProtectedAlbumsIdPage
 * @returns
 */
export function useProtectedAlbumsIdPage() {
  const { ...loaderData } = useLoaderData() as {
    data: Record<string, string>;
    forms: FormType[];
    searchies: Record<string, string>[];
    message: string;
  };

  return {
    ...loaderData,
    isEdit: location.pathname.includes("edit"),
  };
}
