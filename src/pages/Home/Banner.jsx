import image from "../../assets/images/9457390_35604.png";

const Banner = () => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col-reverse lg:flex-row-reverse">
        <div className="w-full">
          <img src={image} />
        </div>
        <div className="w-full">
          <h1 className="text-5xl font-dm font-extrabold">
            Your Perfect Hostel Experience Starts Here
          </h1>
          <p className="py-6 font-sans text-base text-gray-500">
            Welcome to our Hostel Hub, where modern comfort meets convenience.
            Discover a seamless living experience with our user-friendly
            website, offering easy navigation, secure booking, and a range of
            amenities tailored to enhance your stay. Explore dormitory options,
            check availability, and immerse yourself in a hassle-free hostel
            experience. Your home away from home awaits – where affordability
            meets quality, and every click brings you closer to a memorable
            stay.
          </p>
          <div className="join">
            <div className="">
              <input
                className="input input-bordered input-sm max-w-xs join-item rounded-full text-black"
                placeholder="Search"
              />
            </div>
            <div className="indicator">
              <button className="btn btn-primary rounded-full text-white btn-sm join-item ">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
