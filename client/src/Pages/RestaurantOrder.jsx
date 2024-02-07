import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import RestaurantOrderStatus from "../components/RestaurantOrderStatus";
import { API_BASE_URL } from "../Utility/constants";

const RestaurantOrder = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getRestaurantWithMenus = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/ordersByRestaurantEmail/${user.email}`
        );
        const ordersData = await response.json();
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user?.email) {
      getRestaurantWithMenus();
    }
  }, [user]);

  if (orders.length === 0) {
    return (
      <h3 className="flex justify-center text-xl font-bold mt-[100px]">
        No orders found.
      </h3>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Menu list</th>
              <th>Address</th>
              <th>Total price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => {
              return (
                <tr key={item.id}>
                  <th>{index + 1}</th>
                  <td>{item.menus.split(",").join(", ")}</td>
                  <td>{item.address}</td>
                  <td>€{item.total_price}</td>
                  <td>
                    <RestaurantOrderStatus
                      status={item.status}
                      orderId={item.id}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RestaurantOrder;
