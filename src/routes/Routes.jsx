import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Error from "../layout/Error";
import Home from "../pages/Home/Home";
import Meals from "../pages/Meals";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../layout/Dashboard";
import AdminProfile from "../pages/dashboard/AdminProfile";
import PrivateRoutes from "./PrivateRoutes";
import ManageUser from "../pages/dashboard/ManageUser";
import AddMeal from "../pages/dashboard/AddMeal";
import UpComing from "../pages/UpComing";


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
        element:<UpComing></UpComing>
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/register',
        element:<Register></Register>
      }
    ],
  },
  {
    path:'dashboard',
    element:<PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
    children:[
        {
            path:'adminProfile',
            element:<AdminProfile></AdminProfile>
        },
        {
            path:'manageUser',
            element:<ManageUser></ManageUser>
        },
        {
            path:'addMeal',
            element:<AddMeal></AddMeal>
        },
        {
            path:'allMeal',
            element:<AdminProfile></AdminProfile>
        },
        {
            path:'allReviews',
            element:<AdminProfile></AdminProfile>
        },
        {
            path:'serveMeal',
            element:<AdminProfile></AdminProfile>
        },
        {
            path:'serveMeal',
            element:<AdminProfile></AdminProfile>
        },
        {
            path:'upcomingMeal',
            element:<AdminProfile></AdminProfile>
        },
    ]
  }
]);
export default router;
