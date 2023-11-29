import { useContext } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../provider/Authprovider";
import useAdmin from "../../hook/useAdmin";
// import { AwesomeButton } from "react-awesome-button";

const AdminProfile = () => {
  const [admin] = useAdmin();
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

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user");
      return res.data;
    },
  });

  const { data: payment = [] } = useQuery({
    queryKey: ["payment"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(payment);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="flex justify-center -mt-16 ">
          <img className="w-1/2 rounded-full" src={user?.photoURL} />
        </div>

        <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
          {user?.displayName}
        </h2>
        {admin?.role === "admin" ? (
          <></>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <div className="badge rounded-full badge-warning gap-2">
                {users[0]?.badge}
              </div>
              {user?.email === payment[0]?.email ? (
                <>
                  <div className="badge rounded-full badge-info gap-2">
                    {payment[0]?.badge}
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        )}

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
          <span className="text-primary text-base font-bold">Email:</span>{" "}
          {user?.email}
        </p>

        {/* {admin?.role === "admin" ? (
          <></>
        ) : (
          <>
            <AwesomeButton onPress={}>Update</AwesomeButton>
          </>
        )} */}

        {admin?.role === "admin" ? (
          <>
            <div className="flex justify-end mt-4">
              Added Meal: {meal.length}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
