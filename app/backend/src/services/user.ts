import { User } from "../types/user.js";

// In-memory store — stands in for a real database
const users: User[] = [
  {
    createdAt: "2024-01-01T00:00:00.000Z",
    email: "alice@example.com",
    id: "1",
    name: "Alice",
  },
  {
    createdAt: "2024-01-02T00:00:00.000Z",
    email: "bob@example.com",
    id: "2",
    name: "Bob",
  },
];

function create(data: Pick<User, "email" | "name">): User {
  const user: User = {
    createdAt: new Date().toISOString(),
    email: data.email,
    id: String(users.length + 1),
    name: data.name,
  };
  users.push(user);
  return user;
}

function getAll(): User[] {
  return users;
}

function getById(id: string): undefined | User {
  return users.find((u) => u.id === id);
}

function remove(id: string): boolean {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
}

function update(
  id: string,
  data: Partial<Pick<User, "email" | "name">>,
): undefined | User {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return undefined;
  users[index] = { ...users[index], ...data };
  return users[index];
}

export { create, getAll, getById, remove, update };
