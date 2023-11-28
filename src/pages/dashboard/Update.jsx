import { useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SectionTitle from "../../components/SectionTitle";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { AuthContext } from "../../provider/Authprovider";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Category from "../Home/Category";

const Update = () => {
  const { register, handleSubmit } = useForm();
  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  //   const [isLoading, setIsLoading] = useState();

  const { data: meals = [] } = useQuery({
    queryKey: ["meals", id],
    queryFn: async () => {
      //   setIsLoading(true);
      const res = await axiosSecure.get(`/meals/${id}`);
      //   setIsLoading(false);
      return res.data;
    },
  });

  console.log(meals);

  const { _id, image, mealTitle, rating, price, ingredient, description } =
    meals;

  const onSubmit = (data) => {
    console.log(data);

    const updateInfo = {
      image: data.image || meals.image,
      mealTitle: data.mealTitle || meals.mealTitle,
      distributor_Name: data.distributor_Name || meals.distributor_Name,
      email: data.email || meals.email,
      price: parseFloat(data.price) || meals.price,
      likes: parseFloat(data.likes) || meals.likes,
      rating: data.rating || meals.rating,
      mealCategory: data.mealCategory || meals.mealCategory,
      ingredient: data.ingredient || meals.ingredient,
      description: data.description || meals.description,
      date: data.dateTime || meals.dataTime,
      reviews: parseFloat(data.reviews) || meals.reviews,
    };
    axiosSecure.patch(`/meals/${_id}`, updateInfo).then((res) => {
      console.log(res.data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${meals.mealTitle} Successfully Updated`,
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      <Helmet>
        <title>HostelHub|Dashboard|Update Meal</title>
      </Helmet>
      <SectionTitle heading="Update Meal"></SectionTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* {row-1} */}
        <div className="md:flex gap-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Image Url</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                placeholder="Image URL"
                {...register("image")}
                className="input input-bordered w-full rounded-2xl"
                defaultValue={image}
              />
            </label>
          </div>
        </div>
        <div className="md:flex gap-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Meal Title</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                placeholder="meal title"
                {...register("mealTitle")}
                className="input input-bordered w-full rounded-2xl "
                defaultValue={mealTitle}
              />
            </label>
          </div>
        </div>
        {/* {row-2} */}
        <div className="md:flex gap-4">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Distributor Name</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                placeholder="distributor name"
                defaultValue={user?.displayName}
                {...register("distributor_Name")}
                className="input input-bordered w-full rounded-2xl "
              />
            </label>
          </div>
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Distributor Email</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                placeholder="distributor email"
                defaultValue={user?.email}
                {...register("email")}
                className="input input-bordered w-full rounded-2xl "
              />
            </label>
          </div>
        </div>
        {/* {row-3} */}
        <div className="md:flex gap-4">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                placeholder="price"
                {...register("price")}
                className="input input-bordered w-full rounded-2xl "
                defaultValue={price}
              />
            </label>
          </div>
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Meal Category</span>
            </label>
            <select
              className="select select-bordered w-full"
              {...register("mealCategory")}
              defaultValue={Category}
            >
              <option value="breakfast">breakfast</option>
              <option value="lunch">lunch</option>
              <option value="dinner">dinner</option>
            </select>
          </div>
        </div>
        {/* {row-4} */}
        <div className="md:flex gap-4">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Ingredient</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                placeholder="ingredient"
                {...register("ingredient")}
                className="input input-bordered w-full rounded-2xl "
                defaultValue={ingredient}
              />
            </label>
          </div>
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Rating</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                placeholder="rating"
                {...register("rating")}
                className="input input-bordered w-full rounded-2xl"
                defaultValue={rating}
              />
            </label>
          </div>
        </div>
        {/* {row-5} */}
        <div className="md:flex gap-4">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <label className="input-group">
              <input
                type="date"
                className="input input-bordered w-full rounded-2xl "
                {...register("dateTime")}
              />
            </label>
          </div>
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Likes</span>
            </label>
            <label className="input-group">
              <input
                type="type"
                {...register("likes")}
                defaultValue={0}
                className="input input-bordered w-full rounded-2xl "
              />
            </label>
          </div>
        </div>
        {/* {row-6} */}
        <div className="md:flex gap-4">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Reviews</span>
            </label>
            <label className="input-group">
              <input
                type="type"
                {...register("reviews")}
                defaultValue={0}
                className="input input-bordered w-full rounded-2xl "
              />
            </label>
          </div>
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <label className="input-group">
              <textarea
                type="text"
                {...register("description")}
                placeholder="description"
                className="textarea textarea-bordered textarea-xs w-full rounded-2xl "
                defaultValue={description}
              ></textarea>
            </label>
          </div>
        </div>
        <div className="flex items-center justify-between gap-6">
          <input
            className="btn btn-success rounded-xl btn-sm  mt-10"
            type="submit"
            value="updated Meal"
          />
        </div>
      </form>
    </div>
  );
};

export default Update;
