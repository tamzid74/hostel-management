import { useContext } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../provider/Authprovider";

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { data: meal = [] } = useQuery({
    queryKey: ["meal"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meal/?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(meal);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="flex justify-center -mt-16 ">
          <img className="w-1/2 rounded-full" src={user?.photoURL} />
        </div>

        <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
          {user?.displayName}
        </h2>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
          <span className="text-primary text-base font-bold">Email:</span> {user?.email}
        </p>

        <div className="flex justify-end mt-4">
            Added Meal: {meal.length}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
