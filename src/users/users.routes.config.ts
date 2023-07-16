import authMiddleware from "../auth/auth.middleware";
import { CommonRoutesConfig } from "../common/common.routes.config";
import UsersController from "./users.controller";
import UsersMiddleware from "./users.middleware";
import express from "express";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/users`)
      .get(
        //@ts-ignore
        authMiddleware.verifyJWT,
        authMiddleware.verifyIsAdmin,
        UsersController.listUsers
      )
      .post(
        UsersMiddleware.validateSameEmailDoesntExist,
        UsersController.createUser
      );

    this.app
      .route(`/users/:id`)
      .all([
        //@ts-ignore
        authMiddleware.verifyJWT,
        authMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersMiddleware.validateUserExists,
      ])
      .get(UsersController.getUserById)
      .delete(UsersController.removeUser)
      .put([UsersMiddleware.validateSameUser, UsersController.updateUser]);

    return this.app;
  }
}
