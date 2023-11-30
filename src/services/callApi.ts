import axios, { AxiosError } from "axios";
import { ValidationError } from "../helper/ValidationError";

const callApi = () => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/",
    // baseURL: "https://jsonplaceholder.typicode.com/users",
  });

  // axiosInstance.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
  //   "token",
  // )}`;

  axiosInstance.interceptors.request.use(
    (config) => {
      //localstorage
      const token = localStorage.getItem("token");
      if (token) {
        const result = token?.substring(1, token.length - 1);

        config.headers["Authorization"] = `Bearer ${result}`;
      }

      return config;
    },
    (err) => Promise.reject(err),
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      // console.log("mamad", res);
      return res;
    },
    (err) => {
      // const error = err as AxiosError;
      //handle all 422 errors
      // if (err.response.status === 422) {
      //   throw new ValidationError(err.response.data.errors);
      // }
      return Promise.reject(err);
    },
  );

  return axiosInstance;
};

export default callApi;
