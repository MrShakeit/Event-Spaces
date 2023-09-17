import { Space } from "./spaces";
import { UserEntity } from "./users";

export type BookingEntity = {
  _id: string;
  start_date: string;
  end_date: string;
  space_id: string;
  user_id: string;
  is_approved: boolean;
  is_canceled: boolean;
  is_deleted: boolean;
  is_paid: boolean;
  paid: number;
  reason: string;
  penalty_info: string;
};

export type Booking = {
  _id: string;
  start_date: string;
  end_date: string;
  space_id: string;
  user_id: string;
  is_approved: boolean;
  is_canceled: boolean;
  is_deleted: boolean;
  is_paid: boolean;
  paid: number;
  reason: string;
  penalty_info: string;
  space: Space;
  user: UserEntity;
};

export type GetBookingsRequests = {
  limit: number;
  page: number;
};

export type GetBookingsResponse = BookingEntity[];
