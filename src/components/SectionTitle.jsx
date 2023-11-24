import PropTypes from "prop-types";

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="my-8">
      <p className=" text-2xl md:text-4xl text-center text-primary font-dm font-black">{heading}</p>
      <p className="text-xs md:text-base text-center text-gray-600 font-sans">{subHeading}</p>
    </div>
  );
};

export default SectionTitle;

SectionTitle.propTypes = {
  heading: PropTypes.node,
  subHeading: PropTypes.node,
};
