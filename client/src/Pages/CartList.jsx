import { useOrderContext } from "../Utility/OrderProvider";
import { getTotalPrice } from "../Utility/utilities";

const CartList = () => {
  const { orders, resetOrders } = useOrderContext();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        console.log({ event, orders });
      }}
    >
      {orders.map((item) => {
        return (
          <div key={`${orders.restaurantId}-${orders.menuId}`}>
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

      <button type="submit">Confirm Order</button>
    </form>
  );
};

export default CartList;
