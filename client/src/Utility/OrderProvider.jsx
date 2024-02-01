/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const updateOrders = (newValue) => {
    setOrders([...orders, newValue]);
  };

  const resetOrders = (newOrders) => {
    setOrders(newOrders);
  };

  return (
    <OrderContext.Provider value={{ orders, updateOrders, resetOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }

  return context;
};

export default OrderProvider;
