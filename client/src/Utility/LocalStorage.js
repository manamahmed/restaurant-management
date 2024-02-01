export const STORAGE_KEY = "order-menus";

const getStoredItems = () => {
  const storedItems = localStorage.getItem(STORAGE_KEY);
  let items = [];

  if (storedItems) {
    try {
      items = JSON.parse(storedItems);
    } catch (err) {
      console.log("error reading from localstorage");
    }
  }

  return items;
};

const saveOrderItem = (item) => {
  const storedOrdered = getStoredItems();
  const isExists = storedOrdered.find(
    (menuItem) => menuItem.menuId == item.menuId
  );

  if (!isExists) {
    storedOrdered.push(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedOrdered));
  }
};

export { getStoredItems, saveOrderItem };
