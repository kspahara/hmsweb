import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Fallback } from "./components/Fallback";
import { ErrorPage } from "./pages/ErrorPage";

const router = [
	{
		id: "root",
		path: "/",
		async lazy() {
			const { RootRoute } = await import("./routes/RootRoute");
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
					const { PublicRoute } = await import("./routes/PublicRoute");
					return {
						loader: PublicRoute.loader,
						element: <PublicRoute />,
					};
				},
			},
			{
				id: "protected-layout",
				async lazy() {
					const { ProtectedRoute } = await import("./routes/ProtectedRoute");
					return {
						loader: ProtectedRoute.loader,
						element: <ProtectedRoute />,
					};
				},
				errorElement: <ErrorPage />,
				children: [
					{
						id: "protected-albums-layout",
						path: "albums",
						async lazy() {
							const { handle } = await import("./routes/ProtectedAlbumsLayout");
							return {
								handle: handle,
							};
						},
						errorElement: <ErrorPage />,
						children: [
							{
								index: true,
								async lazy() {
									const { ProtectedAlbumsRoute } = await import("./routes/ProtectedAlbumsRoute");
									return {
										loader: ProtectedAlbumsRoute.loader,
										element: <ProtectedAlbumsRoute />,
									};
								},
							},
							{
								path: ":id",
								async lazy() {
									const { ProtectedAlbumsIdRoute } = await import("./routes/ProtectedAlbumsIdRoute");
									return {
										loader: ProtectedAlbumsIdRoute.loader,
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
							const { handle } = await import("./routes/ProtectedCommentsLayout");
							return {
								handle: handle,
							};
						},
						errorElement: <ErrorPage />,
						children: [
							{
								index: true,
								async lazy() {
									const { ProtectedCommentsRoute } = await import("./routes/ProtectedCommentsRoute");
									return {
										loader: ProtectedCommentsRoute.loader,
										element: <ProtectedCommentsRoute />,
									};
								},
							},
							{
								path: ":id",
								async lazy() {
									const { ProtectedCommentsIdRoute } = await import("./routes/ProtectedCommentsIdRoute");
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
							const { ProtectedPhotosRoute } = await import("./routes/ProtectedPhotosRoute");
							return {
								loader: ProtectedPhotosRoute.loader,
								element: <ProtectedPhotosRoute />,
							};
						},
					},
					{
						path: "posts",
						async lazy() {
							const { ProtectedPostsRoute } = await import("./routes/ProtectedPostsRoute");
							return {
								loader: ProtectedPostsRoute.loader,
								element: <ProtectedPostsRoute />,
							};
						},
					},
					{
						path: "todos",
						async lazy() {
							const { ProtectedTodosRoute } = await import("./routes/ProtectedTodosRoute");
							return {
								loader: ProtectedTodosRoute.loader,
								element: <ProtectedTodosRoute />,
							};
						},
					},
					{
						path: "users",
						async lazy() {
							const { ProtectedUsersRoute } = await import("./routes/ProtectedUsersRoute");
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
					const { LoginRoute } = await import("./routes/LoginRoute");
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
					const { clientAction } = await import("./routes/LogoutRoute");
					return {
						action: clientAction,
					};
				},
			},
			{
				path: "*",
				async lazy() {
					const { NoMatchRoute } = await import("./routes/NoMatchRoute");
					return {
						element: <NoMatchRoute />,
					};
				},
			},
		],
	},
];

export function App(): JSX.Element {
	return (
		<RouterProvider
			router={createBrowserRouter(router, {
				basename: "/",
				future: {
					v7_fetcherPersist: true,
					v7_normalizeFormMethod: true,
					// v7_partialHydration: true,
					// v7_prependBasename: true,
				},
				window: window,
			})}
			fallbackElement={<Fallback />}
			future={{ v7_startTransition: true }}
		/>
	);
}
