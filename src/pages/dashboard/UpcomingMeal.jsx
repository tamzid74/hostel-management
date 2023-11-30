import Lottie from "lottie-react";
import Loading from "../../components/Loading";
import SectionTitle from "../../components/SectionTitle";
import { Helmet } from "react-helmet-async";
import noMeal from "../../assets/images/review.json";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/Authprovider";

const UpcomingMeal = () => {
  const axiosSecure = useAxiosSecure();
  const [isLoading, setIsLoading] = useState(true);
  const [upcoming, setUpcoming] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    axiosSecure.get("/upcomingMeals").then((res) => setUpcoming(res.data));
    setIsLoading(false);
  }, [axiosSecure]);

  const handlePublish = async (data) => {
    const info = {
      image: data.image,
      mealTitle: data.mealTitle,
      email: user?.email,
      distributor_Name: user?.displayName,
      reviews: data.reviews,
      mealCategory: data.category,
      likes: data.likes,
      description: data.description,
      date: data.date,
    };
    await axiosSecure.post("/publish-meal", info).then((res) => {
      console.log(res);
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${data.mealTitle} is added to the menu.`,
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-5 mt-10">
      <Helmet>
        <title>HostelHub|Dashboard|UpComing Meal</title>
      </Helmet>
      <SectionTitle heading="UpComing Meal"></SectionTitle>
      <div className="flex justify-center items-center gap-x-3"></div>
      {isLoading ? (
        <div className="w-1/2 mx-auto">
          <Loading></Loading>
        </div>
      ) : (
        <section className="container px-4 mx-auto">
          <div className="flex items-center gap-x-3">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              Upcoming Meal
            </h2>

            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
              {upcoming.length}
            </span>
          </div>

          {upcoming.length === 0 ? (
            <div className="w-1/2 mb-10 mx-auto">
              <Lottie animationData={noMeal} loop={true}></Lottie>
              <p className="text-center font-dm text-2xl font-bold text-primary">
                *No Upcoming Meal Found*
              </p>
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
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Likes
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          ></th>
                        </tr>
                      </thead>
                      {upcoming.map((data, index) => (
                        <tbody
                          key={data._id}
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
                                      {data.mealTitle}
                                    </h2>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              {data.likes}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              <button
                                onClick={() => handlePublish(data)}
                                className="transition-colors duration-200 dark:hover:text-primary dark:text-gray-300 hover:text-primary focus:outline-none"
                                disabled={data.likes < 10}
                              >
                                Publish Meal
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

export default UpcomingMeal;
