/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../provider/Authprovider";
import SocialLogin from "./SocialLogin";
import SectionTitle from "../components/SectionTitle";
import Lottie from "lottie-react";
import regAnimation from "../assets/images/Register.json";
import { useForm } from "react-hook-form";

const Register = () => {
  const { createUser, updateUser, setUser } = useContext(AuthContext);
  //   const [regError, setRegError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const toastId = toast.loading("Creating User...");
    createUser(data.email, data.password)
      .then((result) => {
        updateUser(data.name, data.photo).then(() => {
          setUser((prev) => {
            prev.displayName = data.name;
            prev.photoURL = data.photo;
            return { ...prev };
          });
          toast.success("User Created", { id: toastId });
          navigate(`/`);
        });
      })
      .catch((error) => {
        toast.error(`${error.message}`, { id: toastId });
      });
  };

  return (
    <div className="w-full max-w-[1250px] px-[25px] mx-auto my-10">
      <Helmet>
        <title>HostelHub | Register</title>
      </Helmet>
      <SectionTitle heading={"Register Now!"}></SectionTitle>
      <div className="hero font-dm">
        <div className="hero-content gap-16 flex-col lg:flex-row">
          <div className="card flex-shrink-0 w-full max-w-md">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">PhotoUrl</span>
                </label>
                <input
                  type="text"
                  placeholder="PhotoUrl"
                  {...register("photo", { required: true })}
                  className="input input-bordered rounded-full"
                />
                {errors.photo && (
                  <span className="text-sm text-red-600">
                    This field is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text ">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Name"
                  className="input input-bordered rounded-full"
                />
                {errors.name && (
                  <span className="text-sm text-red-600">
                    *Name field is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text ">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="email"
                  className="input input-bordered rounded-full"
                />
                {errors.email && (
                  <span className="text-sm text-red-600">
                    *Email field is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text ">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      pattern:
                        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=])/,
                    })}
                    placeholder="password"
                    className="input input-bordered rounded-full w-full"
                  />
                  {errors.password?.type === "require" && (
                    <span className="text-sm text-red-600">
                      *Password is required
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="text-sm text-red-600">
                      *Password Should be 6 character
                    </span>
                  )}
                  {errors.password?.type === "pattern" && (
                    <span className="text-sm text-red-600">
                      *password should contain at least an uppercase, a
                      lowercase,one special character and a number.
                    </span>
                  )}
                  <span
                    className="absolute top-4 right-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
                  </span>
                </div>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary rounded-full text-white"
                  type="submit"
                  value="Register"
                />
              </div>
              <p className="text-center ">
                Already have an account?{" "}
                <Link className="btn-link" to="/login">
                  Login
                </Link>
              </p>
              <SocialLogin></SocialLogin>
            </form>
          </div>
          <div>
            <Lottie animationData={regAnimation} loop={true}></Lottie>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
