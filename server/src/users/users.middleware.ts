import express from "express";
import userService from "./users.service";
import debug from "debug";
import { ObjectId } from "mongodb";
import usersSchema from "./users.schema";
import { CustomError } from "../common/middleware/common.error";

const log: debug.IDebugger = debug("app:users-controller");
class UsersMiddleware {
  async validateRequiredUserBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.email && req.body.password) {
      next();
    } else {
      res.status(400).send({
        error: `Missing required fields email and password`,
      });
    }
  }

  async validateSameEmailDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = ""; // await userService.getUserBy({ email: req.body.email });
    if (user) {
      res.status(400).send({ error: `User email already exists` });
    } else {
      next();
    }
  }

  async validateSameUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await userService.getUserBy({
      _id: new ObjectId(req.params.id),
    });
    console.log(user);
    next();
    // if (user && user._id === req.params.userId) {

    // } else {
    //   res.status(400).send({ error: `Invalid email` });
    // }
  }

  // Here we need to use an arrow function to bind `this` correctly
  validatePatchEmail = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (req.body.email) {
      log("Validating email", req.body.email);

      this.validateSameUser(req, res, next);
    } else {
      next();
    }
  };

  async validateUserExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const id = await usersSchema.validateId(req.params.id);
      const user = await userService.readById(id);
      if (user) {
        next();
      } else {
        res.status(404).send({
          error: `User ${req.params.id} not found`,
        });
      }
    } catch (error) {
      const err = error as CustomError;
      res.status(err.status || 500).send({
        message: err.message || "Unknown Error",
      });
    }
  }
}

export default new UsersMiddleware();
