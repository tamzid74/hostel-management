import { useContext } from "react";
import { AuthContext } from "../../provider/Authprovider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <div className="flex justify-center -mt-16 ">
            <img className="w-1/2 rounded-full" src={user?.photoURL} />
          </div>
          <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
            {user?.displayName}
          </h2>
          <div className="flex items-center gap-3">
            <div className="badge rounded-full badge-warning gap-2">
              {users[0]?.badge}
            </div>
            <div className="badge rounded-full badge-info gap-2">info</div>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
            <span className="text-primary text-base font-bold">Email:</span>{" "}
            {user?.email}
          </p>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
