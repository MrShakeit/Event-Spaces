// we import express to add types to the request/response objects from our controller functions
import { Request, Response } from "express";
import spacesService from "./spaces.service";

// we use debug with a custom context as described
import debug from "debug";
import spacesSchema from "./spaces.schema";
import { CustomError } from "../common/middleware/common.error";

const log: debug.IDebugger = debug("app:spaces-controller");
class SpacesController {
  async createSpace(req: Request, res: Response) {
    try {
      const body = await spacesSchema.validateCreateSpace(req.body);
      const spaceId = await spacesService.create(body);
      res.status(201).send({ id: spaceId });
    } catch (error) {
      const err = error as CustomError;
      log("error", err.message);
      res.status(err.status || 500).send({ message: err.message });
    }
  }

  async updateSpace(req: Request, res: Response) {
    try {
      const body = await spacesSchema.validateUpdateSpace(req.body);
      const id = await spacesSchema.validateId(req.params.id);
      await spacesService.updateById(id, body);
      res.status(204).send("update succesfull");
    } catch (error) {
      const err = error as CustomError;
      log("error", err.message);
      res.status(err.status || 500).send({ message: err.message });
    }
  }

  async removeSpace(req: Request, res: Response) {
    try {
      const id = await spacesSchema.validateId(req.params.id);
      await spacesService.deleteById(id);
      res.status(204).send();
    } catch (error) {
      const err = error as CustomError;
      log("error", err.message);
      res.status(err.status || 500).send({ message: err.message });
    }
  }

  async listSpaces(req: Request, res: Response) {
    try {
      const query = await spacesSchema.validateGetSpaces(req.query);
      const users = await spacesService.list(query.limit, query.page);
      res.status(200).send(users);
    } catch (error) {
      const err = error as CustomError;
      log("error", err.message);
      res.status(err.status || 500).send({ message: err.message });
    }
  }

  async getSpaceDetails(req: Request, res: Response) {
    try {
      const spaceId = req.params.id;
      console.log("id", spaceId);
      const getSpaceDetails = await spacesService.readSpaceDetails(spaceId);
      res.status(200).send(getSpaceDetails);
    } catch (error) {
      const err = error as CustomError;
      log("error", err.message);
      res.status(err.status || 500).send({ message: err.message });
    }
  }

  async getSpaceById(req: Request, res: Response) {
    try {
      const id = await spacesSchema.validateId(req.params.id);
      const user = await spacesService.readById(id);
      res.status(200).send(user);
    } catch (error) {
      const err = error as CustomError;
      log("error", err.message);
      res.status(err.status || 500).send({ message: err.message });
    }
  }
}

export default new SpacesController();
