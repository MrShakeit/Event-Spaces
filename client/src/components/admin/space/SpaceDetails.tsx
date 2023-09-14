import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminApi } from "../../../api/admin-api";
import { Space } from "../../../pages/types/spaces";
import { Booking } from "../../../pages/types/bookings";
import { Button, Card, Container } from "react-bootstrap";

const AdminSpaceDetailsPage = () => {
  const { id } = useParams();
  const [space, setSpaceDetails] = useState<Space | null>(null);
  const navigate = useNavigate();

  const fetchSpaceDetails = async () => {
    try {
      if (id) {
        const spaceDetailsResponse = await adminApi.getSpaceDetails(id);
        setSpaceDetails(spaceDetailsResponse);
      }
    } catch (error) {
      console.error("Error fetching space details", error);
    }
  };

  useEffect(() => {
    fetchSpaceDetails();
  }, [id]);

  return (
    <Container className="mx-auto max-w-2xl px-4 py-2">
      {space ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Space Details</h2>
          <div className="grid grid-cols-2 gap-5 mb-4">
            <div className="">
              <Button
                onClick={() =>
                  navigate(`/admin/update/space/${id}`, { state: { space } })
                }
                className="relative inline-flex items-center rounded-md border-2 border-blue-500 bg-blue-500 hover:bg-blue-700 text-white px-2 py-2 text-sm mb-2 font-medium"
              >
                Update Space
              </Button>

              <Card>
                <Card.Body>
                  <Card.Text>
                    <strong>Space ID:</strong> {space._id}
                  </Card.Text>
                  <Card.Text>
                    <strong>Name:</strong> {space.name}
                  </Card.Text>
                  <Card.Text>
                    <strong>Size:</strong> {space.size}
                  </Card.Text>

                  <Card.Text>
                    <strong>City:</strong> {space.address?.city}
                  </Card.Text>
                  <Card.Text>
                    <strong>Number:</strong> {space.address?.number}
                  </Card.Text>
                  <Card.Text>
                    <strong>Street:</strong> {space.address?.street}
                  </Card.Text>
                  <Card.Text>
                    <strong>Floor:</strong> {space.address?.floor}
                  </Card.Text>
                  <Card.Text>
                    <strong>Room Number:</strong> {space.address?.room_no}
                  </Card.Text>
                  <Card.Text>
                    <strong>Other:</strong> {space.address?.other}
                  </Card.Text>

                  <Card.Text>
                    <strong>Price:</strong> {space.price}
                  </Card.Text>
                  <Card.Text>
                    <strong>Description:</strong> {space.description}
                  </Card.Text>
                  <Card.Text>
                    <strong>Is Deleted:</strong>{" "}
                    {space.is_deleted ? "Yes" : "No"}
                  </Card.Text>
                  <Card.Text>
                    <strong>Is Blocked:</strong>{" "}
                    {space.is_blocked ? "Yes" : "No"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
          {space.bookings ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">Bookings</h2>
              {space.bookings.map((booking: Booking, index: number) => (
                <Card key={index} className="mb-4 border p-4 rounded">
                  <Card.Body>
                    <Card.Text>
                      <strong>Booking ID:</strong> {booking._id}
                    </Card.Text>
                    <Card.Text>
                      <strong>Start Date:</strong> {booking.start_date}
                    </Card.Text>
                    <Card.Text>
                      <strong>End Date:</strong> {booking.end_date}
                    </Card.Text>
                    {booking.user ? (
                      <div>
                        <Card.Text>
                          <strong>User Name:</strong> {booking.user.name?.first}
                        </Card.Text>
                        <Card.Text>
                          <strong>User Email:</strong> {booking.user.email}
                        </Card.Text>
                      </div>
                    ) : (
                      <Card.Text>
                        No user associated with this booking.
                      </Card.Text>
                    )}
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <p>No bookings available for this space.</p>
          )}
        </div>
      ) : (
        <p>Loading space details...</p>
      )}
    </Container>
  );
};

export default AdminSpaceDetailsPage;
