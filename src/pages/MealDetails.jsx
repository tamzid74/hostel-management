import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hook/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { Typography } from "@material-tailwind/react";
import { BiLike } from "react-icons/bi";
import { Helmet } from "react-helmet-async";
import { AwesomeButton } from "react-awesome-button";
import { AuthContext } from "../provider/Authprovider";
import Swal from "sweetalert2";
import { Textarea, Button } from "@material-tailwind/react";
import ReviewCard from "./Home/ReviewCard";

const MealDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const [isRequesting, setIsRequesting] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [mealReviews, setMealReviews] = useState([]);

  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [review, setReview] = useState("");

  const { data: meals = [], refetch } = useQuery({
    queryKey: ["meals", id],
    queryFn: async () => {
      setIsLoading(true);
      const res = await axiosSecure.get(`/meals/${id}`);
      setIsLoading(false);
      return res.data;
    },
  });
  const {
    _id,
    image,
    mealTitle,
    distributor_Name,
    rating,
    ingredient,
    description,
    date,
    reviews,
    likes,
  } = meals;

  useEffect(() => {
    axiosSecure.get("/reviews").then((res) => {
      const mealReviews = res.data.filter(
        (reviews) => reviews.mealId === `${_id}`
      );
      setMealReviews(mealReviews);
    });
  }, [_id, axiosSecure]);

  const handleMealRequest = async () => {
    if (!user?.email) {
      Swal.fire({
        title: "Please Login For Requesting Meal",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Okay",
      });
      return;
    }

    setIsRequesting(true);
    const res = await axiosSecure.post("/meal-requests", {
      meal: mealTitle,
      userName: user?.displayName,
      email: user?.email,
      status: "pending",
      like: likes,
      review: reviews,
    });

    Swal.fire({
      position: "center",
      icon: "success",
      title: `${mealTitle} is added SuccessFully`,
      showConfirmButton: false,
      timer: 1500,
    });
    setIsRequesting(false);

    console.log("Meal requested successfully", res.data);
  };
  const handleReview = () => {
    if (!user?.email) {
      Swal.fire({
        title: "Please Login Fast",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Okay",
      });
      return;
    }
    const reviewInfo = {
      mealId: _id,
      meal: mealTitle,
      email: user?.email,
      pic: user?.photo ?? user?.photoURL,
      user_name: user?.displayName,
      review: review,
      reviews: reviews,
      like: likes,
      img: image,
      description: description,
      date: date,
    };

    axiosSecure.post("/review", reviewInfo).then((res) => {
      console.log(res.data);
      setReviewCount(reviewCount + 1);
      setMealReviews((prevReviews) => [...prevReviews, res.data]);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Thank you for your review",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  const handleLike = async () => {
    if (!user?.email) {
      Swal.fire("You Need to login First");
      return;
    }

    setLikeCount(likeCount + 1);
    await axiosSecure.patch(`/meal/${id}`, {
      likes: likeCount + 1,
    });
    refetch();
  };

  return (
    <div className="my-10">
      <Helmet>
        <title> Meal || {`${mealTitle}`}</title>
      </Helmet>
      {isLoading ? (
        <div className="w-1/4 mx-auto">
          <Loading></Loading>
        </div>
      ) : (
        <section className="bg-white dark:bg-gray-900">
          <div className="container px-6 py-10 mx-auto">
            <div className="lg:-mx-6 lg:flex lg:items-center">
              <img
                className="object-fill object-center lg:w-1/2 lg:mx-6 w-full h-96 rounded-lg lg:h-[36rem]"
                src={image}
                alt={mealTitle}
              />

              <div className="mt-8 lg:w-1/2 lg:px-6 lg:mt-0">
                <p className="text-5xl font-semibold text-blue-500 ">“</p>
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white lg:text-3xl lg:w-96">
                  {mealTitle}
                </h1>
                <p className="font-bold text-primary">
                  Ingredient:{" "}
                  <span className="text-sm text-gray-600 font-normal">
                    {ingredient}
                  </span>
                </p>
                <div className="flex gap-8">
                  <Typography
                    color="blue-gray"
                    className="flex items-center gap-1.5 font-normal"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="-mt-0.5 h-5 w-5 text-yellow-700"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {rating}
                  </Typography>
                  <button
                    className="btn btn-ghost rounded-3xl"
                    onClick={handleLike}
                  >
                    <BiLike className="text-2xl" />
                  </button>
                </div>
                <p className="max-w-lg mt-6 text-gray-500 dark:text-gray-400 ">
                  “ {description} ”
                </p>

                <h3 className="mt-6 text-lg font-medium text-blue-500">
                  {distributor_Name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{date}</p>
                <div className=" mt-10">
                  <AwesomeButton
                    type="primary"
                    onPress={handleMealRequest}
                    loading={isRequesting}
                    disabled={isRequesting}
                  >
                    {isRequesting ? "Requesting Meal..." : "Meal Request"}
                  </AwesomeButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="w-full max-w-[1250px] px-[25px] mx-auto mt-10">
        <h1 className="text-3xl font-dm font-medium border-b-4">
          Meal Reviews:
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
          {mealReviews.map((data, index) => (
            <ReviewCard key={index} data={data}></ReviewCard>
          ))}
          {/* {reviewsData.map((data, index) => (
            <ReviewCard key={index} data={data}></ReviewCard>
          ))} */}
        </div>

        <h1 className="text-primary">Give Your Review</h1>
        <div className="relative w-[32rem]">
          <Textarea
            onBlur={(e) => setReview(e.target.value)}
            variant="static"
            placeholder="Your Review"
            rows={8}
          />
          <div className="flex w-full justify-between py-1.5">
            <div className="flex gap-2">
              <Button onClick={handleReview} size="sm" className="rounded-md">
                Post Review
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
