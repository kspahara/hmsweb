import { handleResponse } from "../../libs/libs.ts";

const apiUrl = import.meta.env.VITE_TEST_API_URL;

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

/**
 *
 * @returns
 */
export async function getTodos(): Promise<Todo[]> {
  const url = `${apiUrl}/todos`;
  const res = await fetch(url);
  const data = await handleResponse(res);

  return data;
}
