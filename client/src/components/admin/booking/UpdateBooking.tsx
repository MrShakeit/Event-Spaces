import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { adminApi } from "../../../api/admin-api";
import { BookingEntity } from "../../../pages/types/bookings";
import { BookingForm } from "./BookingForm";

export const AdminUpdateBooking = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [booking, setBooking] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    const fetchBooking = async () => {
      let booking = location.state?.booking;

      if (!booking) {
        booking = await adminApi.getBookingDetails(id!);
        console.log("error", booking);
        if (!booking) {
          navigate(`/NotFound`);
        }
      }
      setBooking(booking);
      setIsLoading(false);
    };
    fetchBooking();
  }, []);

  const handleUpdateBooking = async (updatedBookingData: BookingEntity) => {
    try {
      await adminApi.updateBooking(id!, updatedBookingData);
      console.log("Booking updated successfully");
      navigate(`/booking/${id}`);
    } catch (error) {
      console.error("Error updating space", error);
    }
  };
  return (
    <>
      {isLoading && !booking ? (
        <div>loading</div>
      ) : (
        <BookingForm booking={booking} handleSubmit={handleUpdateBooking} />
      )}
    </>
  );
};
