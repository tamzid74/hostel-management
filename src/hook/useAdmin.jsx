import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../provider/Authprovider";

const useAdmin = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: profile = [], refetch } = useQuery({
    queryKey: ["profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user.email}`);
      return res.data;
    },
  });

  const [admin] = profile;

  return [admin, refetch];
};

export default useAdmin;


