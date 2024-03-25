import { useLoaderData, useNavigate } from "react-router-dom";
import { Album } from "../data/jsonplaceholder/getAlbums";

export function ProtectedAlbumsIdPage() {
	const { data } = useLoaderData() as { data: Album };
	const navigate = useNavigate();

	return (
		<>
			<section>
				<h3>ProtectedAlbumsIdPage</h3>
				<button
					type="button"
					onClick={() => {
						navigate(-1);
					}}
				>
					Back
				</button>
				<div>
					<h4>{data.id}</h4>
					<p>{data.userId}</p>
					<p>{data.title}</p>
				</div>
			</section>
		</>
	);
}
