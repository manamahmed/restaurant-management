import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { API_BASE_URL } from "../Utility/constants";
import { useOrderContext } from "../Utility/OrderProvider";
import {
  getFullUrl,
  getOrderedMenus,
  getTotalPrice,
} from "../Utility/utilities";

const CartList = () => {
  const { orders, resetOrders } = useOrderContext();
  const { user } = useContext(AuthContext);

  const [deliveryAddress, setDeliveryAddress] = useState("");
  const navigate = useNavigate();

  if (orders.length === 0) {
    return (
      <h3 className="flex justify-center text-xl font-bold mt-[100px]">
        Cart list is empty.
      </h3>
    );
  }

  return (
    <form
      className="max-w-[1200px] mx-auto my-8"
      onSubmit={async (event) => {
        event.preventDefault();

        if (!user) {
          navigate("/login");
        }

        const orderedMenus = getOrderedMenus(orders);
        const orderedData = {
          email: user.email,
          total_price: getTotalPrice(orders),
          menus: orderedMenus.join(","),
          address: deliveryAddress,
        };

        try {
          const response = await fetch(`${API_BASE_URL}/api/orders`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderedData),
          });
          if (response.ok) {
            await response.json();
            resetOrders([]);
            navigate("/my-order");
          }
        } catch (error) {
          console.error("Error making order:", error);
        }
      }}
    >
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => {
              return (
                <tr key={`${item.restaurantId}-${item.menuId}`}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{item.name}</div>
                      </div>

                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={getFullUrl(item.img)}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <input
                      className="border p-2 w-14 text-center"
                      type="text"
                      value={item.quantity}
                      onChange={(event) => {
                        const quantity = Number(event.target.value);
                        const updatedOrders = orders.map((orderItem) =>
                          orderItem.restaurantId === item.restaurantId &&
                          orderItem.menuId === item.menuId
                            ? { ...orderItem, quantity }
                            : orderItem
                        );
                        resetOrders(updatedOrders);
                      }}
                    />
                  </td>
                  <td>{item.price} €</td>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => {
                        const updatedOrders = orders.filter(
                          (orderItem) =>
                            !(
                              orderItem.restaurantId === item.restaurantId &&
                              orderItem.menuId === item.menuId
                            )
                        );
                        resetOrders(updatedOrders);
                      }}
                    >
                      remove
                    </button>
                  </th>
                </tr>
              );

              return (
                <div key={`${item.restaurantId}-${item.menuId}`}>
                  <h3>{item.name}</h3>
                  <div>
                    Quantity:{" "}
                    <input
                      type="text"
                      value={item.quantity}
                      onChange={(event) => {
                        const quantity = Number(event.target.value);
                        const updatedOrders = orders.map((orderItem) =>
                          orderItem.restaurantId === item.restaurantId &&
                          orderItem.menuId === item.menuId
                            ? { ...orderItem, quantity }
                            : orderItem
                        );
                        resetOrders(updatedOrders);
                      }}
                    />
                  </div>
                  <div>{item.price}</div>
                  <button
                    onClick={() => {
                      const updatedOrders = orders.filter(
                        (orderItem) =>
                          !(
                            orderItem.restaurantId === item.restaurantId &&
                            orderItem.menuId === item.menuId
                          )
                      );
                      resetOrders(updatedOrders);
                    }}
                  >
                    remove
                  </button>
                </div>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="font-bold text-right">
        Total: €{getTotalPrice(orders)}
      </div>

      <div className="text-right">
        Delivery Address:{" "}
        <input
          className="border p-2 my-4 w-1/4 focus:border-blue-500 hover:border-blue-300"
          type="text"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
        />
      </div>

      <button
        className="btn btn-primary flex ml-auto mt-4"
        type="submit"
        disabled={deliveryAddress.length === 0}
      >
        Confirm Order
      </button>
    </form>
  );
};

export default CartList;
