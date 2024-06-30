import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import myContext from "../../context/myContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

const BuyNowModal = () => {
  const [userDetails, SetUserDetails] = useState({
    name: "",
    address: "",
    pincode: "",
    phone: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    SetUserDetails({
      ...userDetails,
      [name]: value,
    });
  };
  console.log(userDetails);

  const navigate = useNavigate();
  const context = useContext(myContext);
  const { cart, SetCart, amount, setAmount, user, quantity } = context;
  console.log(quantity);
  const [open, setOpen] = useState(false);

  // const email=localStorage.getItem("userdata")
  const carts = JSON.parse(localStorage.getItem("cart"));

  const checkout = async (e) => {
    e.preventDefault();
    console.log("click");

    try {
      const res = await fetch(`http://localhost:8000/api/payment/order`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          amount,
        }),
      });

      const data = await res.json();
      console.log(data);
      handlePaymentVerify(data.order);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePaymentVerify = async (data) => {
    const {
      data: { key },
    } = await axios.get("http://localhost:8000/api/getkey");
    console.log(data.amount);
    console.log(data.currency);
    console.log(data.id);
    const options = {
      key,
      amount: data.amount,
      currency: "INR",
      name: "Vishal ",
      description: "Test Transaction",
      image: "https://avatars.githubusercontent.com/u/110377874?v=4",
      order_id: data.id,
      handler: async (response) => {
        // console.log("response", response)
        try {
          const res = await fetch(`http://localhost:8000/api/payment/verify`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_Payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              cart: carts,
              user: user.email,
              name: userDetails.name,
              address: userDetails.address,
              pincode: userDetails.pincode,
              phone: userDetails.phone,
              totalPrice: amount,
            }),
          });

          if (res.ok) {
            toast.success("Payment  Sucessful");
            localStorage.removeItem("cart");
            SetCart([]);

            navigate("/user-dashboard/" + user.email);
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#de155f",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handleOpen = () => setOpen(!open);
  return (
    <>
      <Button
        type="button"
        onClick={handleOpen}
        className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent dark:border-gray-700 hover:border-pink-500 hover:text-pink-700 hover:bg-pink-100 rounded-xl"
      >
        Buy now
      </Button>
      <Dialog open={open} handler={handleOpen} className=" bg-pink-50">
        <DialogBody className="">
          <div className="mb-3">
            <input
              value={userDetails.name}
              onChange={handleInput}
              type="text"
              name="name"
              placeholder="Enter your name"
              className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
            />
          </div>
          <div className="mb-3">
            <input
              value={userDetails.address}
              onChange={handleInput}
              type="text"
              name="address"
              placeholder="Enter your address"
              className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
            />
          </div>

          <div className="mb-3">
            <input
              value={userDetails.pincode}
              onChange={handleInput}
              type="number"
              name="pincode"
              placeholder="Enter your pincode"
              className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
            />
          </div>

          <div className="mb-3">
            <input
              value={userDetails.phone}
              onChange={handleInput}
              type="number"
              name="phone"
              placeholder="Enter your pincode"
              className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
            />
          </div>

          <div className="">
            <Button
              type="button"
              onClick={checkout}
              className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent dark:border-gray-700 rounded-lg"
            >
              Make mayment
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default BuyNowModal;
