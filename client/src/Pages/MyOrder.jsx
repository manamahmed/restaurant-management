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

  if (orders.length === 0) {
    return (
      <h3 className="flex justify-center text-xl font-bold mt-[100px]">
        No orders found.
      </h3>
    );
  }

  const renderStatus = (status) => {
    let classes = "";

    if (status === "rejected") {
      classes += "text-red-800";
    }
    if (status === "completed") {
      classes += "text-green-800";
    }

    return <td className={classes}>{status}</td>;
  };

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
                  {renderStatus(item.status)}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrder;
