import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SpaceForm } from "./SpaceForm";
import { useEffect, useState } from "react";
import { adminApi } from "../../../api/admin-api";
import { CreateSpace } from "../../../pages/types/spaces";

export const UpdateSpace = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [space, setSpace] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    const fetchSpace = async () => {
      let space = location.state?.space;

      if (!space) {
        space = await adminApi.getSpaceDetails(id!);
        console.log("error", space);
        if (!space) {
          navigate(`/NotFound`);
        }
      }
      setSpace(space);
      setIsLoading(false);
    };
    fetchSpace();
  }, []);

  const handleUpdateSpace = async (updatedSpaceData: CreateSpace) => {
    try {
      await adminApi.updateSpace(id!, updatedSpaceData);
      console.log("Space updated successfully");
      navigate(`/space/${id}`);
    } catch (error) {
      console.error("Error updating space", error);
    }
  };
  return (
    <>
      {isLoading && !space ? (
        <div>loading</div>
      ) : (
        <SpaceForm space={space} handleSubmit={handleUpdateSpace} />
      )}
    </>
  );
};
