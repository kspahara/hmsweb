import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Fallback } from "./components/Fallback";
import { ErrorPage } from "./pages/error";

const router = [
	{
		id: "root",
		path: "/",
		async lazy() {
			const { RootRoute } = await import("./app/routes/_index");
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
					const { PublicRoute } = await import("./app/routes/public");
					return {
						loader: PublicRoute.loader,
						element: <PublicRoute />,
					};
				},
			},
			{
				id: "protected-layout",
				async lazy() {
					const { ProtectedRoute } = await import("./app/routes/_protected");
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
							const { handle } = await import("./app/routes/_protected.albums");
							return {
								handle: handle,
							};
						},
						errorElement: <ErrorPage />,
						children: [
							{
								index: true,
								async lazy() {
									const { ProtectedAlbumsRoute } = await import("./app/routes/_protected.albums._index");
									return {
										loader: ProtectedAlbumsRoute.loader,
										element: <ProtectedAlbumsRoute />,
									};
								},
							},
							{
								path: ":id",
								async lazy() {
									const { ProtectedAlbumsIdRoute } = await import("./app/routes/_protected.albums.$id");
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
							const { handle } = await import("./app/routes/_protected.comments");
							return {
								handle: handle,
							};
						},
						errorElement: <ErrorPage />,
						children: [
							{
								index: true,
								async lazy() {
									const { ProtectedCommentsRoute } = await import("./app/routes/_protected.comments._index");
									return {
										loader: ProtectedCommentsRoute.loader,
										element: <ProtectedCommentsRoute />,
									};
								},
							},
							{
								path: ":id",
								async lazy() {
									const { ProtectedCommentsIdRoute } = await import("./app/routes/_protected.comments.$id");
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
					const { LoginRoute } = await import("./app/routes/login");
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
					const { clientAction } = await import("./app/routes/logout");
					return {
						action: clientAction,
					};
				},
			},
			{
				path: "*",
				async lazy() {
					const { NoMatchRoute } = await import("./app/routes/no-match");
					return {
						element: <NoMatchRoute />,
					};
				},
			},
		],
	},
];

export default function App(): JSX.Element {
	return (
		<RouterProvider
			router={createBrowserRouter(router, {
				// basename: "/",
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
