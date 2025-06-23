import type { User } from "../types/user.interface";

const STORAGE_KEY = "userList";

export function getUsers(): User[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? (JSON.parse(data) as User[]) : [];
}

export function saveUsers(users: User[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function addUser(user: Omit<User, "id">): User {
  const users = getUsers();
  const newId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const newUser: User = { id: newId, ...user };
  saveUsers([...users, newUser]);
  return newUser;
}

export function updateUser(updatedUser: User): void {
  const users = getUsers().map((user) =>
    user.id === updatedUser.id ? { ...user, ...updatedUser } : user
  );
  saveUsers(users);
}

export function removeUser(userId: number): void {
  const users = getUsers().filter((user) => user.id !== userId);
  saveUsers(users);
}
