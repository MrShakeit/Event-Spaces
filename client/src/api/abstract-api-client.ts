// import axios, { AxiosInstance, AxiosError } from "axios";
// import { useNavigate } from "react-router-dom";

// export abstract class AbstractApiService {
//   protected readonly http: AxiosInstance;

//   //Constructor
//   protected constructor(
//     protected readonly path?: string,
//     protected readonly baseURL: string = process.env.BASE_URL! || "",
//     protected readonly headers?: object
//   ) {
//     if (path) {
//       baseURL += path;
//     }
//     //instance of axios for making http req
//     this.http = axios.create({
//       baseURL,
//       headers: { ...this.headers },
//       validateStatus: (status) => status < 400,
//     });
//     //interceptor to modify req before sending
//     this.http.interceptors.request.use((req) => {
//       if (req.headers) {
//         //get accesstoken from localstorage and set auth header
//         const accessToken = localStorage.getItem("accessToken");
//         req.headers.Authorization = `Bearer ${accessToken}`;
//       }
//       return req;
//     });
//     //interceptor for handilng reponses and errors
//     this.http.interceptors.response.use(
//       (response) => {
//         return response;
//       },
//       (error: AxiosError) => {
//         if (error.response?.status === 401) {
//           localStorage.removeItem("user");
//           const navigate = useNavigate(); // Access the history object
//           navigate("/auth/signin"); // use navigate to redirect to
//         }
//         throw new Error(error.message); //throw the error
//       }
//     );
//   }
// }
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
          // Return a promise that will be resolved with the navigate function
          return Promise.reject("/auth/signin");
        }
        return Promise.reject(error);
      }
    );
  }
}
