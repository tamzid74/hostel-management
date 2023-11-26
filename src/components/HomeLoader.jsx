import Lottie from "lottie-react";
import loading from '../assets/images/homeloader.json'

const HomeLoader = () => {
  return (
    <div>
      <div className="lottie w-full">
        <Lottie animationData={loading} loop={true}></Lottie>
      </div>
    </div>
  );
};

export default HomeLoader;
