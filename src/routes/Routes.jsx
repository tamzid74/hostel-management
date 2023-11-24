import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Error from "../layout/Error";
import Home from "../pages/Home/Home";
import Meals from "../pages/Meals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path:'/meals',
        element:<Meals></Meals>
      },
      {
        path:'/upcoming',
      }
    ],
  },
]);
export default router;
