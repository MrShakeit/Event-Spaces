import authMiddleware from "../auth/auth.middleware";
import { CommonRoutesConfig } from "../common/common.routes.config";
import express from "express";
import bookingsController from "./bookings.controller";

export class BookingsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "BookingsRoutes");
  }

  //User can list space bookings limited data
  //User can book
  //User can cancel
  //Admin can cancel

  configureRoutes(): express.Application {
    this.app
      .route(`/bookings`)
      .get(
        //@ts-ignore
        authMiddleware.verifyJWT,
        authMiddleware.verifyIsAdmin,
        bookingsController.listAdminBookings
      )
      .post(
        //@ts-ignore
        authMiddleware.verifyJWT,
        bookingsController.createBooking
      );
    this.app.route(`/bookings/calendar/spaceId`).get(
      //@ts-ignore
      authMiddleware.verifyJWT,
      bookingsController.getBookingsWithinDateRange
    );

    this.app
      .route(`/bookings/user/:id`)

      .get([
        //@ts-ignore
        authMiddleware.verifyJWT,
        bookingsController.listUserBookings,
      ]);

    this.app
      .route(`/bookings/:id`)
      .all([
        //@ts-ignore
        authMiddleware.verifyJWT,
        authMiddleware.onlySameUserOrAdminCanDoThisAction,
      ])
      .get(bookingsController.getBookingById)
      //@ts-ignore
      .delete([authMiddleware.verifyIsAdmin, bookingsController.removeBooking])
      //@ts-ignore
      .put([authMiddleware.verifyIsAdmin, bookingsController.updateBooking]);

    return this.app;
  }
}
