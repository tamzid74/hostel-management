import { useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SectionTitle from "../../components/SectionTitle";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { AuthContext } from "../../provider/Authprovider";
import { useForm } from "react-hook-form";

const AddMeal = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = (data) => {
    console.log(data);
    const mealItem = {
      image: data.image,
      mealTitle: data.mealTitle,
      distributor_Name: data.distributor_Name,
      distributor_Email: data.distributor_Email,
      price: parseFloat(data.price),
      likes: parseFloat(data.likes),
      rating: parseFloat(data.rating),
      mealCategory: data.mealCategory,
      ingredient: data.ingredient,
      description: data.description,
      date: data.dateTime,
      reviews: parseFloat(data.reviews),
    };
    axiosSecure.post("/meals", mealItem).then((res) => {
      console.log(res);
      reset();
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${data.mealTitle} is added to the menu.`,
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  const toUpComing = (data) => {
    console.log(data);
    const upComingMeal = {
      image: data.image,
      mealTitle: data.mealTitle,
      distributor_Name: data.distributor_Name,
      distributor_Email: data.distributor_Email,
      price: parseFloat(data.price),
      likes: parseFloat(data.likes),
      rating: parseFloat(data.rating),
      mealCategory: data.mealCategory,
      ingredient: data.ingredient,
      description: data.description,
      date: data.dateTime,
      reviews: parseFloat(data.reviews),
    };
    axiosSecure.post("/upComingMeals", upComingMeal).then((res) => {
      console.log(res);
      reset();
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${data.mealTitle} is added to the upComing.`,
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-5 font-roboto">
      <Helmet>
        <title>HostelHub|Dashboard|Add A Job</title>
      </Helmet>
      <SectionTitle heading="Add Meal"></SectionTitle>
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
                {...register("image", { required: true })}
                className="input input-bordered w-full rounded-2xl "
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
                {...register("mealTitle", { required: true })}
                className="input input-bordered w-full rounded-2xl "
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
                {...register("distributor_Name", { required: true })}
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
                {...register("distributor_Email", { required: true })}
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
                {...register("price", { required: true })}
                className="input input-bordered w-full rounded-2xl "
              />
            </label>
          </div>
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Meal Category</span>
            </label>
            <select
              className="select select-bordered w-full"
              {...register("mealCategory", { required: true })}
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
                {...register("ingredient", { required: true })}
                className="input input-bordered w-full rounded-2xl "
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
                {...register("rating", { required: true })}
                className="input input-bordered w-full rounded-2xl "
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
                {...register("dateTime", { required: true })}
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
                {...register("likes", { required: true })}
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
                {...register("reviews", { required: true })}
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
                {...register("description", { required: true })}
                placeholder="description"
                className="textarea textarea-bordered textarea-xs w-full rounded-2xl "
              ></textarea>
            </label>
          </div>
        </div>
        <div className="flex items-center justify-between gap-6">
          <input
            className="btn btn-success rounded-xl btn-sm  mt-10"
            type="submit"
            value="Add Meal"
          />
          <button
            onClick={handleSubmit(toUpComing)}
            className="btn btn-success rounded-xl btn-sm w-[150px] mt-10"
          >
            Upcoming
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMeal;
