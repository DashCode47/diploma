import axios from "axios";
import queryString from "query-string";

const baseURL = "http://localhost:8005/api/";

const uploadClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
  headers: {
    "Content-Type": "multipart/form-data", // Update the Content-Type header
  },
});

uploadClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      Accept: "application/json",
    },
  };
});

uploadClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);

export default uploadClient;
