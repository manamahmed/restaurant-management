import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    // const firstName = form.first_name.value;
    // const lastName = form.last_name.value;
    // const address = form.address.value;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "User Created Successfully!",
          icon: "success",
        });
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
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
                  placeholder="first Name"
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
                  placeholder="last name"
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
                  placeholder="email"
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
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  name="password"
                />
              </div>
              {/* <div className="form-control">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  className="input input-bordered"
                  required
                  name="address"
                />
              </div> */}
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

export default Register;
