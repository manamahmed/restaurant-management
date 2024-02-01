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

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch("http://localhost:4000/api/restaurants"),
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
        loader: () => fetch("http://localhost:4000/api/orders"),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

export default routes;
