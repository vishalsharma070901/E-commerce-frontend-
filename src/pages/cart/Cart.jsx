import Layout from "../../Components/layouts/Layout";
import { Trash } from "lucide-react";
import Modal from "../../Components/modal/Modal";
import { useContext, useState, useEffect } from "react";
import myContext from "../../context/myContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BuyNowModal from "../../Components/BuyNow Modal/BuyNowModal";

const CartPage = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { cart, SetCart, amount, setAmount,quantities, setQuantities } = context;


  // Initialize quantities when cart updates
  useEffect(() => {
    const initialQuantities = JSON.parse(localStorage.getItem("quantities")) || {};
    cart.forEach((product) => {
      if (!initialQuantities[product._id]) {
        initialQuantities[product._id] = 1; // Default quantity is 1 for each product
      }
    });
    setQuantities(initialQuantities);
  }, [cart]);

  // Calculate total amount whenever cart or quantities change
  useEffect(() => {
    totalAmount();
    localStorage.setItem("quantities", JSON.stringify(quantities));
  }, [cart, quantities]);

  // Function to calculate total amount
  const totalAmount = () => {
    try {
      let total = 0;
      let delivery = 50;
      cart.forEach((item) => {
        total += item.price * item.quantity;
      });
      total += delivery;

      setAmount(total);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle increasing quantity
  const increaseQuantity = (pid) => {
    const newCart = cart.map((data) => {
      if (data._id === pid) {
        data.quantity += 1;
      }
      return data;
    });
    SetCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };
  
  

  // Function to handle decreasing quantity
  const decreaseQuantity = (pid) => {
    const newCart = cart.map((data) => {
      if (data._id === pid && data.quantity > 1) {
        data.quantity -= 1;
      }
      return data;
    });
    SetCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  // Function to remove item from cart
  const removeCartItem = (pid) => {
    try {
      const updatedCart = cart.filter((item) => item._id !== pid);
      SetCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
 
      const newQuantities = { ...quantities };
      delete newQuantities[pid];
      setQuantities(newQuantities);
      localStorage.setItem("quantities", JSON.stringify(newQuantities));
    } catch (error) {
      console.log(error);
    }
  };

  // Function to display total price of items
  const totalPrice = () => {
    try {
      let total = 0;
      cart.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total.toLocaleString();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-7xl  lg:px-0">
        <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          {cart.length > 0 ? (
            <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
              <section
                aria-labelledby="cart-heading"
                className="rounded-lg bg-white lg:col-span-8"
              >
                <ul role="list" className="divide-y divide-gray-200">
                  {cart.map((product) => (
                    <div key={product._id} className="">
                      <li className="flex py-6 sm:py-6 ">
                        <div className="flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                            <div>
                              <div className="flex justify-between">
                                <h3 className="text-sm">
                                  <a
                                    href={product.href}
                                    className="font-semibold text-black"
                                  >
                                    {product.title}
                                  </a>
                                </h3>
                              </div>
                              <div className="mt-1 flex text-sm">
                                <p className="text-sm text-gray-500">
                                  {product.color}
                                </p>
                                {product.size ? (
                                  <p className="ml-4 border-l border-gray-200 pl-4 text-sm text-gray-500">
                                    {product.size}
                                  </p>
                                ) : null}
                              </div>
                              <div className="mt-1  items-end">
                                <p className="text-xs font-medium text-gray-500 ">
                                  {product.desc}
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                  ₹{product.price}
                                </p>
                                &nbsp;&nbsp;
                                <p className="text-sm font-medium text-green-500">
                                  {product.discount}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <div className="mb-2 flex">
                        <div className="min-w-24 flex">
                          <button
                            type="button"
                            className="h-7 w-7"
                            onClick={() => decreaseQuantity(product._id)}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="mx-1 h-7 w-9 rounded-md border text-center"
                            value={product.quantity}
                            readOnly
                          />
                          <button
                            type="button"
                            className="flex h-7 w-7 items-center justify-center"
                            onClick={() => increaseQuantity(product._id)}
                          >
                            +
                          </button>
                        </div>
                        <div className="ml-6 flex text-sm">
                          <button
                            onClick={() => removeCartItem(product._id)}
                            type="button"
                            className="flex items-center space-x-1 px-2 py-1 pl-0"
                          >
                            <Trash size={12} className="text-red-500" />
                            <span className="text-xs font-medium text-red-500">
                              Remove
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </ul>
              </section>
              {/* Order summary */}
              <section
                aria-labelledby="summary-heading"
                className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
              >
                <h2
                  id="summary-heading"
                  className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
                >
                  Price Details
                </h2>
                <div>
                  <dl className=" space-y-1 px-2 py-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-800">
                        Price ({cart?.length} item)
                      </dt>
                      <dd className="text-sm font-medium text-gray-900">
                        ₹{totalPrice()}
                      </dd>
                    </div>

                    <div className="flex items-center justify-between py-4">
                      <dt className="flex text-sm text-gray-800">
                        <span>Delivery Charges</span>
                      </dt>
                      <dd className="text-sm font-medium text-green-700">
                        {" "}
                        ₹ 50
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-y border-dashed py-4 ">
                      <dt className="text-base font-medium text-gray-900">
                        Total Amount
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        ₹{amount}
                      </dd>
                    </div>
                  </dl>
                  <div className="px-2 pb-4 font-medium text-green-700">
                    <div className="flex gap-4 mb-6">
                      <BuyNowModal />
                    </div>
                  </div>
                </div>
              </section>
            </form>
          ) : (
            <div className="flex justify-center items-center ">
              <h3>Nothing in cart</h3>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;