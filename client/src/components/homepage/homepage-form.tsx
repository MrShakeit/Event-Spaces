import React, { useState, useEffect } from "react";
import { Space } from "../../pages/types/spaces";
import { useNavigate } from "react-router-dom";

const HomePageForm: React.FC = () => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/admin/spaces?limit=20&page=0")
      .then((res) => res.json())
      .then((data) => setSpaces(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 shadow-lg">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Welcome to Event Spaces
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
        {spaces.map((space) => (
          <div
            onClick={() => navigate("/space")}
            key={space.name}
            className="group relative"
          >
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Valenzuela_Seal.svg/2048px-Valenzuela_Seal.svg.png"
                alt={space.name}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <span className="absolute inset-0"></span>
                  {space.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">Size: {space.size}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                ${space.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageForm;
