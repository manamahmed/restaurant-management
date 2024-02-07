import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../Utility/constants";

const RestaurantRegister = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const imgUrl = form.imgUrl.value;
    const street = form.street.value;
    const zip = form.zip.value;
    const email = form.email.value;
    const password = form.password.value;
    const opening_time = form.from.value;
    const closing_time = form.to.value;
    const delivery_radius = form.delivery_radius.value;

    createUser(email, password)
      .then(async () => {
        await updateUserProfile({ name, photoURL: `restaurant,${zip}` });

        try {
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              street,
              zip,
              email,
              password,
              opening_time,
              closing_time,
              description,
              image: imgUrl,
              delivery_radius,
            }),
          };
          const response = await fetch(
            `${API_BASE_URL}/api/restaurants`,
            options
          );
          await response.json();

          Swal.fire({
            title: "Good job!",
            text: "Restaurant added Successfully!",
            icon: "success",
          });
          navigate("/");
        } catch (error) {
          console.error("Error creating restaurant:", error);

          Swal.fire({
            title: "Error!",
            text: "Error occurs on creating restaurant!",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.error(err);

        if (err.message.includes("auth/email-already-in-use")) {
          Swal.fire({
            title: "Error!",
            text: "Email already in use!",
            icon: "error",
          });
        }
      });
  };

  return (
    <div>
      <div className="min-h-screen bg-base-200">
        <div className="  flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Register Now!</h1>
          </div>
          <div className=" w-[800px] mx-auto card shrink-0  shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="flex gap-4 justify-center">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input w-[300px] input-bordered"
                    required
                    name="name"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="input  w-[300px]  input-bordered"
                    required
                    name="email"
                  />
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="Password"
                    placeholder="password"
                    className="input  w-[300px]  input-bordered"
                    required
                    name="password"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    type="text"
                    placeholder="Enter restaurant description"
                    className="input  w-[300px]  input-bordered"
                    required
                    name="description"
                    rows={10}
                  />
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Street</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter restaurant street"
                    className="input w-[300px]  input-bordered"
                    required
                    name="street"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Zip code</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter restaurant zip code"
                    className="input  w-[300px]  input-bordered"
                    required
                    name="zip"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label ml-16">
                  <span className="label-text">Image url</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter restaurant image url"
                  className="input  w-[620px] mx-auto  input-bordered"
                  required
                  name="imgUrl"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text ml-16">
                    Delivery radius (in zip)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="47051,47052,47053"
                  className="input w-[620px] mx-auto  input-bordered"
                  required
                  name="delivery_radius"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text ml-16">Opening time</span>
                </label>
                <div className="flex gap-4 justify-center">
                  <input
                    type="text"
                    placeholder="From"
                    className="input  w-[300px]   input-bordered"
                    required
                    name="from"
                  />
                  <input
                    type="text"
                    placeholder="To"
                    className="input  w-[300px]  input-bordered"
                    required
                    name="to"
                  />
                </div>
              </div>

              <div className="form-control w-[620px] mx-auto mt-6">
                <button className="btn btn-primary">Sign Up</button>
              </div>
            </form>
            <p className="text-center p-2 mb-2">
              Already Have an Account ?
              <Link to={"/login"}>
                <button className="btn btn-active btn-link">Login Now</button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantRegister;
