import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { getFullUrl } from "../../Utility/utilities";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

const RestaurantCard = ({ restaurant }) => {
  const { id, title, img, description, location, opening_hours, rating } =
    restaurant;

  return (
    <div>
      <div className="card min-h-[560px] card-compact bg-base-100 shadow-xl">
        <figure>
          <img className="min-h-[286px]" src={getFullUrl(img)} alt="Shoes" />
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
          <div>
            <p>Opening Hours: {opening_hours}</p>
          </div>
          <div>
            <Rating style={{ maxWidth: 180 }} value={rating} readOnly />
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
