import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import CustomerHome from "../../components/Home/CustomerHome";
import RestaurantHome from "../../components/Home/RestaurantHome";
import { getUserData } from "../../Utility/utilities";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { userType } = getUserData(user);

  return userType === "restaurant" ? <RestaurantHome /> : <CustomerHome />;
};

export default Home;
