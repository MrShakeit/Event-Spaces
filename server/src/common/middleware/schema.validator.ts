import Joi from "joi";
import { Request } from "express";
import { CustomError } from "./common.error";

export class SchemaValidator {
  protected async validate<K extends keyof Request, ValidatedType>(
    bodyOrQuery: Request[K],
    schema: Joi.ObjectSchema<ValidatedType>
  ): Promise<ValidatedType> {
    try {
      const res = await schema.validateAsync(bodyOrQuery, {
        stripUnknown: true,
      });
      return res;
    } catch (error) {
      throw new CustomError(400, (error as Error).message);
    }
  }

  async validateId(id: any) {
    try {
      const schema = Joi.string().hex().length(24).required();
      const res = await schema.validateAsync(id);
      return res;
    } catch (error) {
      throw new CustomError(400, (error as Error).message);
    }
  }
}

export const schemaValidator = new SchemaValidator();
