import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Menus = () => {
  const { id: restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/restaurants/${restaurantId}`
        );
        const data = await response.json();
        setRestaurant(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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

  return Object.entries(menusObj).map(([menuName, menuItems]) => {
    return (
      <>
        <div
          className="grid grid-cols-2 gap-12 w-[1200px] mx-auto mb-12 "
          key={menuName}
        >
          <div className="text-2xl  font-bold ml-4 mt-8 ">{menuName}</div>
          <br />
          {menuItems.map(({ menu_id, name, img, description, price }) => {
            return (
              <div key={menu_id}>
                <div className="card card-compact  bg-base-100 shadow-xl">
                  <figure>
                    <img src={img} alt="Shoes" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{description}</p>
                    <p>${price}</p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary">Add To Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  });
};

export default Menus;
