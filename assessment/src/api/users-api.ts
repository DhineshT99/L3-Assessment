
export interface User {
  id: number;
  name: string;
  email: string;
}

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsersApi = async (query: string): Promise<User[]> => {
  const url = query ? `${BASE_URL}?q=${query}` : BASE_URL;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return await response.json();
};
