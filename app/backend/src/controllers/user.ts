import { RequestHandler } from "express";

import * as userService from "../services/user.js";

const getUsers: RequestHandler = (_req, res) => {
  res.json(userService.getAll());
};

const getUser: RequestHandler = (req, res) => {
  const user = userService.getById(req.params.id as string);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(user);
};

const createUser: RequestHandler = (req, res) => {
  const { email, name } = req.body as { email?: string; name?: string };
  if (!email || !name) {
    res.status(400).json({ error: "name and email are required" });
    return;
  }
  const user = userService.create({ email, name });
  res.status(201).json(user);
};

const updateUser: RequestHandler = (req, res) => {
  const user = userService.update(
    req.params.id as string,
    req.body as { email?: string; name?: string },
  );
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(user);
};

const deleteUser: RequestHandler = (req, res) => {
  const deleted = userService.remove(req.params.id as string);
  if (!deleted) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.status(204).send();
};

export { createUser, deleteUser, getUser, getUsers, updateUser };
