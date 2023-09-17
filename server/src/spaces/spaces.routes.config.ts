import authMiddleware from "../auth/auth.middleware";
import { CommonRoutesConfig } from "../common/common.routes.config";
import express from "express";
import spacesController from "./spaces.controller";
import spacesRepository from "./spaces.repository";

export class SpacesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "SpacesRoutes");
  }

  configureRoutes(): express.Application {
    this.app.route(`/admin/spaces`).get(
      //@ts-ignore
      //authMiddleware.verifyJWT,
      spacesController.listSpaces
    );

    this.app.route(`/admin/create/space`).post(
      //@ts-ignore
      authMiddleware.verifyJWT,
      authMiddleware.verifyIsAdmin,
      spacesController.createSpace
    );
    this.app.route(`/admin/space/details/:id`).get(
      //@ts-ignore
      authMiddleware.verifyJWT,
      authMiddleware.verifyIsAdmin,
      spacesController.getSpaceDetails
    );

    this.app
      .route(`/admin/update/space/:id`)
      .all([
        //@ts-ignore
        authMiddleware.verifyJWT,
      ])
      .get(spacesController.getSpaceById)
      //@ts-ignore
      .delete([authMiddleware.verifyIsAdmin, spacesController.removeSpace])
      //@ts-ignore
      .put([authMiddleware.verifyIsAdmin, spacesController.updateSpace]);
    return this.app;
  }
}
