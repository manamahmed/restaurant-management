import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../Utility/constants";

import { useOrderContext } from "../../Utility/OrderProvider";
import { getFullUrl } from "../../Utility/utilities";

const Menus = () => {
  const { id: restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const { orders, updateOrders } = useOrderContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/restaurants/${restaurantId}`
        );
        const data = await response.json();
        setRestaurant(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // setAddedItems(getStoredItems());
  }, [restaurantId]);

  if (!restaurant) {
    return null;
  }
  const menus = restaurant.menus;

  const menusObj = {};
  for (const item of menus) {
    if (!menusObj[item.category]) {
      menusObj[item.category] = [item];
    } else {
      menusObj[item.category].push(item);
    }
  }

  // <div classNameName="card card-compact  bg-base-100 shadow-xl">
  //                 <figure>
  //                   <img src={getFullUrl(img)} alt="Shoes" />
  //                 </figure>
  //                 <div classNameName="card-body">
  //                   <h2 classNameName="card-title">{name}</h2>
  //                   <p>{description}</p>
  //                   <p>${price}</p>
  //                   <div classNameName="card-actions justify-end">
  // <button
  //   disabled={
  //     !!orders.find((item) => item.menuId === menu_id)
  //   }
  //   onClick={() => {
  //     const itemToAdd = {
  //       menuId: menu_id,
  //       restaurantId,
  //       name,
  //       img,
  //       price,
  //       quantity: 1,
  //     };

  //     // setAddedItems([...addedItems, itemToAdd]);
  //     // saveOrderItem(itemToAdd);

  //     updateOrders(itemToAdd);
  //   }}
  //   classNameName="btn btn-primary"
  // >
  //   Add To Cart
  // </button>
  //                   </div>
  //                 </div>
  //               </div>

  return Object.entries(menusObj).map(([menuName, menuItems]) => {
    return (
      <>
        <div
          classNameName="max-w-[1440px] mx-auto mb-12 "
          key={`${restaurantId}-${menuName}`}
        >
          <div classNameName="text-2xl  font-bold ml-4 mt-8 ">{menuName}</div>
          <br />

          <div classNameName="grid grid-cols-3 gap-8">
            {menuItems.map(({ menu_id, name, img, description, price }) => {
              return (
                <div key={`${restaurantId}-${menu_id}`}>
                  <a
                    href="#"
                    className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl"
                  >
                    <div className="">
                      <img
                        className="object-cover rounded-t-lg h-auto w-96 mx-2"
                        src={getFullUrl(img)}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col justify-between p-4 leading-normal">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Noteworthy technology acquisitions 2021
                      </h5>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Here are the biggest enterprise technology acquisitions
                        of 2021 so far, in reverse chronological order.
                      </p>
                      <button
                        disabled={
                          !!orders.find((item) => item.menuId === menu_id)
                        }
                        onClick={() => {
                          const itemToAdd = {
                            menuId: menu_id,
                            restaurantId,
                            name,
                            img,
                            price,
                            quantity: 1,
                          };

                          // setAddedItems([...addedItems, itemToAdd]);
                          // saveOrderItem(itemToAdd);

                          updateOrders(itemToAdd);
                        }}
                        className="btn btn-primary w-[150px] ml-auto"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  });
};

export default Menus;
