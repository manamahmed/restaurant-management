import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Contact from "../Pages/Contact/Contact";
import Blog from "../Pages/Blog/Blog";
import Menus from "../Pages/Menus/Menus";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import CartList from "../Pages/CartList";
import MyOrder from "../Pages/MyOrder";
import { API_BASE_URL } from "../Utility/constants";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch(`${API_BASE_URL}/api/restaurants`),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/blog",
        element: <Blog />,
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
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

export default routes;
