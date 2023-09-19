import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { adminApi } from "../../../api/admin-api";
import { GetUsersDetails } from "../../../pages/types/users";
import { Booking } from "../../../pages/types/bookings";
import { Card, Col, Container, Row } from "react-bootstrap";

const AdminUserDetailsPage = () => {
  const { id } = useParams();
  const [user, setUserDetails] = useState<GetUsersDetails | null>(null);

  const fetchUserDetails = async () => {
    try {
      if (id) {
        const userDetailsResponse = await adminApi.getUsersDetails(id);
        setUserDetails(userDetailsResponse);
      }
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  return (
    <Container className="mt-5">
      {user ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">User Details</h2>
          <Row className="mb-4">
            <Col sm={6}>
              <Card>
                <Card.Body>
                  <Card.Title>User ID: {user._id}</Card.Title>
                  <Card.Text>Email: {user.email}</Card.Text>
                  <Card.Text>First Name: {user.name?.first}</Card.Text>
                  <Card.Text>Last Name: {user.name?.last}</Card.Text>
                  <Card.Text>Prefix: {user.name?.prefix}</Card.Text>
                  <Card.Text>Gender: {user.gender}</Card.Text>

                  <Card.Text>City: {user.address?.city}</Card.Text>
                  <Card.Text>Postal Code: {user.address?.postalCode}</Card.Text>
                  <Card.Text>Street: {user.address?.street}</Card.Text>
                  <Card.Text>Number: {user.address?.number}</Card.Text>

                  <Card.Text>Barangay: {user.address?.barangay}</Card.Text>
                  <Card.Text>
                    Subdivision: {user.address?.subdivision}
                  </Card.Text>
                  <Card.Text>
                    Permission Flags: {user.permissionFlags}
                  </Card.Text>
                  <Card.Text>
                    Is Blocked: {user.isBlocked ? "Yes" : "No"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {user.bookings && user.bookings.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Bookings</h2>
              {user.bookings.map((booking: Booking, index: number) => (
                <Card key={index} className="mb-4">
                  <Card.Body>
                    <Card.Title>Booking ID: {booking._id}</Card.Title>
                    <Card.Text>Start Date: {booking.start_date}</Card.Text>
                    <Card.Text>End Date: {booking.end_date}</Card.Text>
                    {/* Space details */}
                    <Card.Text>Space Name: {booking.space.name}</Card.Text>
                    {/* Add other space details as needed */}
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </Container>
  );
};

export default AdminUserDetailsPage;
