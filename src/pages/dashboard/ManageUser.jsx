/* eslint-disable react/no-unknown-property */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";
import SectionTitle from "../../components/SectionTitle";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { useState } from "react";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${search}`);
      return res.data;
    },
  });
  const handleAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res);
      refetch();
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${user.name} is an admin`,
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };
  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/user/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${user.name} has been deleted!`,
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    console.log(searchText);
    setSearch(searchText);
  };
  return (
    <div className="w-full max-w-[1250px] px-[25px] mx-auto mt-10">
      <Helmet>
        <title>HostelHub|Dashboard|ManageUser</title>
      </Helmet>
      <SectionTitle heading="User Section"></SectionTitle>
      <form className="mb-5" onSubmit={handleSearch}>
        <div className="join max-w-xs">
          <div>
            <div>
              <input
                className="input input-bordered input-sm md:input-md w-full max-w-xs rounded-lg join-item "
                placeholder="search by name or email"
                name="search"
              />
            </div>
          </div>
          <div className="indicator">
            <input
              className="btn btn-primary btn-sm md:btn md:btn-primary rounded-lg join-item"
              type="submit"
              value="search"
            />
          </div>
        </div>
      </form>
      <section className="container px-4 mx-auto">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            Users
          </h2>
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            {users.length}
          </span>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>#</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Name</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Email address
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <span>Make Admin</span>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <span>Submission Status</span>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      ></th>
                    </tr>
                  </thead>
                  {users.map((user, index) => (
                    <tbody
                      key={index}
                      className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
                    >
                      <tr>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <h2 className="font-medium text-gray-800 dark:text-white ">
                            {index + 1}
                          </h2>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <h2 className="font-medium text-gray-800 dark:text-white ">
                            {user.name}
                          </h2>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {user.email}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <span className="btn btn-ghost btn-sm rounded-full">
                            {user.role === "admin" ? (
                              "Admin"
                            ) : (
                              <button onClick={() => handleAdmin(user)}>
                                {user.role}
                              </button>
                            )}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap"></td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-5 h-5"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManageUser;
