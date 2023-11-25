import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/Authprovider";

const SocialLogin = () => {
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = (media) => {
    const toastId = toast.loading("Signing in....");
    media()
      .then((result) => {
        console.log(result.user);
        toast.success("Signed in...", { id: toastId });
        navigate(`/`);
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(`${error.message}`, { id: toastId });
      });
  };
  return (
    <>
      <div className="divider ">Continue With</div>
      <div className="">
        <button
          onClick={() => handleLogin(googleLogin)}
          className=" btn btn-sm btn-outline w-full rounded-full font-bold flex items-center"
        >
          <FcGoogle></FcGoogle> Login with Google
        </button>
      </div>
    </>
  );
};

export default SocialLogin;
