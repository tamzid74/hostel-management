import Lottie from "lottie-react";
import loading from '../assets/images/loading.json'

const Loading = () => {
  return (
    <div>
      <div className="lottie w-full">
          <Lottie animationData={loading} loop={true}></Lottie>
        </div>
    </div>
  );
};

export default Loading;
