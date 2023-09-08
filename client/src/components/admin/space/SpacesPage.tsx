import React, { useEffect, useState } from "react";
import { adminApi } from "../../../api/admin-api";
import { useNavigate } from "react-router-dom";
import { Space } from "../../../pages/types/spaces";
import spaceplaceholder from "../../../assets/icon/spaceplaceholder.jpg";

const AdminSpacesPage: React.FC = () => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const fetchUsers = async (page: number) => {
    try {
      const response = await adminApi.getSpaces({ limit: 20, page });
      setSpaces(response);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 mt-4 lg:max-w-7xl lg:px-8 ">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Spaces Page
      </h2>
      <div className="flex mt-2">
        <button
          onClick={() => navigate(`/admin/create/space/`)}
          className="relative inline-flex items-center rounded-md border-2 border-blue-500 bg-blue-500 hover:bg-blue-700 text-white px-2 py-2 text-sm font-medium "
        >
          Create New Space
        </button>
        <div className="flex ml-auto">
          <button
            className="relative inline-flex items-center rounded-l-md border-2 border-blue-500 bg-blue-500 hover:bg-blue-700 text-white px-2 py-2 text-sm font-medium "
            disabled={currentPage === 0}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 border-2">
            {currentPage + 1}
          </div>
          <button
            className="relative inline-flex items-center rounded-r-lg border-2 border-blue-500 bg-blue-500 hover:bg-blue-700 text-white px-2 py-2 text-sm font-medium "
            disabled={spaces.length < 20}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <span className="sr-only">Next</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {spaces.map((space, i) => (
          <div
            onClick={() => navigate(`/admin/space/details/${space._id}`)}
            className="cursor-pointer border p-4 flex items-center"
            key={i}
          >
            <img
              className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
              src={spaceplaceholder}
              alt="space icon"
            />
            <div className=" ml-4">
              <h3 className="text-sm font-medium">{space.name}</h3>
              <h3 className="text-sm font-medium">{space.size}</h3>

              <h3 className="text-sm font-medium">
                {space.address?.street}, {space.address?.number}
              </h3>
              <h3 className="text-sm font-medium">
                {space.address?.floor}, {space.address?.room_no}
              </h3>
              <h3 className="text-sm font-medium">{space.price}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSpacesPage;
