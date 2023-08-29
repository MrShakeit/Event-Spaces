import { ObjectId } from "mongodb";

export interface Booking {
  _id: ObjectId;
  start_date: Date;
  end_date: Date;
  space_id: ObjectId;
  user_id: ObjectId;
  is_approved: boolean;
  is_canceled: boolean;
  is_deleted: boolean;
  is_paid: boolean;
  paid: number;
  reason: string;
  penalty_info: string;
}
/*Venue Code,
Venue Description,
Category, 
Booking Date, 
Booking Time, 
Booking Date Received, 
Booking Date Paid, 
Booking Approver, 
Booking Date/Time Approved, 
Penalty Information, 
Booking Creator Contact Details*/
