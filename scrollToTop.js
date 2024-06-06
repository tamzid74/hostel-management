import { useEffect } from "react";
import { useLocation, BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter as Router

function ScrollToTop() {
  let location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

export default ScrollToTop;
