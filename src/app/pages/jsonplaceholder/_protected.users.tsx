import { useLoaderData } from "react-router-dom";

interface User {
	id: number;
	name: string;
}

export function ProtectedUsersPage() {
	const { data } = useLoaderData() as { data: User[] };

	return (
		<>
			<section>
				<h2>ProtectedUsersPage</h2>
				<ul>
					{data.map((user) => (
						<li key={user.id}>
							<div>
								{user.id}:{user.name}
							</div>
						</li>
					))}
				</ul>
			</section>
		</>
	);
}
