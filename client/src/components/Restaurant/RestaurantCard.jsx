/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";

const RestaurantCard = ({ restaurant }) => {
  const { id, title, location, menus, opening_hours } = restaurant;
  console.log(menus);

  return (
    <div>
      <div className="card card-compact bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="flex gap-2 items-center">
            <div>
              <span>
                <CiLocationOn></CiLocationOn>
              </span>
            </div>

            <div>
              <p>{location}</p>
            </div>
          </div>
          {/* <h2>{opening_hours}</h2> */}
          <div className="card-actions justify-end">
            <Link to={`/menus/${id}`}>
              <button className="btn btn-primary">See Menus</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
