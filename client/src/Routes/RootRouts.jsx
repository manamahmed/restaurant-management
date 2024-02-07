import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Contact from "../Pages/Contact/Contact";
import Blog from "../Pages/Blog/Blog";
import Menus from "../Pages/Menus/Menus";
import Login from "../components/Login/Login";
import CartList from "../Pages/CartList";
import MyOrder from "../Pages/MyOrder";
import { API_BASE_URL } from "../Utility/constants";
import RestaurantRegister from "../components/Register/RestaurantRegister";
import CustomerRegister from "../components/Register/CustomerRegister";
import RestaurantOrder from "../Pages/RestaurantOrder";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/restaurants/:id",
        element: <Menus />,
      },
      {
        path: "/cart-list",
        element: <CartList />,
      },
      {
        path: "/my-order",
        element: <MyOrder />,
      },
      {
        path: "/restaurant-order",
        element: <RestaurantOrder />,
      },
      { path: "/login", element: <Login /> },
      { path: "/customer-register", element: <CustomerRegister /> },
      { path: "/restaurant-register", element: <RestaurantRegister /> },
    ],
  },
]);

export default routes;
