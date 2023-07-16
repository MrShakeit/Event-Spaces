import { CommonRoutesConfig } from "../common/common.routes.config";
import authController from "./auth.controller";
import authMiddleware from "./auth.middleware";
import express from "express";
import { body } from "express-validator";

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "AuthRoutes");
  }

  configureRoutes(): express.Application {
    this.app.post(`/auth`, [
      body("email").isEmail(),
      body("password").isString(),
      authMiddleware.verifyUserPassword,
      authController.createJWT,
    ]);
    return this.app;
  }
}
