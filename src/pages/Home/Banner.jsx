import image from "../../assets/images/9457390_35604.png";

const Banner = () => {
  return (
    <div>
      <div
        className="absolute inset-x-0 -top-40 z-[-9999] transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      ;
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
              amenities tailored to enhance your stay. Explore dormitory
              options, check availability, and immerse yourself in a hassle-free
              hostel experience. Your home away from home awaits – where
              affordability meets quality, and every click brings you closer to
              a memorable stay.
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
    </div>
  );
};

export default Banner;
