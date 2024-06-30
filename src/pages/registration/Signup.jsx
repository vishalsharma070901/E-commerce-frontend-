/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";

import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";

const Signup = () => {
  const context = useContext(myContext);
  const { loading, setLoading, storeTokenInLs } = context;
  const navigate = useNavigate();
  const [user, SetUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    SetUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    setLoading(true);
    try {
      const response = await fetch(`https://e-commerce-backend-814s.onrender.com/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res_data = await response.json();
      storeTokenInLs(res_data.token);
      if (response.ok) {
        SetUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });

        toast.success("Registration Sucessful");
        setLoading(false);
        navigate("/login");
      } else {
        setLoading(false);
        toast.error(res_data.extraDetails);
      }
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.log("register error", error);
    }
  };
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <PulseLoader color="#d81b60" />
        </div>
      ) : (
        <div className=" flex justify-center items-center h-screen">
          <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
            <div className="">
              <h1 className="text-center text-white text-xl mb-4 font-bold">
                Signup
              </h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleInput}
                  className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                  placeholder="Enter your Username"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInput}
                  className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                  placeholder="Enter Your Email Address"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Enter Your Phone Number "
                  name="phone"
                  value={user.phone}
                  onChange={handleInput}
                  className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleInput}
                  className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                  placeholder="Enter Your Password"
                />
              </div>
              <div className=" flex justify-center mb-3">
                <button
                  type="submit"
                  className=" bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg"
                >
                  Signup
                </button>
              </div>
              <div>
                <h2 className="text-white">
                  Have an account{" "}
                  <Link className=" text-red-500 font-bold" to={"/login"}>
                    Login
                  </Link>
                </h2>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
