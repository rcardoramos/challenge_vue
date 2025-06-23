import type { User } from "../types/user.interface";

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    throw new Error("Error al obtener usuarios");
  }

  const data = await response.json();

  const userList: User[] = data.map((user: any) => ({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
  }));

  return userList;
}
