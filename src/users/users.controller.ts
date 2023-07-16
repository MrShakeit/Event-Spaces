// we import express to add types to the request/response objects from our controller functions
import { Request, Response } from "express";
import usersService from "./users.service";

// we use debug with a custom context as described in Part 1
import debug from "debug";
import usersSchema from "./users.schema";
import { CustomError } from "../common/middleware/common.error";

const log: debug.IDebugger = debug("app:users-controller");
class UsersController {
  async listUsers(req: Request, res: Response) {
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

  async getUserById(req: Request, res: Response) {
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

  async createUser(req: Request, res: Response) {
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

  async updateUser(req: Request, res: Response) {
    try {
      const body = await usersSchema.validateUpdateUser(req.body);
      const id = await usersSchema.validateId(req.params.id);
      await usersService.updateById(id, body);
      res.status(204).send();
    } catch (error) {
      const err = error as CustomError;
      log("error", err.message);
      res.status(err.status || 500).send({ message: err.message });
    }
  }

  async removeUser(req: Request, res: Response) {
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
