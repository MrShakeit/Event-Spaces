import SpacesRepository from "./spaces.repository";
import { CRUD } from "../common/interfaces/crud.interface";
import { Space } from "./spaces.types";

class SpacesService implements CRUD {
  async create(resource: Space) {
    return SpacesRepository.addSpace(resource);
  }

  async updateById(id: string, resource: Partial<Space>): Promise<any> {
    return SpacesRepository.updateSpaceById(id, resource);
  }

  async deleteById(id: string): Promise<any> {
    return SpacesRepository.removeSpaceById(id);
  }

  async list(limit: number, page: number) {
    return SpacesRepository.getSpaces(limit, page);
  }

  async readById(id: string) {
    return SpacesRepository.getSpaceById(id);
  }
}

export default new SpacesService();
