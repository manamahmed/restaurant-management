import { useState } from "react";
import { API_BASE_URL } from "../Utility/constants";

const RestaurantOrderStatus = ({ status, orderId }) => {
  const [orderStatus, setOrderStatus] = useState(status);
  const [selectedOption, setSelectedOption] = useState("");

  if (orderStatus === "rejected") {
    return <div>Rejected</div>;
  }

  if (orderStatus === "completed") {
    return <div>Completed</div>;
  }

  if (orderStatus === "preparing") {
    return (
      <select
        onChange={async () => {
          const newStatus = "completed";

          try {
            const options = {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ status: newStatus }),
            };
            const response = await fetch(
              `${API_BASE_URL}/api/orders/${orderId}`,
              options
            );
            const updatedOrder = await response.json();
            console.log({ updatedOrder });
          } catch (error) {
            console.error("Error updating order:", error);
          }

          setOrderStatus(newStatus);
          setSelectedOption("");
        }}
        defaultValue=""
        value={selectedOption}
      >
        <option value="" disabled>
          Preparing
        </option>
        <option value="completed">Complete</option>
      </select>
    );
  }

  return (
    <select
      onChange={async (event) => {
        const newStatus = event.target.value;

        try {
          const options = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
          };
          const response = await fetch(
            `${API_BASE_URL}/api/orders/${orderId}`,
            options
          );
          const updatedOrder = await response.json();
          console.log({ updatedOrder });
        } catch (error) {
          console.error("Error updating order:", error);
        }

        setOrderStatus(newStatus);
        setSelectedOption("");
      }}
      defaultValue=""
      value={selectedOption}
    >
      <option value="" disabled>
        Pending
      </option>
      <option value="preparing">Confirm</option>
      <option value="rejected">Cancel</option>
    </select>
  );
};

export default RestaurantOrderStatus;
