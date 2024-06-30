/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import myContext from "../../context/myContext";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const [loadingAnimation, SetLoadingAnimation] = useState(false);
  const { loading, setLoading, storeTokenInLs, userData, SetUserData } =
    context;

  const [user, SetUser] = useState({
    email: "",
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
    setLoading(true);
    console.log(user);
    try {
      const response = await fetch(`https://e-commerce-backend-814s.onrender.com/api/auth/login`, {
        mode:"no-cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res_data = await response.json();

      // console.log(res_Data.token)
      storeTokenInLs(res_data.token);

      if (response.ok) {
        SetUser({
          email: "",

          password: "",
        });

        toast.success("Login Sucessful");
        // localStorage.setItem("userdata", user.email)
        setLoading(false);
        navigate("/");
      } else {
        setLoading(false);
        toast.error(res_data.extraDetails);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <PulseLoader color="#d81b60" />
        </div>
      ) : (
        <>
          <div className=" flex justify-center items-center h-screen">
            <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
              <div className="">
                <h1 className="text-center text-white text-xl mb-4 font-bold">
                  Login
                </h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    placeholder="Enter Your Email Address"
                    className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                    placeholder="Enter Your Password"
                    className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                  />
                </div>
                <div className=" flex justify-center mb-3">
                  <button
                    type="submit"
                    className=" bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg"
                  >
                    Login
                  </button>
                </div>
                <div>
                  <h2 className="text-white">
                    Don't have an account{" "}
                    <Link className=" text-yellow-500 font-bold" to={"/signup"}>
                      Signup
                    </Link>
                  </h2>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
