import React from "react";
import { adminApi } from "../../../api/admin-api";

const AdminBookingsPage: React.FC = () => {
  const handleClick = () => {
    fetch("http://localhost:8000/bookings?limit=2&page=0")
      .then((res) => res.json().then((data) => alert(JSON.stringify(data))))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div>Bookings page</div>
      <div>
        <button onClick={handleClick}>List Bookings</button>
      </div>
    </div>
  );
};

export default AdminBookingsPage;
