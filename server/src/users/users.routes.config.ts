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
    this.app.route(`/users/details/:id`).get(
      //@ts-ignore
      authMiddleware.verifyJWT,
      authMiddleware.verifyIsAdmin,
      UsersController.getUserDetails
    );
    this.app
      .route(`/auth/signup`)
      .get(
        //@ts-ignore
        authMiddleware.verifyJWT,
        authMiddleware.verifyIsAdmin,
        UsersController.listUsers
      )
      .post([
        UsersMiddleware.validateSameEmailDoesntExist,
        UsersController.createUser,
      ]);

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

    this.app
      .route(`/users/block/:id`)
      .all([
        //@ts-ignore
        authMiddleware.verifyJWT,
        authMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersMiddleware.validateUserExists,
      ])
      .put([
        //@ts-ignore
        UsersMiddleware.validateUserExists,
        UsersController.blockUser,
      ]);

    this.app
      .route(`/users/unblock/:id`)
      .all([
        //@ts-ignore
        authMiddleware.verifyJWT,
        //@ts-ignore
        authMiddleware.verifyIsAdmin,
        UsersMiddleware.validateUserExists,
      ])
      .put([UsersMiddleware.validateUserExists, UsersController.unblockUser]);

    this.app
      .route(`/users/addCityMember/:id`)
      .all([
        //@ts-ignore
        authMiddleware.verifyJWT,
        //@ts-ignore
        authMiddleware.verifyIsAdmin,
        UsersMiddleware.validateUserExists,
      ])
      .put([
        UsersMiddleware.validateUserExists,
        UsersController.updateUserCityStatus,
      ]);

    this.app
      .route(`/users/removeCityMember/:id`)
      .all([
        //@ts-ignore
        authMiddleware.verifyJWT,
        //@ts-ignore
        authMiddleware.verifyIsAdmin,
        UsersMiddleware.validateUserExists,
      ])
      .put([
        UsersMiddleware.validateUserExists,
        UsersController.removeUserCityStatus,
      ]);

    return this.app;
  }
}
