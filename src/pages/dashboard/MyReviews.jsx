import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SectionTitle from "../../components/SectionTitle";
import Loading from "../../components/Loading";
import Lottie from "lottie-react";
import noMeal from "../../assets/images/review.json";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

/* eslint-disable react/no-unknown-property */
const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [isLoading, setIsLoading] = useState(true);
  // const [updatedReview, setUpdatedReview] = useState("");
  // const { data: meals = [] } = useQuery({
  //   queryKey: ["meals"],
  //   queryFn: async () => {
  //     setIsLoading(true);
  //     const res = await axiosSecure.get("/allMeals");
  //     setIsLoading(false);
  //     return res.data;
  //   },
  // });
  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      setIsLoading(true);
      const res = await axiosSecure.get("/reviews");
      setIsLoading(false);
      return res.data;
    },
  });

  const handleDelete = (id) => {
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
        axiosSecure.delete(`/reviews/${id}`).then((res) => {
          console.log(res);
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: `${reviews.mealTitle} has been deleted!`,
            icon: "success",
          });
        });
      }
    });
  };

  const updateReview = async (id) => {
    const { value: updatedReviewText } = await Swal.fire({
      input: "textarea",
      inputLabel: "Update Review",
      inputPlaceholder: "Write your updated review here...",
      inputAttributes: {
        "aria-label": "Write your updated review here",
      },
      showCancelButton: true,
    });

    if (updatedReviewText) {
      axiosSecure.patch(`/reviews/${id}`, { review: updatedReviewText })
        .then((res) => {
          console.log(res);
          refetch();
          Swal.fire({
            title: "Review Updated!",
            icon: "success",
          });
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            title: "Error",
            text: "Failed to update review",
            icon: "error",
          });
        });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-5 mt-10">
      <Helmet>
        <title>HostelHub|Dashboard|Add Reviews</title>
      </Helmet>
      <SectionTitle heading="My Reviews"></SectionTitle>

      {isLoading ? (
        <div className="w-1/2 mx-auto">
          <Loading></Loading>
        </div>
      ) : (
        <section className="container px-4 mx-auto">
          <div className="flex items-center gap-x-3">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              All Reviews
            </h2>

            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
              {reviews.length}
            </span>
          </div>

          {reviews.length === 0 ? (
            <div className="w-1/2 mb-10 mx-auto">
              <Lottie animationData={noMeal} loop={true}></Lottie>
              <p className="text-center font-dm text-2xl font-bold text-primary">
                *Not Ready Yet*
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
                          >
                            Reviews
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          ></th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          ></th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          ></th>
                        </tr>
                      </thead>
                      {reviews.map((review, index) => (
                        <tbody
                          key={review._id}
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
                                      {review.meal}
                                    </h2>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              {review.like}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              {review.reviewCount}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              <Link>
                                <button className="transition-colors duration-200 dark:hover:text-primary dark:text-gray-300 hover:text-primary focus:outline-none">
                                  View Details
                                </button>
                              </Link>
                            </td>

                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-6">
                                <button
                                  onClick={() => handleDelete(review._id)}
                                  className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                  </svg>
                                </button>

                                <button
                                  // onClick={() =>
                                  //   document
                                  //     .getElementById("my_modal_5")
                                  //     .showModal()
                                  // }
                                  onClick={() => updateReview(review._id)}
                                  className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                    />
                                  </svg>
                                </button>
                                {/* <dialog
                                  id="my_modal_5"
                                  className="modal sm:modal-middle"
                                >
                                  <div className="modal-box">
                                    <form method="dialog">
                                      <button className="btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                        ✕
                                      </button>
                                    </form>
                                    <p className="text-primary text-center text-xl font-semibold ">
                                      Give Review
                                    </p>

                                    <div className="form-control">
                                      <label className="label text-center">
                                        <span className="label-text"> </span>
                                      </label>
                                      <textarea
                                        onChange={(e) =>
                                          updateReview(e.target.value)
                                        }
                                        name="review"
                                        className="textarea textarea-bordered h-24"
                                        placeholder="write your review here..."
                                        defaultValue={review.review}
                                      ></textarea>
                                    </div>

                                    <div className="modal-action">
                                      <form method="dialog">
                                        <input
                                          type="submit"
                                          value="Submit"
                                          className="btn btn-sm md:btn-md btn-primary"
                                        />
                                      </form>
                                    </div>
                                  </div>
                                </dialog> */}
                              </div>
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

export default MyReviews;
