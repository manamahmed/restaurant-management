import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { API_BASE_URL } from "../Utility/constants";

const MyOrder = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/orders/${user.email}`
        );
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user && orders.length === 0) {
      getOrders();
    }
  }, [orders.length, user]);

  return (
    <div>
      <h2>My Order List</h2>
      {orders.map((item) => {
        return (
          <div key={item.id}>
            <div>{item.menus}</div>
            <div>{item.total_price}</div>
          </div>
        );
      })}
    </div>
  );
};

export default MyOrder;
