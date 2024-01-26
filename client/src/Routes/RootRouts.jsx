import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Contact from "../Pages/Contact/Contact";
import Blog from "../Pages/Blog/Blog";
import Menus from "../Pages/Menus/Menus";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("data.json"),
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/menus/:id",
        element: <Menus></Menus>,
        loader: () => fetch("/public/data.json"),
      },
      {
        path: "/my-order",
        element: <Menus></Menus>,
        loader: () => fetch("/public/data.json"),
      },
      { path: "/login", element: <Login></Login> },
      { path: "/register", element: <Register></Register>},
    ],
  },
]);

export default routes;