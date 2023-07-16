// we import express to add types to the request/response objects from our controller functions
import express from "express";

// we import our newly created user services
import usersService from "../../common/services/users.service";

// we import the argon2 library for password hashing
import argon2 from "argon2";

// we use debug with a custom context as described in Part 1
import debug from "debug";
import usersSchema from "../dto/users.schema";
import { CustomError } from "../../common/middleware/common.error";

const log: debug.IDebugger = debug("app:users-controller");
class UsersController {
  async listUsers(req: express.Request, res: express.Response) {
    try {
      const query = await usersSchema.validateGetUsers(req.query);
      const users = await usersService.list(query.limit, query.page);
      res.status(200).send(users);
    } catch (error) {
      const err = error as CustomError;
      log("error", err.message);
      res.status(err.status || 500).send({ message: err.message });
    }
  }

  async getUserById(req: express.Request, res: express.Response) {
    try {
      const id = await usersSchema.validateId(req.params.id);
      const user = await usersService.readById(id);
      res.status(200).send(user);
    } catch (error) {
      const err = error as CustomError;
      log("error", err.message);
      res.status(err.status || 500).send({ message: err.message });
    }
  }

  async createUser(req: express.Request, res: express.Response) {
    try {
      const body = await usersSchema.validateCreateUser(req.body);
      const userId = await usersService.create(body);
      res.status(201).send({ id: userId });
    } catch (error) {
      const err = error as CustomError;
      log("error", err.message);
      res.status(err.status || 500).send({ message: err.message });
    }
  }

  async put(req: express.Request, res: express.Response) {
    try {
      const body = await usersSchema.validateUpdateUser(req.body);
      const id = await usersSchema.validateId(req.params.id);
      await usersService.putById(id, body);
      res.status(204).send();
    } catch (error) {
      const err = error as CustomError;
      log("error", err.message);
      res.status(err.status || 500).send({ message: err.message });
    }
  }

  async removeUser(req: express.Request, res: express.Response) {
    try {
      const id = await usersSchema.validateId(req.params.id);
      await usersService.deleteById(id);
      res.status(204).send();
    } catch (error) {
      const err = error as CustomError;
      log("error", err.message);
      res.status(err.status || 500).send({ message: err.message });
    }
  }
}

export default new UsersController();
