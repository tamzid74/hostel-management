import axios from "axios";

const axiosPublic = axios.create({ baseURL: "https://b8-a12-hostelhub-server-side.vercel.app/health" });
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
