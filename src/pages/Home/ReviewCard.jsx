/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
const ReviewCard = ({ data }) => {
  return (
    <div>
      <div className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <span className="text-sm font-light text-gray-600 dark:text-gray-400">
            {data.date}
          </span>
        </div>

        <div className="mt-2">
         
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {data.review}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <img
              className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
              src={data.pic}
              alt="avatar"
            />
            <a
              className="font-bold text-gray-700 cursor-pointer dark:text-gray-200"
              tabindex="0"
              role="link"
            >
              {data.user_name}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
