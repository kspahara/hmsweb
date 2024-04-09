import { useLoaderData } from "react-router-dom";
import { Photo } from "../../data/jsonplaceholder/photos";

export function ProtectedPhotosPage(): JSX.Element {
	const { data } = useLoaderData() as { data: Photo[] };

	return (
		<>
			<section>
				<h2>ProtectedPhotosPage</h2>
				<ul>
					{data.map((item) => (
						<li key={item.id}>
							<div>
								{item.id}:{item.title}
							</div>
						</li>
					))}
				</ul>
			</section>
		</>
	);
}
