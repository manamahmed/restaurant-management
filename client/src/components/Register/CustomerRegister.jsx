import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../Utility/constants";

const CustomerRegister = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const first_name = form.first_name.value;
    const last_name = form.last_name.value;
    const street = form.street.value;
    const zip = form.zip.value;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then(async () => {
        await updateUserProfile({
          name: first_name,
          photoURL: `customer,${zip}`,
        });

        try {
          const data = { first_name, last_name, email, street, zip };
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          };
          const response = await fetch(
            `${API_BASE_URL}/api/customers`,
            options
          );
          await response.json();

          Swal.fire({
            title: "Good job!",
            text: "User Created Successfully!",
            icon: "success",
          });
          navigate("/");
        } catch (error) {
          console.error("Error creating customers:", error);
        }
      })
      .catch((err) => {
        console.log(err.message);

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
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold mb-6">Register Now!</h1>
          </div>
          <div className="card shrink-0 w-[500px] max-w-xl shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="input input-bordered"
                  required
                  name="first_name"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Last name"
                  className="input input-bordered"
                  required
                  name="last_name"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                  name="email"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="Password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  name="password"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Street</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your street"
                  className="input input-bordered"
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
                  placeholder="Enter your zip code"
                  className="input input-bordered"
                  required
                  name="zip"
                />
              </div>
              <div className="form-control mt-6">
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

export default CustomerRegister;
