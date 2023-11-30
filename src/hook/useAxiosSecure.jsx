import axios from "axios";

const axiosSecure = axios.create({ baseURL: "https://b8-a12-hostelhub-server-side.vercel.app/health" });
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
