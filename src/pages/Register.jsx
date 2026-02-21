/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCamera } from "react-icons/fa6";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../provider/Authprovider";
import SocialLogin from "./SocialLogin";
import SectionTitle from "../components/SectionTitle";
import Lottie from "lottie-react";
import regAnimation from "../assets/images/Register.json";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../hook/useAxiosPublic";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "../config/firebase.config";

const storage = getStorage(app);

const Register = () => {
  const { createUser, updateUser, setUser } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [showPassword, setShowPassword] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data) => {
    const toastId = toast.loading("Creating account...");

    createUser(data.email, data.password)
      .then(() => {
        toast.success("Account created successfully....", { id: toastId });
        navigate("/", { replace: true });

        const saveToBackend = (photoURL) => {
          const userInfo = {
            name: data.name,
            email: data.email,
            photoURL: photoURL ?? null,
            role: "user",
            badge: "Bronze",
          };
          axiosPublic.post("/users", userInfo)
            .then((res) => res.data.insertedId && console.log("user saved to backend"))
            .catch((err) => console.error("Backend save failed:", err?.response?.data || err.message));
        };

        if (photoFile) {
          const storageRef = ref(storage, `profile-photos/${Date.now()}-${photoFile.name}`);
          uploadBytes(storageRef, photoFile)
            .then((snapshot) => getDownloadURL(snapshot.ref))
            .then((photoURL) => {
              setUser((prev) => (prev ? { ...prev, displayName: data.name, photoURL, photo: photoURL } : prev));
              return updateUser(data.name, photoURL).then(() => photoURL);
            })
            .then((photoURL) => saveToBackend(photoURL))
            .catch(() => saveToBackend(null));
        } else {
          updateUser(data.name).then(() => saveToBackend(null)).catch(() => saveToBackend(null));
        }
      })
      .catch((error) => {
        toast.error(error.message || "Registration failed", { id: toastId });
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
                  <span className="label-text font-bold">Photo</span>
                </label>
                <label className="cursor-pointer flex flex-col items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <div className="w-24 h-24 rounded-full border-2 border-dashed border-primary/50 bg-base-200 flex items-center justify-center overflow-hidden hover:border-primary hover:bg-primary/5 transition-all">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="flex flex-col items-center gap-1 text-primary/70">
                        <FaCamera className="text-2xl" />
                        <span className="text-xs font-medium">Choose photo</span>
                      </span>
                    )}
                  </div>
                  {photoPreview && (
                    <span className="text-xs text-primary link link-hover">Change photo</span>
                  )}
                </label>
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