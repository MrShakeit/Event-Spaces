import { Request } from "express";
import Joi from "joi";
import { SchemaValidator } from "../common/middleware/schema.validator";
import { CreateUserDto, GetUsersDto, PutUserDto } from "./users.types";

export class UsersSchema extends SchemaValidator {
  async validateCreateUser(body: Request["body"]) {
    const schema = Joi.object<CreateUserDto>({
      email: Joi.string().trim().max(200).email().required(),
      password: Joi.string().trim().min(8).max(200).required(),
    });

    return this.validate(body, schema);
  }
  async validateGetUsers(query: Request["query"]) {
    const schema = Joi.object<GetUsersDto>({
      limit: Joi.number().max(20).min(0).required(),
      page: Joi.number().min(0).required(),
    });
    return this.validate(query, schema);
  }
  async validateUpdateUser(body: Request["body"]) {
    const schema = Joi.object<PutUserDto>({
      email: Joi.string().trim().max(200).email().required(),
      password: Joi.string().trim().min(8).max(200).required(),
      firstName: Joi.string().optional(),
      lastName: Joi.string().optional(),
      permissionFlags: Joi.number().optional(),
    });

    return this.validate(body, schema);
  }
  async validateQuery(query: Request["query"]) {
    const schema = Joi.object<{ query: string }>({
      query: Joi.string().trim().min(3).max(200).required(),
    });

    return this.validate(query, schema);
  }
}

export default new UsersSchema();
