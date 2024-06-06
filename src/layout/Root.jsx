import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import HomeLoader from "../components/HomeLoader";
import ScrollToTop from "../utils/scrollToTop";

const Root = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div>
      <ScrollToTop />
      {isLoading ? (
        <div className="text-7xl min-h-screen flex items-center justify-center">
          <HomeLoader></HomeLoader>
        </div>
      ) : (
        <>
          <Navbar></Navbar>
          <Outlet></Outlet>
          <Footer></Footer>
          <Toaster></Toaster>
        </>
      )}
    </div>
  );
};

export default Root;
