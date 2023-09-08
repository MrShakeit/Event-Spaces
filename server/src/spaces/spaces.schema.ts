import { Request } from "express";
import Joi from "joi";
import { SchemaValidator } from "../common/middleware/schema.validator";
import { Space } from "./spaces.types";

export class SpacesSchema extends SchemaValidator {
  async validateCreateSpace(body: Request["body"]) {
    const schema = Joi.object<Space>({
      name: Joi.string().trim().min(0).max(200).required(),
      address: {
        city: Joi.string().trim().min(0).max(200).required(),
        street: Joi.string().trim().min(0).max(200).required(),
        number: Joi.string().trim().min(1).max(100),
        floor: Joi.string().trim().min(0).max(200),
        room_no: Joi.number(),
        other: Joi.string().trim().min(0).max(200),
      },
      size: Joi.string().trim().min(0).max(200),
      price: Joi.number(),
      resident_price: Joi.number(),
      image: Joi.string().trim().min(0).max(200),
      images: Joi.array().max(5),
      videos: Joi.array().max(3),
      description: Joi.string().trim().min(8).max(200),
    });

    return this.validate(body, schema);
  }
  async validateGetSpaces(query: Request["query"]) {
    const schema = Joi.object<any>({
      limit: Joi.number().max(20).min(0).required(),
      page: Joi.number().min(0).required(),
    });
    return this.validate(query, schema);
  }
  async validateUpdateSpace(body: Request["body"]) {
    const schema = Joi.object<Space>({
      name: Joi.string().trim().min(0).max(200).required(),
      address: {
        city: Joi.string().trim().min(0).max(200).required(),
        street: Joi.string().trim().min(0).max(200).required(),
        number: Joi.string().trim().min(0).max(200),
        floor: Joi.number(),
        room_no: Joi.number(),
        other: Joi.string().trim().min(0).max(200),
      },
      size: Joi.string().trim().min(0).max(200),
      price: Joi.number(),
      image: Joi.string().trim().min(0).max(200),
      images: Joi.array().max(5),
      description: Joi.string().trim().min(8).max(200),
    });

    return this.validate(body, schema);
  }
}

export default new SpacesSchema();
