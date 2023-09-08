import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminApi } from "../../../api/admin-api";
import { Space } from "../../../pages/types/spaces";
import { Booking } from "../../../pages/types/bookings";

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
    <div className="px-4 py-2">
      {space ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Space Details</h2>
          <div className="grid grid-cols-2 gap-5 mb-4">
            <div className="">
              <button
                onClick={() => navigate(`/admin/update/space/${id}`, {state:{space}})}
                className="relative inline-flex items-center rounded-md border-2 border-blue-500 bg-blue-500 hover:bg-blue-700 text-white px-2 py-2 text-sm mb-2 font-medium "
              >
                Update Space
              </button>

              <p>
                <strong>Space ID:</strong> {space._id}
              </p>
              <p>
                <strong>Name:</strong> {space.name}
              </p>
              <p>
                <strong>Size:</strong> {space.size}
              </p>

              <p>
                <strong>City:</strong> {space.address?.city}
              </p>
              <p>
                <strong>Number:</strong> {space.address?.number}
              </p>
              <p>
                <strong>Street:</strong> {space.address?.street}
              </p>
              <p>
                <strong>Floor:</strong> {space.address?.floor}
              </p>
              <p>
                <strong>Room Number:</strong> {space.address?.room_no}
              </p>
              <p>
                <strong>Other:</strong> {space.address?.other}
              </p>

              <p>
                <strong>Price:</strong> {space.price}
              </p>
              <p>
                <strong>Description:</strong> {space.description}
              </p>
              <p>
                <strong>Is Deleted:</strong> {space.is_deleted ? "Yes" : "No"}
              </p>
              <p>
                <strong>Is Blocked:</strong> {space.is_blocked ? "Yes" : "No"}
              </p>
            </div>
          </div>
          {space.bookings ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">Bookings</h2>
              {space.bookings.map((booking: Booking, index: number) => (
                <div key={index} className="mb-4 border p-4 rounded">
                  <p>
                    <strong>Booking ID:</strong> {booking._id}
                  </p>
                  <p>
                    <strong>Start Date:</strong> {booking.start_date}
                  </p>
                  <p>
                    <strong>End Date:</strong> {booking.end_date}
                  </p>
                  {booking.user ? (
                    <div>
                      <p>
                        <strong>User Name:</strong> {booking.user.name?.first}
                      </p>
                      <p>
                        <strong>User Email:</strong> {booking.user.email}
                      </p>
                    </div>
                  ) : (
                    <p>No user associated with this booking.</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No bookings available for this space.</p>
          )}
        </div>
      ) : (
        <p>Loading space details...</p>
      )}
    </div>
  );
};

export default AdminSpaceDetailsPage;
