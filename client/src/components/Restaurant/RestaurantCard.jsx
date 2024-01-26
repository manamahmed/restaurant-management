import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";

const RestaurantCard = ({ restaurant }) => {
  const { id, title, img, description, location } = restaurant;

  return (
    <div>
      <div className="card card-compact bg-base-100 shadow-xl">
        <figure>
          <img src={img} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
          <div className="flex gap-2 items-center">
            <div>
              <span>
                <CiLocationOn />
              </span>
            </div>

            <div>
              <p>{location}</p>
            </div>
          </div>
          <div className="card-actions justify-end">
            <Link to={`/restaurants/${id}`}>
              <button className="btn btn-primary">See Menus</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
