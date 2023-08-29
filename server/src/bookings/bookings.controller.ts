// we import express to add types to the request/response objects from our controller functions
import { Request, Response } from "express";
import bookingsService from "./bookings.service";

// we use debug with a custom context as described
import debug from "debug";
import bookingsSchema, { BookingsSchema } from "./bookings.schema";
import { CustomError } from "../common/middleware/common.error";
import usersService from "../users/users.service";
import { addDays, startOfDay } from "date-fns";
import spacesSchema from "../spaces/spaces.schema";

const log: debug.IDebugger = debug("app:booking-controller");
class BookingsController {
  async createBooking(req: Request, res: Response) {
    try {
      const userId = req.body.user_id;
      const user = await usersService.readById(userId);
      if (user && user.isBlocked) {
        throw new CustomError(
          403,
          "Your account is blocked. You cannot create bookings."
        );
      }
      const body = await bookingsSchema.validateCreateBooking(req.body);
      await bookingsService.validateNoOverlapping(body);
      const bookingId = await bookingsService.create(body);
      res.status(201).send({ id: bookingId });
    } catch (error) {
      const err = error as CustomError;
      log("error", err.message);
      res.status(err.status || 500).send({ message: err.message });
    }
  }

  //User can cancel

  async updateBooking(req: Request, res: Response) {
    try {
      const body = await bookingsSchema.validateUpdateBooking(req.body);
      const id = await bookingsSchema.validateId(req.params.id);
      await bookingsService.updateById(id, body);
      res.status(204).send();
    } catch (error) {
      const err = error as CustomError;
      log("error", err.message);
      res.status(err.status || 500).send({ message: err.message });
    }
  }

  async getBookingsWithinDateRange(req: Request, res: Response) {
    try {
      const query = await bookingsSchema.validateGetCalendar(req.query);
      const start_date = new Date(query.start_date);
      const end_date = new Date(query.end_date);

      const space_id = query.space_id;

      //{"2023-07-10": [{},{}], "23-07-11": []}
      const bookings = await bookingsService.getBookingsCalendar(
        start_date,
        end_date,
        space_id
      );

      res.status(200).send(bookings);
    } catch (error) {
      const err = error as CustomError;
      log("error", err.message);
      res.status(err.status || 500).send({ message: err.message });
    }
  }

  async removeBooking(req: Request, res: Response) {
    try {
      const id = await bookingsSchema.validateId(req.params.id);
      await bookingsService.updateById(id, { is_deleted: true });
      res.status(204).send();
    } catch (error) {
      const err = error as CustomError;
      log("error", err.message);
      res.status(err.status || 500).send({ message: err.message });
    }
  }

  //Admin can read all bookings
  async listAdminBookings(req: Request, res: Response) {
    try {
      const query = await bookingsSchema.validateGetBookings(req.query);
      const users = await bookingsService.list(query.limit, query.page);
      res.status(200).send(users);
    } catch (error) {
      const err = error as CustomError;
      log("error", err.message);
      res.status(err.status || 500).send({ message: err.message });
    }
  }

  //User can list space bookings limited data
  async listUserBookings(req: Request, res: Response) {
    try {
      const query = await bookingsSchema.validateGetBookings(req.query);
      const userId = req.params.id;

      const userBookings = await bookingsService.listUserBookings(
        userId,
        query.limit,
        query.page
      );

      res.status(200).send(userBookings);
    } catch (error) {
      const err = error as CustomError;
      log("error", err.message);
      res.status(err.status || 500).send({ message: err.message });
    }
  }

  async getBookingById(req: Request, res: Response) {
    try {
      const id = await bookingsSchema.validateId(req.params.id);
      const user = await bookingsService.readById(id);
      res.status(200).send(user);
    } catch (error) {
      const err = error as CustomError;
      log("error", err.message);
      res.status(err.status || 500).send({ message: err.message });
    }
  }
}

export default new BookingsController();
