import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { adminApi } from "../../../api/admin-api";
import { GetUsersDetails } from "../../../pages/types/users";
import { Booking } from "../../../pages/types/bookings";

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
    <div className="px-4 py-2">
      {user ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">User Details</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p>
                <strong>User ID:</strong> {user._id}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>First Name:</strong> {user.name?.first}
              </p>
              <p>
                <strong>Last Name:</strong> {user.name?.last}
              </p>
              <p>
                <strong>Prefix:</strong> {user.name?.prefix}
              </p>
              <p>
                <strong>Gender:</strong> {user.gender}
              </p>
            </div>
            <div>
              <p>
                <strong>City:</strong> {user.address?.city}
              </p>
              <p>
                <strong>Number:</strong> {user.address?.number}
              </p>
              <p>
                <strong>Postal Code:</strong> {user.address?.postalCode}
              </p>
              <p>
                <strong>Street:</strong> {user.address?.street}
              </p>
              <p>
                <strong>Barangay:</strong> {user.address?.barangay}
              </p>
              <p>
                <strong>Subdivision:</strong> {user.address?.subdivision}
              </p>
            </div>
          </div>
          <div className="mb-4">
            <p>
              <strong>Permission Flags:</strong> {user.permissionFlags}
            </p>
            <p>
              <strong>Is Blocked:</strong> {user.isBlocked ? "Yes" : "No"}
            </p>
          </div>
          {user.bookings && user.bookings.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Bookings</h2>
              {user.bookings.map((booking: Booking, index: number) => (
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

                  {/* Space details */}
                  <p>
                    <strong>Space Name:</strong> {booking.space.name}
                  </p>
                  {/* Add other space details as needed */}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default AdminUserDetailsPage;
