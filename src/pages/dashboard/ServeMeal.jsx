import { useState } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle";
import Loading from "../../components/Loading";

const ServeMeal = () => {
  const axiosSecure = useAxiosSecure();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { data: mealRequests = [], refetch } = useQuery({
    queryKey: ["mealRequests", search],
    queryFn: async () => {
      setIsLoading(true);
      const res = await axiosSecure.get(`/meal-requests?search=${search}`);
      setIsLoading(false);
      return res.data;
    },
  });

  const handleServe = async (id, Status) => {
    if (Status === "delivered") {
      Swal.fire({
        icon: "warning",
        title: "Already Served",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    await axiosSecure.patch(`/meal-requests/${id}`, { Status: "delivered" });
    refetch();
    Swal.fire({
      icon: "success",
      title: "Meal Served Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    console.log(searchText);
    setSearch(searchText);
  };

  return (
    <div className="max-w-6xl mx-auto p-5 mt-10">
      <Helmet>
        <title>HostelHub|Dashboard|Serve Meals</title>
      </Helmet>
      <SectionTitle heading="Serve Meals"></SectionTitle>
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

      {isLoading ? (
        <div className="w-1/2 mx-auto">
          <Loading></Loading>
        </div>
      ) : (
        <section className="container px-4 mx-auto">
          <div className="flex items-center gap-x-3">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              Serve Meals
            </h2>

            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
              {mealRequests.length}
            </span>
          </div>

          {mealRequests.length === 0 ? (
            <div className="mt-4 text-gray-500 dark:text-gray-300">
              No meal requests found.
            </div>
          ) : (
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
                              <span>Meal Title</span>
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            <div className="flex items-center gap-x-3">
                              <span>Email</span>
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
                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            <div className="flex items-center gap-x-3">
                              <span>Status</span>
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            <div className="flex items-center gap-x-3">
                              <span>Serve</span>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      {mealRequests.map((meal, index) => (
                        <tbody
                          key={meal._id}
                          className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
                        >
                          <tr>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              <div className="inline-flex items-center gap-x-3">
                                <div className="flex items-center gap-x-2">
                                  <div>
                                    <h2 className="font-medium text-gray-800 dark:text-white ">
                                      {index + 1}
                                    </h2>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              <div className="inline-flex items-center gap-x-3">
                                <div className="flex items-center gap-x-2">
                                  <div>
                                    <h2 className="font-medium text-gray-800 dark:text-white ">
                                      {meal.meal}
                                    </h2>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              {meal.userEmail}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              {meal.userName}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              {meal.Status}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <button
                                onClick={() =>
                                  handleServe(meal._id, meal.Status)
                                }
                                className="text-blue-500 transition-colors duration-200 dark:hover:text-blue-700 dark:text-gray-300 hover:text-blue-700 focus:outline-none"
                              >
                                Serve
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
          )}
        </section>
      )}
    </div>
  );
};

export default ServeMeal;
