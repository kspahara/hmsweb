import { useLoaderData } from "react-router-dom";

interface Todo {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

export function ProtectedTodosPage() {
	const { data } = useLoaderData() as { data: Todo[] };

	return (
		<>
			<section>
				<h2>ProtectedTodosPage</h2>
				<ul>
					{data.map((todo) => (
						<li key={todo.id}>
							<div>
								{todo.id}:{todo.title}
							</div>
						</li>
					))}
				</ul>
			</section>
		</>
	);
}
