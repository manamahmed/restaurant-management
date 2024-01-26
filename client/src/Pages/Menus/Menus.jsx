/* eslint-disable no-undef */
import { useLoaderData, useParams, useRoutes } from "react-router-dom";
import MenuCategory from "./menuCategory";


const Menus = () => {
     const restaurants = useLoaderData();
     const {id: menuId} = useParams()

     const restaurant = restaurants.find(rest => {
        console.log(rest.id, menuId);
        return rest.id === Number(menuId);
     })
     console.log(restaurant);

     if(!restaurant){
        return null
     }
     const menus = restaurant.menus
     console.log(menus);

    //  const routes = useRoutes();
    //  console.log(routes);
    //  const { id, title, location, menus } = test
    //  console.log(test)

    return Object.entries(menus).map(([menuName, menuItems]) => {
        return (
          <>
            <div
              className="grid grid-cols-2 gap-12 w-[1200px] mx-auto mb-12 "
              key={menuName}
            >
              <div className="text-2xl  font-bold ml-4 mt-8 ">{menuName}</div>
              <br />
              {menuItems.map(({ menu_id, name, description, price }) => {
                return (
                  <div className="" key={menu_id}>
                    <div className="card card-compact  bg-base-100 shadow-xl">
                      <figure>
                        <img
                          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                          alt="Shoes"
                        />
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title">{name}</h2>
                        <p>{description}</p>
                        <p>${price}</p>
                        <div className="card-actions justify-end">
                          <button className="btn btn-primary">
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        );
    })
};

export default Menus;