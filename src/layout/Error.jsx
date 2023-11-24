import { Link } from "react-router-dom";
import error from "../assets/images/error.svg";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Helmet } from "react-helmet-async";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

const Error = () => {
  return (
    <>
      <Helmet>
        <title>HostelHub | error</title>
      </Helmet>
      <div className=" max-w-6xl mx-auto p-5">
        <div className=" w-full h-[80vh] flex justify-center items-center">
          <img className="md:w-1/2" src={error} alt="" />
        </div>
        <div className="flex justify-start mt-10">
          <Link to="/">
            <AwesomeButton type="secondary">
              <AiOutlineArrowLeft></AiOutlineArrowLeft>Go Back home
            </AwesomeButton>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error;
