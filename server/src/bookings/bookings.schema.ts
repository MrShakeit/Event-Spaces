import { Request } from "express";
import Joi from "joi";
import { SchemaValidator } from "../common/middleware/schema.validator";
import { Booking } from "./bookings.types";

export class BookingsSchema extends SchemaValidator {
  async validateCreateBooking(body: Request["body"]) {
    const schema = Joi.object<Booking>({
      start_date: Joi.date().min("now").iso().required(),
      end_date: Joi.date().iso().min(Joi.ref("start_date")).required(),
      space_id: Joi.string().trim().required(),
      user_id: Joi.string().trim().required(),
      is_canceled: Joi.boolean(),
      is_paid: Joi.boolean(),
      paid: Joi.number().required(),
      reason: Joi.string().trim().min(0).max(200),
    });

    return this.validate(body, schema);
  }
  async validateGetBookings(query: Request["query"]) {
    const schema = Joi.object<any>({
      limit: Joi.number().max(20).min(0).required(),
      page: Joi.number().min(0).required(),
    });
    return this.validate(query, schema);
  }
  async validateGetCalendar(query: Request["query"]) {
    const schema = Joi.object<any>({
      start_date: Joi.date().iso().required(),
      end_date: Joi.date().iso().required(),
      space_id: Joi.string().trim().required(),
    });
    return this.validate(query, schema);
  }
  async validateUpdateBooking(body: Request["body"]) {
    const schema = Joi.object<Booking>({
      start_date: Joi.date(),
      end_date: Joi.date(),
      space_id: Joi.string().trim(),
      user_id: Joi.string().trim(),
      is_approved: Joi.boolean(),
      is_canceled: Joi.boolean(),
      is_deleted: Joi.boolean(),
      is_paid: Joi.boolean(),
      paid: Joi.number(),
      reason: Joi.string().trim().min(0).max(200),
      penalty_info: Joi.string().trim().min(0).max(200),
    }).min(1);
    return this.validate(body, schema);
  }
}

export default new BookingsSchema();
