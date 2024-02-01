import { useLoaderData } from "react-router-dom";

const MyOrder = () => {
  const myOrders = useLoaderData();

  console.log({ myOrders });

  return (
    <div>
      <h2>My Order List</h2>
      {myOrders.map((item) => {
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
