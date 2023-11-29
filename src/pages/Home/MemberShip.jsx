import { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { AwesomeButton } from "react-awesome-button";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

const MemberShip = () => {
  const axiosSecure = useAxiosSecure();
  const [isLoading, setIsLoading] = useState(true);
  const { data: mealPackages = [] } = useQuery({
    queryKey: ["mealPackages"],
    queryFn: async () => {
      setIsLoading(true);
      const res = await axiosSecure.get("/mealPackages");
      setIsLoading(false);
      return res.data;
    },
  });

  return (
    <div className="w-full max-w-[1250px] px-[25px] mx-auto">
      <SectionTitle
        heading={"Membership Plans"}
        subHeading={"Choose the plan that suits you best"}
      ></SectionTitle>

      {isLoading ? (
        <div className="w-1/2 mx-auto">
          <Loading></Loading>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900">
          <div className="container px-6 py-8 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-8 lg:-mx-4 lg:flex-row lg:items-stretch lg:space-y-0">
              {mealPackages.map((mealPackage, index) => (
                <div
                  key={index}
                  className="flex flex-col w-full max-w-sm p-8 space-y-8 text-center bg-white border-2 border-gray-200 rounded-lg lg:mx-4 dark:bg-gray-900 dark:border-gray-700"
                >
                  <div className="flex-shrink-0">
                    <h2 className="inline-flex items-center justify-center px-2 font-semibold tracking-tight text-blue-400 uppercase rounded-lg bg-gray-50 dark:bg-gray-700">
                      {mealPackage.type}
                    </h2>
                  </div>

                  <div className="flex-shrink-0">
                    <span className="pt-2 text-3xl font-bold text-gray-800 uppercase dark:text-gray-100">
                      ${mealPackage.price}
                    </span>

                    <span className="text-gray-500 dark:text-gray-400">
                      /month
                    </span>
                  </div>

                  <ul className="flex-1 space-y-4">
                    {mealPackage.services.map((service, serviceIndex) => (
                      <li
                        key={serviceIndex}
                        className="text-gray-500 dark:text-gray-400"
                      >
                        {service}
                      </li>
                    ))}
                  </ul>

                  <Link to={`/payment/${mealPackage._id}`}>
                    <AwesomeButton
                      type="primary"
                      className="inline-flex items-center justify-center px-4 py-2 font-medium text-white uppercase transition-colors bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none"
                    >
                      Purchase
                    </AwesomeButton>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberShip;
