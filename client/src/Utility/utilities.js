export const getTotalPrice = (orders) => {
  return orders.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};
