import image from "../../assets/images/30132571_95z_2206_w009_n001_142a_p25_142.jpg";
import '../Home/Btn.css'


const Parallax = () => {
  return (
    <div
      className="  grid bg-cover bg-center min-h-[600px] bg-fixed mt-20"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      {/* <div className="absolute insert-0 bg-gradient-to-l from-transparent to-black opacity-40"></div> */}
      <div className=" hero-overlay z-0 flex items-center justify-end p-20 text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-xl md:text-3xl text-white font-dm font-black ">
            The Heart of Hospitality, Experience the Charm of Our Hostel
          </h1>
          <p className="py-6 font-sans text-sm md:text-base text-gray-300">
            Our cozy retreat in the heart of [location], where affordability
            meets community. Experience comfort, connect with fellow travelers,
            and make memories that last a lifetime. Welcome to your home away
            from home.
          </p>
          {/* <p className="text-black w-32 flex justify-center bg-white rounded-md font-bold font-roboto border p-3 hover:bg-transparent">
            Get Started
          </p> */}
          <button className="button1">
            <div className="svg-wrapper-1">
              <div className="svg-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="currentColor"
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  ></path>
                </svg>
              </div>
            </div>
            <span>Explore Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Parallax;
