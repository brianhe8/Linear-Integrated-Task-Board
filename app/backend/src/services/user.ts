import { supabase } from "#external/supabase.js";
import { User } from "#types/user.js";

// In-memory store — stands in for a real database
// const users: User[] = [
//   {
//     created_at: "2024-01-01T00:00:00.000Z",
//     email: "alice@example.com",
//     id: "1",
//     name: "Alice",
//   },
//   {
//     created_at: "2024-01-02T00:00:00.000Z",
//     email: "bob@example.com",
//     id: "2",
//     name: "Bob",
//   },
// ];

async function create(info: Pick<User, "email" | "name">): Promise<User> {
  const { data, error } = await supabase
    .from("users")
    .insert(info)
    .select<"*", User>("*")
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

async function getAll(): Promise<User[]> {
  const { data, error } = await supabase.from("users").select<"*", User>("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

async function getById(id: string): Promise<undefined | User> {
  const { data, error } = await supabase
    .from("users")
    .select<"*", User>("*")
    .eq("id", id)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

async function remove(id: string): Promise<boolean> {
  const { error } = await supabase.from("users").delete().eq("id", id);
  return !error; // Returns true if the user was deleted, false otherwise
}

async function update(
  id: string,
  input: Partial<Pick<User, "email" | "name">>,
): Promise<undefined | User> {
  const { data, error } = await supabase
    .from("users")
    .update(input)
    .eq("id", id)
    .select<"*", User>("*")
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export { create, getAll, getById, remove, update };
