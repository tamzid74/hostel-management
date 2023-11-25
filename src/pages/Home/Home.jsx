import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Parallax from "./Parallax";
import MemberShip from "./MemberShip";
import Category from "./Category";




const Home = () => {
  return (
    <div>
      <Helmet>
        <title>HostelHub | Home</title>
      </Helmet>
        <Banner></Banner>
        <Category></Category>
        <Parallax></Parallax>
        <MemberShip></MemberShip>
        
        
    </div>
  );
};

export default Home;