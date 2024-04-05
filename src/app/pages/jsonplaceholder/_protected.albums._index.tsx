import { Suspense, useEffect, useState } from "react";
import { Await, Form, Link, useLoaderData, useSubmit } from "react-router-dom";
import { FloatingForms, Form as FormType } from "../../components/FloatingForms";
import { Fallback } from "../../components/Fallback";
import { Album } from "../../data/jsonplaceholder/albums";

export function ProtectedAlbumsPage() {
	const { data, searchParams, forms, users } = useLoaderData() as {
		data: Record<string, string>;
		searchParams: URLSearchParams;
		forms: FormType[];
		users: Record<string, string>[];
	};
	const submit = useSubmit();
	const userId = searchParams.get("userId");
	const [query, setQuery] = useState({
		userId: userId || "",
	});
	useEffect(() => {
		setQuery({
			userId: userId || "",
		});
	}, [userId]);

	return (
		<>
			<section id={"protected-alubums-page"}>
				<h2>ProtectedAlbumsPage</h2>
				<div id={"search"}>
					<Form role="search" onChange={(event) => submit(event.currentTarget)}>
						<Suspense fallback={<Fallback />}>
							<Await
								resolve={users}
								errorElement={<div>Error</div>}
								children={(users): JSX.Element => (
									<FloatingForms forms={forms} data={data} value={query.userId} event={(value) => setQuery({ ...query, userId: value })} option={users} />
								)}
							/>
						</Suspense>
					</Form>
				</div>
				<ul>
					<Suspense fallback={<li>Loading...</li>}>
						<Await resolve={data} errorElement={<div>Error</div>}>
							{(data: Album[]): JSX.Element => (
								<>
									{data.map((item, index) => (
										<li key={index}>
											<Link to={`${item.id}`}>{item.title}</Link>
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
