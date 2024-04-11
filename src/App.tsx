import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Fallback } from "./app/components/Fallback.tsx";
import { ErrorPage } from "./app/pages/error.tsx";

const router = [
	{
		id: "root",
		path: "/",
		async lazy() {
			const { RootRoute } = await import("./app/routes/_index.tsx");
			return {
				loader: RootRoute.loader,
				handle: RootRoute.handle,
				element: <RootRoute />,
			};
		},
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				async lazy() {
					const { PublicRoute } = await import("./app/routes/public.tsx");
					return {
						loader: PublicRoute.loader,
						element: <PublicRoute />,
					};
				},
			},
			{
				path: "hin",
				async lazy() {
					const { handle } = await import("./app/routes/hin/hin.tsx");
					return {
						handle: handle,
					};
				},
				errorElement: <ErrorPage />,
				children: [
					{
						index: true,
						async lazy() {
							const { HinIndexRoute } = await import("./app/routes/hin/hin._index.tsx");
							return {
								loader: HinIndexRoute.loader,
								element: <HinIndexRoute />,
							};
						},
					},
					{
						path: ":hin_cd",
						async lazy() {
							const { HinDetailRoute } = await import("./app/routes/hin/hin.$hin_cd.tsx");
							return {
								loader: HinDetailRoute.loader,
								handle: HinDetailRoute.handle,
								element: <HinDetailRoute />,
							};
						},
					},
				],
			},
			{
				id: "pathless-protected-layout",
				async lazy() {
					const { clientLoader } = await import("./app/routes/_protected.tsx");
					return {
						loader: clientLoader,
					};
				},
				errorElement: <ErrorPage />,
				children: [
					{
						id: "protected-albums-layout",
						path: "albums",
						async lazy() {
							const { handle } = await import("./app/routes/jsonplaceholder/_protected.albums.tsx");
							return {
								handle: handle,
							};
						},
						errorElement: <ErrorPage />,
						children: [
							{
								index: true,
								async lazy() {
									const { ProtectedAlbumsRoute } = await import("./app/routes/jsonplaceholder/_protected.albums._index.tsx");
									return {
										loader: ProtectedAlbumsRoute.loader,
										element: <ProtectedAlbumsRoute />,
									};
								},
							},
							{
								path: ":id/edit?",
								async lazy() {
									const { ProtectedAlbumsIdRoute } = await import("./app/routes/jsonplaceholder/_protected.albums.$id.tsx");
									return {
										loader: ProtectedAlbumsIdRoute.loader,
										action: ProtectedAlbumsIdRoute.action,
										handle: ProtectedAlbumsIdRoute.handle,
										element: <ProtectedAlbumsIdRoute />,
									};
								},
							},
						],
					},
					{
						id: "protected-comments-layout",
						path: "comments",
						async lazy() {
							const { handle } = await import("./app/routes/jsonplaceholder/_protected.comments.tsx");
							return {
								handle: handle,
							};
						},
						errorElement: <ErrorPage />,
						children: [
							{
								index: true,
								async lazy() {
									const { ProtectedCommentsRoute } = await import("./app/routes/jsonplaceholder/_protected.comments._index.tsx");
									return {
										loader: ProtectedCommentsRoute.loader,
										element: <ProtectedCommentsRoute />,
									};
								},
							},
							{
								path: ":id/edit?",
								async lazy() {
									const { ProtectedCommentsIdRoute } = await import("./app/routes/jsonplaceholder/_protected.comments.$id.tsx");
									return {
										loader: ProtectedCommentsIdRoute.loader,
										handle: ProtectedCommentsIdRoute.handle,
										element: <ProtectedCommentsIdRoute />,
									};
								},
							},
						],
					},
					{
						path: "photos",
						async lazy() {
							const { ProtectedPhotosRoute } = await import("./app/routes/jsonplaceholder/_protected.photos.tsx");
							return {
								loader: ProtectedPhotosRoute.loader,
								element: <ProtectedPhotosRoute />,
							};
						},
					},
					{
						path: "posts",
						async lazy() {
							const { ProtectedPostsRoute } = await import("./app/routes/jsonplaceholder/_protected.posts.tsx");
							return {
								loader: ProtectedPostsRoute.loader,
								element: <ProtectedPostsRoute />,
							};
						},
					},
					{
						path: "todos",
						async lazy() {
							const { ProtectedTodosRoute } = await import("./app/routes/jsonplaceholder/_protected.todos.tsx");
							return {
								loader: ProtectedTodosRoute.loader,
								element: <ProtectedTodosRoute />,
							};
						},
					},
					{
						path: "users",
						async lazy() {
							const { ProtectedUsersRoute } = await import("./app/routes/jsonplaceholder/_protected.users.tsx");
							return {
								loader: ProtectedUsersRoute.loader,
								element: <ProtectedUsersRoute />,
							};
						},
					},
				],
			},
			{
				path: "login",
				async lazy() {
					const { LoginRoute } = await import("./app/routes/login.tsx");
					return {
						loader: LoginRoute.loader,
						action: LoginRoute.action,
						handle: LoginRoute.handle,
						element: <LoginRoute />,
					};
				},
			},
			{
				path: "logout",
				async lazy() {
					const { clientAction } = await import("./app/routes/logout.tsx");
					return {
						action: clientAction,
					};
				},
			},
			{
				path: "*",
				async lazy() {
					const { NoMatchRoute } = await import("./app/routes/no-match.tsx");
					return {
						element: <NoMatchRoute />,
					};
				},
			},
		],
	},
];

/**
 *
 * @returns
 */
export default function App(): JSX.Element {
	return (
		<RouterProvider
			router={createBrowserRouter(router, {
				basename: "/base/",
				future: {
					v7_fetcherPersist: true,
					v7_normalizeFormMethod: true,
					// v7_partialHydration: true,
					// v7_prependBasename: true,
					v7_relativeSplatPath: true,
				},
				window: window,
			})}
			fallbackElement={<Fallback />}
			future={{ v7_startTransition: true }}
		/>
	);
}
