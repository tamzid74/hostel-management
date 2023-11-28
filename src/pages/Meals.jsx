import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import SectionTitle from "../components/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hook/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import Loading from "../components/Loading";
import { useState } from "react";
import { GoCodeReview } from "react-icons/go";
import noMeal from "../assets/images/no meal.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";

const Meals = () => {
  const [isLoading, setIsLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSorting, setSelectedSorting] = useState("lowToHigh");

  const { data: meals = [] } = useQuery({
    queryKey: ["meals", search, selectedCategory, selectedSorting],
    queryFn: async () => {
      setIsLoading(true);
      const res = await axiosPublic.get(
        `/meals?search=${search}&category=${selectedCategory}&sort=${selectedSorting}`
      );
      setIsLoading(false);
      return res.data;
    },
  });

  // const fetchMeals = async ({ pageParam = 1 }) => {
  //   setIsLoading(true);
  //   const res = await axiosPublic.get(
  //     `/meals?search=${search}&category=${selectedCategory}&sort=${selectedSorting}`
  //   );
  //   setIsLoading(false);
  //   return res.data;
  // };
  // const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
  //   ["meals", search, selectedCategory, selectedSorting],
  //   fetchMeals,
  //   {
  //     getNextPageParam: (lastPage, allPage) => {
  //       return lastPage.page + 1;
  //     },
  //   }
  // );

  // const meals = data ? data.pages.flatMap((page) => page.data) : [];

  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    console.log(searchText);
    setSearch(searchText);
    // fetchNextPage(1);
  };

  return (
    <div className="w-full max-w-[1250px] px-[25px] mx-auto">
      <Helmet>
        <title>HostelHub | All Meals</title>
      </Helmet>
      <SectionTitle
        heading="All Meals"
        subHeading="Comfort Food,Nourishing the Soul"
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <form onSubmit={handleSearch}>
          <div className="join max-w-xs">
            <div>
              <div>
                <input
                  className="input input-bordered input-sm md:input-md w-full max-w-xs rounded-lg join-item "
                  placeholder="Search"
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
        <div>
          <select
            className="select rounded-lg select-secondary w-full max-w-xs"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option selected>Select By Category</option>
            <option>breakfast</option>
            <option>lunch</option>
            <option>dinner</option>
          </select>
        </div>
        <div>
          <select
            className="select rounded-lg select-secondary w-full max-w-xs"
            value={selectedSorting}
            onChange={(e) => setSelectedSorting(e.target.value)}
          >
            <option selected>Select by Price Range</option>
            <option value="lowToHigh">Price Low to High</option>
            <option value="highToLow">Price High to Low</option>
          </select>
        </div>
      </div>
      {isLoading ? (
        <div className="w-1/2 mx-auto">
          <Loading></Loading>
        </div>
      ) : meals.length === 0 ? (
        <div className="w-1/2 mb-10 mx-auto">
          <Lottie animationData={noMeal} loop={true}></Lottie>
          <p className="text-center font-dm text-2xl font-bold text-primary">
            *Not Ready Yet*
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-16">
          {meals.map((meal) => (
            <Card key={meal._id} className=" w-[275px] lg:w-full shadow-lg">
              <Link to={`/details/${meal._id}`}>
                <CardHeader floated={false} color="blue-gray">
                  <img
                    className="w-full h-[200px]"
                    src={meal.image}
                    alt="ui/ux review check"
                  />
                  <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                  <IconButton
                    size="sm"
                    color="red"
                    variant="text"
                    className="!absolute top-4 right-4 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                  </IconButton>
                </CardHeader>
              </Link>
              <CardBody>
                <div className="mb-3 flex items-center justify-between">
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {meal.mealTitle}
                  </Typography>
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
                    {meal.rating}
                  </Typography>
                </div>
                <Typography className="text-sm" color="gray">{meal.ingredient}</Typography>
                <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
                  <Tooltip content={`$${meal.price}`}>
                    <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                        <path
                          fillRule="evenodd"
                          d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                          clipRule="evenodd"
                        />
                        <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
                      </svg>
                    </span>
                  </Tooltip>
                  <Tooltip content={`${meal.reviews}+ reviews`}>
                    <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                      <GoCodeReview className="text-xl" />
                    </span>
                  </Tooltip>
                  <Tooltip content={`${meal.likes}+ Likes`}>
                    <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                      {meal.likes}
                    </span>
                  </Tooltip>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Meals;
