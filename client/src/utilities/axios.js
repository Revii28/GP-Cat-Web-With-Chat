import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ipw3.cat-adopt.online",
});

export default axiosInstance;
