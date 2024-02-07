import RestaurantCard from "../../components/Restaurant/RestaurantCard";
import Banner from "../../components/Header/Banner";
import { API_BASE_URL } from "../../Utility/constants";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { getUserData } from "../../Utility/utilities";

const CustomerHome = () => {
  const [restaurants, setRestaurants] = useState([]);
  const { user } = useContext(AuthContext);
  const { zipCode } = getUserData(user);

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        let url = `${API_BASE_URL}/api/restaurants`;

        if (zipCode) {
          url = `${API_BASE_URL}/api/restaurants?zip=${zipCode}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getRestaurants();
  }, []);

  return (
    <div>
      <Banner />
      <h2 className="text-4xl font-bold text-red-800 text-center mt-8">
        Our Restaurants
      </h2>
      <div className="grid grid-cols-2 w-[1400px] mx-auto md:grid-cols-3 p-6 gap-8">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default CustomerHome;
