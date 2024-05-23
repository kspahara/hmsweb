import { useLoaderData } from "react-router-dom";
import { User } from "../../data/jsonplaceholder/users.ts";

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
