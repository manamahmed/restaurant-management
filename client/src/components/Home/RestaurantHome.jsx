import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { API_BASE_URL } from "../../Utility/constants";
import { getFullUrl } from "../../Utility/utilities";

const RestaurantHome = () => {
  const { user } = useContext(AuthContext);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const getRestaurantWithMenus = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/restaurants/${user.email}`
        );
        const data = await response.json();
        console.log({ data });
        setRestaurant(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user.email) {
      getRestaurantWithMenus();
    }
  }, [user.email]);

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

  const renderMenusList = () => {
    return Object.entries(menusObj).map(([menuName, menuItems], index) => {
      return (
        <>
          <div
            className="max-w-[1240px] mx-auto mb-12 "
            key={`${menuName}-${index}`}
          >
            <div className="text-2xl  font-bold ml-4 mt-8 ">{menuName}</div>
            <br />

            <div className="grid grid-cols-2 w-[1220px] mx-auto gap-8">
              {menuItems.map(({ menu_id, name, img, description, price }) => {
                return (
                  <div key={`${menu_id}-${name}`}>
                    <div className="flex flex-col items-center bg-white border border-gray-200 h-full rounded-lg shadow md:flex-row md:max-w-xl">
                      <div className="h-[200px]">
                        <img
                          className="object-cover w-full rounded-t-lg h-96 md:h-full md:w-[24rem] md:rounded-none md:rounded-s-lg"
                          src={getFullUrl(img)}
                          alt={name}
                        />
                      </div>
                      <div className="flex flex-col justify-between p-4 leading-normal min-w-[60%]">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight">
                          {name}
                        </h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                          {description}
                        </p>
                        <p>€{price}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      );
    });
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="card shrink-0 w-[1200px]  shadow-2xl bg-base-100">
            <form
              onSubmit={async (event) => {
                event.preventDefault();

                const form = event.target;
                const category = form.category.value;
                const price = form.price.value;
                const name = form.name.value;
                const description = form.description.value;
                const image = form.imageUrl.value;

                try {
                  const data = { category, name, description, image, price };
                  const options = {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                  };
                  const response = await fetch(
                    `${API_BASE_URL}/api/restaurants/${restaurant.id}/menus`,
                    options
                  );
                  const resData = await response.json();
                  setRestaurant({
                    ...restaurant,
                    menus: [...restaurant.menus, resData],
                  });

                  Swal.fire({
                    title: "Good job!",
                    text: "Menu item added Successfully!",
                    icon: "success",
                  });
                } catch (error) {
                  console.error("Error creating customers:", error);
                }
              }}
              className="card-body"
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <input
                  type="text"
                  placeholder="Category"
                  className="input input-bordered"
                  required
                  name="category"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                  name="name"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  type="description"
                  placeholder="Description"
                  className="input input-bordered"
                  required
                  name="description"
                  rows={20}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="text"
                  placeholder="Price"
                  className="input input-bordered"
                  required
                  name="price"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image Url</span>
                </label>
                <input
                  type="text"
                  placeholder="Image Url"
                  className="input input-bordered"
                  required
                  name="imageUrl"
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {renderMenusList()}
    </>
  );
};

export default RestaurantHome;
