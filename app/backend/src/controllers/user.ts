import { RequestHandler } from "express";

import * as userService from "#services/user.js";

const getUsers: RequestHandler = async (_req, res, next) => {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const getUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await userService.getById(req.params.id as string);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, name } = req.body as { email?: string; name?: string };
    if (!email || !name) {
      res.status(400).json({ error: "name and email are required!" });
      return;
    }
    const user = await userService.create({ email, name });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await userService.update(
      req.params.id as string,
      req.body as { email?: string; name?: string },
    );
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const deleted = await userService.remove(req.params.id as string);
    if (!deleted) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(`User ${req.params.id as string} deleted`);
  } catch (err) {
    next(err);
  }
};

export { createUser, deleteUser, getUser, getUsers, updateUser };
