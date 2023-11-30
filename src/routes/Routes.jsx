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
import MealDetails from "../pages/MealDetails";
import AllMeal from "../pages/dashboard/AllMeal";
import AllReviews from "../pages/dashboard/AllReviews";
import Update from "../pages/dashboard/Update";
import ServeMeal from "../pages/dashboard/ServeMeal";
// import MyProfile from "../pages/dashboard/MyProfile";
import RequestedMeal from "../pages/dashboard/RequestedMeal";
import MyReviews from "../pages/dashboard/MyReviews";
import MealPackage from "../pages/payment/MealPackage";
import UpcomingMeal from "../pages/dashboard/UpcomingMeal";

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
        path: "/meals",
        element: <Meals></Meals>,
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRoutes>
            <Update></Update>
          </PrivateRoutes>
        ),
      },
      {
        path: "/payment/:id",
        element: (
          <PrivateRoutes>
            <MealPackage></MealPackage>
          </PrivateRoutes>
        ),
      },
      {
        path: "/upcoming",
        element: <UpComing></UpComing>,
      },
      {
        path: "/details/:id",
        element: <MealDetails></MealDetails>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard></Dashboard>
      </PrivateRoutes>
    ),
    children: [
      {
        path: "profile",
        element: <AdminProfile></AdminProfile>,
      },
      // {
      //   path: "myProfile",
      //   element: <MyProfile></MyProfile>,
      // },
      {
        path: "requestedMeal",
        element: <RequestedMeal></RequestedMeal>,
      },
      {
        path: "myReviews",
        element: <MyReviews></MyReviews>,
      },
      {
        path: "manageUser",
        element: <ManageUser></ManageUser>,
      },
      {
        path: "addMeal",
        element: <AddMeal></AddMeal>,
      },
      {
        path: "allMeal",
        element: <AllMeal></AllMeal>,
      },
      {
        path: "allReviews",
        element: <AllReviews></AllReviews>,
      },
      {
        path: "serveMeal",
        element: <ServeMeal></ServeMeal>,
      },
      {
        path: "upcomingMeal",
        element: <UpcomingMeal></UpcomingMeal>,
      },
    ],
  },
]);
export default router;
