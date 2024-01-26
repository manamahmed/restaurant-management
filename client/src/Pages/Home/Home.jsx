import { useLoaderData } from "react-router-dom";
import RestaurantCard from "../../components/Restaurant/RestaurantCard";
import Banner from "../../components/Header/Banner";


const Home = () => {
    const restaurants = useLoaderData();
    const restaurantsArr = Array.isArray(restaurants) ? restaurants : [];

    return (
      <div>
        <Banner />
        <h2 className="text-4xl font-bold text-red-800 text-center mt-8">Our Restaurants</h2>
        <div className="grid grid-cols-2 w-[1400px] mx-auto md:grid-cols-3 p-6 gap-8">
          {restaurantsArr.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
            ></RestaurantCard>
          ))}
        </div>
      </div>
    );
};

export default Home;