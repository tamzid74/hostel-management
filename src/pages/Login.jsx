/* eslint-disable no-unused-vars */
import logAnimation from "../assets/images/Login.json";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useContext, useState } from "react";
import { AuthContext } from "../provider/Authprovider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import SectionTitle from "../components/SectionTitle";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const toastId = toast.loading("logging in...");
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success("Logged in...", { id: toastId });
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.error(error.message);
        setEmailError("*Invalid Email and Password");
        toast.error("Logged in failed", { id: toastId });
      });
  };

  return (
    <div className="w-full max-w-[1250px] px-[25px] mx-auto my-10">
      <Helmet>
        <title>HostelHub | Login</title>
      </Helmet>
      <SectionTitle heading={"Login Now!"}></SectionTitle>
      <div className="hero font-dm">
        <div className="hero-content flex-col gap-16  lg:flex-row">
          <div className="card flex-shrink-0 w-full max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                  name="email"
                  className="input input-bordered rounded-full"
                  required
                />
                {errors.email && (
                  <span className="text-sm text-red-600">
                    *Email field is required
                  </span>
                )}
                {emailError && (
                  <p className="text-sm text-red-600">{emailError}</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
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
                    className="input input-bordered w-full rounded-full"
                    required
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
                {passError && (
                  <p className="text-sm text-red-600">{passError}</p>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover ">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary rounded-full text-white"
                  type="submit"
                  value="Login"
                />
              </div>
              <div>
                <p className="text-center ">
                  Don&apos;t have an account?
                  <Link to="/register" className="btn-link">
                    Register
                  </Link>
                </p>
              </div>
              <SocialLogin></SocialLogin>
            </form>
          </div>
          <div>
            <Lottie animationData={logAnimation} loop={true}></Lottie>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
