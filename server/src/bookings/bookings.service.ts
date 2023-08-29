import BookingsRepository from "./bookings.repository";
import { CRUD } from "../common/interfaces/crud.interface";
import { Booking } from "./bookings.types";
import { CustomError } from "../common/middleware/common.error";
import { query } from "express";

class BookingsService implements CRUD {
  async create(resource: Booking) {
    return BookingsRepository.addBooking(resource);
  }
  async validateNoOverlapping(booking: Booking) {
    const overlappingBooking = await BookingsRepository.findOverlappingBooking(
      booking
    );
    if (overlappingBooking) {
      throw new CustomError(
        400,
        "Booking dates overlap with existing bookings."
      );
    }
    return overlappingBooking;
  }

  async updateById(id: string, resource: Partial<Booking>): Promise<any> {
    return BookingsRepository.updateBookingById(id, resource);
  }

  async deleteById(id: string): Promise<any> {
    return BookingsRepository.removeBookingById(id);
  }

  async list(limit: number, page: number) {
    return BookingsRepository.getBookings(limit, page);
  }

  async listUserBookings(userId: string, limit: number, page: number) {
    return BookingsRepository.getUserBookings(userId, limit, page);
  }

  async readById(id: string) {
    return BookingsRepository.getBookingById(id);
  }

  async getBookingsCalendar(
    start_date: Date,
    end_date: Date,
    space_id: string
  ) {
    return BookingsRepository.getBookingsWithinDateRange({
      start_date,
      end_date,
      space_id,
    });
  }
}

export default new BookingsService();
