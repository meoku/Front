import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "https://port-0-meokuserver-1cupyg2klv9emciy.sel5.cloudtype.app/api/v1",
  timeout: 10000,
});

export default axiosInstance;
