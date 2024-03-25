import { useLoaderData } from "react-router-dom";

interface Photo {
	albumId: number;
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
}

export function ProtectedPhotosPage() {
	const { data } = useLoaderData() as { data: Photo[] };

	return (
		<>
			<section>
				<h2>ProtectedPhotosPage</h2>
				<ul>
					{data.map((photo) => (
						<li key={photo.id}>
							<div>
								{photo.id}:{photo.title}
							</div>
						</li>
					))}
				</ul>
			</section>
		</>
	);
}
