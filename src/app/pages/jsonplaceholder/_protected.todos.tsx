import { useLoaderData } from "react-router-dom";
import { Todo } from "../../data/jsonplaceholder/todos";

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
