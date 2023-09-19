import {
  GetsSpaceDetails,
  GetSpacesRequests,
  GetSpacesResponse,
} from "../pages/types/spaces";
import { AbstractApiService } from "./abstract-api-client";

export class SpaceApi extends AbstractApiService {
  constructor() {
    super("");
  }

  async getUserSpaceDetails(spaceId: string): Promise<GetsSpaceDetails> {
    const res = await this.http.get(`/space/details/${spaceId}`);
    return res.data;
  }

  async getSpaces(params: GetSpacesRequests): Promise<GetSpacesResponse> {
    const res = await this.http.get("/space/list", {
      params,
    });
    return res.data;
  }
}

export const spaceApi = new SpaceApi();
