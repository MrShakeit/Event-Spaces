import { useEffect, useState } from "react";
import { adminApi } from "../../../api/admin-api";
import { useNavigate } from "react-router-dom";
import bookingplaceholder from "../../../assets/icon/booking.png";
import { Button, Card, Col, Container, Pagination, Row } from "react-bootstrap";
import { Booking, BookingEntity } from "../../../pages/types/bookings";

export const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState<BookingEntity[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const fetchBookings = async (page: number) => {
    try {
      const response = await adminApi.getBookings({ limit: 20, page });
      setBookings(response);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchBookings(currentPage);
  }, [currentPage]);

  return (
    <Container className="mx-auto max-w-2xl px-4 sm:px-6 mt-4 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold mb-4 tracking-tight text-gray-900">
        Bookings Page
      </h2>
      <Row className="mt-4">
        <Col></Col>
        <Col className="text-end">
          <Pagination>
            <Pagination.Prev
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
            />
            <Pagination.Item active>{currentPage + 1}</Pagination.Item>
            <Pagination.Next
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={bookings.length < 20}
            />
          </Pagination>
        </Col>
      </Row>
      <Row className="mt-6">
        {bookings.map((bookings, i) => (
          <Col key={i} sm={6} md={4} lg={2} className="mb-4">
            <Card
              onClick={() => navigate(`/admin/booking/details/${bookings._id}`)}
              className="cursor-pointer border p-2"
            >
              <Card.Img
                variant="top"
                src={bookingplaceholder}
                alt="space icon"
                className="h-48 w-100"
              />
              <Card.Body>
                <Card.Title>{bookings.start_date}</Card.Title>
                <Card.Text>{bookings.end_date}</Card.Text>
                <Card.Text>{bookings.is_approved}</Card.Text>
                <Card.Text>{bookings.is_paid}$</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
