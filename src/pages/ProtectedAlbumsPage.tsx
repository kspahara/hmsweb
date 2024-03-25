import { Suspense, useEffect, useState } from "react";
import { Await, Form, Link, useLoaderData, useSubmit } from "react-router-dom";
import { Album } from "../data/jsonplaceholder/getAlbums";
import { User } from "../data/jsonplaceholder/getUsers";

export function ProtectedAlbumsPage() {
	const { data, searchParams, users } = useLoaderData() as { data: Album[]; searchParams: URLSearchParams; users: User[] };
	const userId = searchParams.get("userId");
	const [query, setQuery] = useState({
		userId: userId || "",
	});

	useEffect(() => {
		setQuery({
			userId: userId || "",
		});
	}, [userId]);
	const submit = useSubmit();

	return (
		<>
			<section id={"protected-alubums-page"}>
				<h2>ProtectedAlbumsPage</h2>
				<div>
					<Form role="search" onChange={(event) => submit(event.currentTarget)}>
						<label htmlFor={"album-userId"}>
							<select
								id={"album-userId"}
								name={"userId"}
								value={query.userId}
								onChange={(event) => {
									setQuery({
										...query,
										userId: event.currentTarget.value,
									});
								}}
							>
								<Suspense fallback={<option>Loading...</option>}>
									<Await resolve={users} errorElement={<div>Error</div>}>
										{(users: User[]): JSX.Element => (
											<>
												<option value={""}>All Users</option>
												{users.map((user) => (
													<option key={user.id} value={user.id}>
														{user.name}
													</option>
												))}
											</>
										)}
									</Await>
								</Suspense>
							</select>
						</label>
						<button type={"submit"}>Search</button>
					</Form>
				</div>
				<ul>
					<Suspense fallback={<li>Loading...</li>}>
						<Await resolve={data} errorElement={<div>Error</div>}>
							{(data: Album[]): JSX.Element => (
								<>
									{data.map((album) => (
										<li key={album.id}>
											<Link to={`/albums/${album.id}`}>{album.title}</Link>
										</li>
									))}
								</>
							)}
						</Await>
					</Suspense>
				</ul>
			</section>
		</>
	);
}
