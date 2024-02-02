import { API_BASE_URL } from "./constants";

export const getTotalPrice = (orders) => {
  return orders
    .reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0)
    .toFixed(2);
};

export const getOrderedMenus = (orders) => {
  return orders.reduce((menus, item) => {
    return [...menus, item.name];
  }, []);
};

export const getFullUrl = (url) => {
  const isFullUrl = url.startsWith("http://") || url.startsWith("https://");
  return isFullUrl ? url : `${API_BASE_URL}/${url}`;
};
