import { useContext } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../provider/Authprovider";
import useAdmin from "../../hook/useAdmin";
import { MdEmail } from "react-icons/md";
import { PiUserCircleDuotone, PiCookingPotDuotone } from "react-icons/pi";
import { HiBadgeCheck } from "react-icons/hi";

const AdminProfile = () => {
  const [admin] = useAdmin();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: meal = [] } = useQuery({
    queryKey: ["meal", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meal/?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: users = [] } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/user");
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: payment = [] } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const currentUserBadge = users?.find?.((u) => u?.email === user?.email) || users?.[0];
  const userPayment = payment?.find?.((p) => p?.email === user?.email) || payment?.[0];

  return (
    <div className="min-h-screen bg-base-200/50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Profile card */}
        <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden border border-base-300">
          {/* Banner */}
          <div className="h-28 md:h-32 bg-gradient-to-r from-primary/90 to-primary/70" />

          {/* Avatar + name section */}
          <div className="px-6 pb-6 -mt-14 relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
              <div className="w-28 h-28 rounded-2xl border-4 border-base-100 bg-base-200 shadow-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                {(user?.photo ?? user?.photoURL) ? (
                  <img
                    src={user.photo ?? user.photoURL}
                    alt={user?.displayName || "Profile"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-primary">
                    {user?.displayName?.charAt(0)?.toUpperCase() ||
                      user?.email?.charAt(0)?.toUpperCase() ||
                      "?"}
                  </span>
                )}
              </div>
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-2xl font-bold text-base-content">
                  {user?.displayName || "User"}
                </h1>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-1">
                  {admin?.role === "admin" ? (
                    <span className="badge badge-primary badge-lg gap-1">
                      <HiBadgeCheck className="text-sm" /> Admin
                    </span>
                  ) : (
                    <>
                      {currentUserBadge?.badge && (
                        <span className="badge badge-warning badge-lg">
                          {currentUserBadge.badge}
                        </span>
                      )}
                      {userPayment?.badge && (
                        <span className="badge badge-info badge-lg">
                          {userPayment.badge}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Email row */}
            <div className="mt-6 flex items-center gap-3 p-4 rounded-xl bg-base-200/80">
              <div className="p-2 rounded-lg bg-primary/10">
                <MdEmail className="text-xl text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-base-content/60 uppercase tracking-wide">
                  Email
                </p>
                <p className="text-base font-medium text-base-content break-all">
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {admin?.role === "admin" ? (
                <div className="stat bg-base-200 rounded-xl border border-base-300">
                  <div className="stat-figure text-primary">
                    <PiCookingPotDuotone className="text-3xl" />
                  </div>
                  <div className="stat-title text-base-content/70">Added Meals</div>
                  <div className="stat-value text-primary">{meal?.length ?? 0}</div>
                </div>
              ) : (
                <div className="stat bg-base-200 rounded-xl border border-base-300">
                  <div className="stat-figure text-primary">
                    <PiUserCircleDuotone className="text-3xl" />
                  </div>
                  <div className="stat-title text-base-content/70">Member Badge</div>
                  <div className="stat-value text-sm font-semibold text-base-content">
                    {currentUserBadge?.badge || "—"}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
