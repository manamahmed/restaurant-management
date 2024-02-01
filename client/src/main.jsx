import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./Routes/RootRouts.jsx";
import AuthProvider from "./AuthProvider/AuthProvider";
import OrderProvider from "./Utility/OrderProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <OrderProvider>
        <RouterProvider router={routes} />
      </OrderProvider>
    </AuthProvider>
  </React.StrictMode>
);
