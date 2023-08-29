import { CommonRoutesConfig } from "../common/common.routes.config";
import authController from "./auth.controller";
import authMiddleware from "./auth.middleware";
import express from "express";

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "AuthRoutes");
  }

  configureRoutes(): express.Application {
    this.app.post(`/auth/signin`, [
      authMiddleware.verifyUserPassword,
      authController.createJWT,
    ]);
    //this.app.post(`/auth/signup`, authController.signUp);
    return this.app;
  }
}
