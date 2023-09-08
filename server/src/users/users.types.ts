import { WithId } from "mongodb";
import { Booking } from "../bookings/bookings.types";
import { Space } from "../spaces/spaces.types";

export interface CreateUserDto {
  email: string;
  password: string;
  name: {
    first: string;
    last: string;
    prefix: string;
  };
  gender?: string;
  address?: {
    city: string;
    number: string;
    street: string;
    postalCode: string;
    subdivision?: string;
    barangay: string;
  };
  // govIdPicture: string;
  // profilePicture?: string;
  // isCityMember: boolean;
  // isBlocked: boolean;
  // blockReason?: string;
  // permissionFlags?: number;
}

export interface PutUserDto {
  email: string;
  password: string;
  name: {
    first: string;
    last: string;
    prefix: string;
  };
  gender?: string;
  address?: {
    city: string;
    number: string;
    street: string;
    postalCode: string;
    subdivision?: string;
    barangay: string;
  };
  permissionFlags: number;
  isBlocked: boolean;
  blockReason?: string | null;
  isCityMember: boolean;
}

type BookingWithSpace = Booking & { space: Space };
export type GetUsersDetails = User & { bookings: BookingWithSpace[] };

export interface UserEntity {
  email: string;
  password: string;
  name: {
    first: string;
    last: string;
    prefix: string;
  };
  gender?: string;
  address?: {
    city: string;
    number: string;
    street: string;
    postalCode: string;
    subdivision?: string;
    barangay: string;
  };
  permissionFlags: number;
  isBlocked: boolean;
  blockReason?: string | null;
  isCityMember: boolean;
}

type User = Omit<WithId<UserEntity>, "password">;

export type UsersList = Array<Omit<WithId<UserEntity>, "password">>;

export interface GetUsersDto {
  limit: number;
  page: number;
}
