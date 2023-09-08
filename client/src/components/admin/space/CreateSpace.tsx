import { adminApi } from "../../../api/admin-api";
import { CreateSpace } from "../../../pages/types/spaces";
import { SpaceForm } from "./SpaceForm";

export const CreateSpacePage = () => {
  const handleCreateSpace = async (space: CreateSpace) => {
    try {
      const response = await adminApi.createSpace(space);
      console.log("Space created successfully. ID:", response.id);
    } catch (error) {
      console.error("Error creating space", error);
    }
  };
  return <SpaceForm handleSubmit={handleCreateSpace} />;
};
