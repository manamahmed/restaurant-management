import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { API_BASE_URL } from "../Utility/constants";
import { useOrderContext } from "../Utility/OrderProvider";
import { getOrderedMenus, getTotalPrice } from "../Utility/utilities";

const CartList = () => {
  const { orders, resetOrders } = useOrderContext();
  const { user } = useContext(AuthContext);

  const [deliveryAddress, setDeliveryAddress] = useState("");
  const navigate = useNavigate();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

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
      {orders.map((item) => {
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

      <div>Total: {getTotalPrice(orders)}</div>

      <div>
        Delivery Address:{" "}
        <input
          type="text"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
        />
      </div>

      <button type="submit" disabled={deliveryAddress.length === 0}>
        Confirm Order
      </button>
    </form>
  );
};

export default CartList;
