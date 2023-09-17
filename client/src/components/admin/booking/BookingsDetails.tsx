import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminApi } from "../../../api/admin-api";
import { Booking } from "../../../pages/types/bookings";
import { Button, Card, Container } from "react-bootstrap";

export const AdminBookingDetailsPage = () => {
  const { id } = useParams();
  const [booking, setBookingDetails] = useState<Booking | null>(null);
  const navigate = useNavigate();

  const fetchBookingDetails = async () => {
    try {
      if (id) {
        const response = await adminApi.getBookingDetails(id);
        setBookingDetails(response);
      }
    } catch (error) {
      console.error("Error fetching booking details", error);
    }
  };

  useEffect(() => {
    fetchBookingDetails();
  }, [id]);

  return (
    <Container className="mx-auto max-w-2xl px-4 py-2">
      {booking ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">booking Details</h2>
          <div className="grid grid-cols-2 gap-5 mb-4">
            <div className="">
              <Button
                onClick={() =>
                  navigate(`/admin/update/booking/${id}`, {
                    state: { booking },
                  })
                }
                className="relative inline-flex items-center rounded-md border-2 border-blue-500 bg-blue-500 hover:bg-blue-700 text-white px-2 py-2 text-sm mb-2 font-medium"
              >
                Update booking
              </Button>

              <Card>
                <Card.Body>
                  <Card.Text>
                    <strong>booking ID:</strong> {booking._id}
                  </Card.Text>
                  <Card.Text>
                    <strong>Name:</strong> {booking.start_date}
                  </Card.Text>
                  <Card.Text>
                    <strong>Size:</strong> {booking.end_date}
                  </Card.Text>
                  <Card.Text>
                    <strong>Is Deleted:</strong>{" "}
                    {booking.is_deleted ? "Yes" : "No"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
          {booking.space ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">Bookings</h2>
            </div>
          ) : (
            <p>No bookings available for this booking.</p>
          )}
        </div>
      ) : (
        <p>Loading booking details...</p>
      )}
    </Container>
  );
};
