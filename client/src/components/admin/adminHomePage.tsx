import React from "react";
import { adminApi } from "../../api/admin-api";

const AdminHomePage: React.FC = () => {
  const handleClick = async () => {
    const users = await adminApi.getUsers({
      limit: 20,
      page: 0,
    });
    console.log(users);
  };
  return (
    <div>
      <h2>Admin Page</h2>
      <div></div>
    </div>
  );
};

export default AdminHomePage;
