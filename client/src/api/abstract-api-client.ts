import axios, { AxiosInstance, AxiosError } from "axios";

const BASE_URL = "http://localhost:8000";

export abstract class AbstractApiService {
  protected readonly http: AxiosInstance;

  constructor(
    protected readonly path?: string,
    protected readonly baseURL: string = BASE_URL! || "",
    protected readonly headers?: object
  ) {
    if (path) {
      baseURL += path;
    }

    this.http = axios.create({
      baseURL,
      headers: { ...this.headers },
      validateStatus: (status) => status < 400,
    });
    this.http.interceptors.request.use((req) => {
      if (req.headers) {
        const accessToken = localStorage.getItem("accessToken");
        req.headers.Authorization = `Bearer ${accessToken}`;
      }
      return req;
    });
    this.http.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("user");
          return Promise.reject("/auth/signin");
        }
        return Promise.reject(error);
      }
    );
  }
}
