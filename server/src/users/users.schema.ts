import { Request } from "express";
import Joi from "joi";
import { SchemaValidator } from "../common/middleware/schema.validator";
import { CreateUserDto, GetUsersDto, PutUserDto } from "./users.types";
import UsersDao from "./users.repository";
export class UsersSchema extends SchemaValidator {
  async validateCreateUser(body: Request["body"]) {
    const schema = Joi.object<CreateUserDto>({
      email: Joi.string().trim().max(200).email().required(),
      password: Joi.string().trim().min(8).max(200).required(),
      name: {
        first: Joi.string().max(100).required(),
        last: Joi.string().max(100).required(),
        prefix: Joi.string().max(100).optional(),
      },
      gender: Joi.string().max(200).optional(),
      address: {
        city: Joi.string().max(100).required(),
        street: Joi.string().max(100).required(),
        number: Joi.string().max(100).required(),
        postalCode: Joi.string().max(100).required(),
        subdivision: Joi.string().max(100).required(),
        barangay: Joi.string().max(100).required(),
      },
      //govIdPicture: Joi.string().max(1000).optional(),
      //isBlocked: Joi.boolean().default(false),
      //isCityMember: Joi.boolean().default(false),
    });

    const result = await this.validate(body, schema);
    const existingEmail = await UsersDao.getUserByEmailWithPassword(
      result.email
    );
    if (existingEmail) {
      throw new Error("Email already exists.");
    }

    return result;
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
      isBlocked: Joi.boolean().optional(),
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
