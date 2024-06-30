import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const OrderDetail = () => {
  const context = useContext(myContext);
  const token = localStorage.getItem("token");

  const [orders, setOrders] = useState([]);
  const [statuses] = useState([
    "Not Processed",
    "Processed",
    "Shipped",
    "Cancelled",
  ]);

  const getAllOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/order/get-all-orders",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const handleChange = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/api/admin/order-status/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        getAllOrders(); // Refresh orders after status update
      } else {
        console.log("Failed to update order status");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      //  setLoading(true)
      const response = await fetch(
        `http://localhost:8000/api/admin/deleteorder/` + id,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        //  setLoading(false)
        getAllOrders();
        toast.success("Order deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <div className="py-5">
          <h1 className="text-xl text-pink-300 font-bold">All Orders</h1>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
            <tbody>
              <tr>
                <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">
                  S.No.
                </th>
                <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                  Order Id
                </th>
                <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                  Image
                </th>
                <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                  Title
                </th>
                <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                  Category
                </th>
                <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                  Price
                </th>
                <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                  Quantity
                </th>
                <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                  Total Price
                </th>
                <th
                  className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                  style={{ width: "200px" }}
                >
                  Status
                </th>
                <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                  Order Quantity
                </th>
                <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                  Name
                </th>
                <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                  Address
                </th>
                <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                  Pincode
                </th>
                <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                  Phone Number
                </th>
                <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                  Email
                </th>
                <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                  Date
                </th>

              </tr>
              {orders &&
                orders.map((order, orderIndex) =>
                  order.products.map((product, productIndex) => (
                    <tr
                      key={`${order._id}-${productIndex}`}
                      className="text-pink-300"
                    >
                      {productIndex === 0 && (
                        <>
                          <td
                            rowSpan={order.products.length}
                            className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500"
                          >
                            {orderIndex + 1}
                          </td>
                          <td
                            rowSpan={order.products.length}
                            className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500"
                          >
                            {order.orderId}
                          </td>
                        </>
                      )}
                      <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                        <img alt="img" src={product.image} />
                      </td>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                        {product.title}
                      </td>
                      <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                        {product.category}
                      </td>
                      <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                        ₹{product.price}
                      </td>
                      <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                        {product.quantity}
                      </td>
                      {productIndex === 0 && (
                        <>
                          <td
                            rowSpan={order.products.length}
                            className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500"
                          >
                            ₹{order.totalPrice}
                          </td>
                          <td
                            rowSpan={order.products.length}
                            className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500"
                            style={{ width: "200px" }}
                          >
                            <form className="max-w-sm mx-auto">
                              <label
                                htmlFor="status"
                                className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Select Status
                              </label>
                              <select
                                style={{ width: "200px" }}
                                id="status"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(e) =>
                                  handleChange(order._id, e.target.value)
                                }
                              >
                                {statuses.map((status, indx) => (
                                  <option
                                    key={indx}
                                    value={status}
                                    selected={order.status === status}
                                  >
                                    {status}
                                  </option>
                                ))}
                              </select>
                            </form>
                          </td>
                          <td
                            rowSpan={order.products.length}
                            className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-green-600"
                          >
                            {order.quantity}
                          </td>

                          <td
                            rowSpan={order.products.length}
                            className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-green-600"
                          >
                            {order.name}
                          </td>
                          <td
                            rowSpan={order.products.length}
                            className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500"
                          >
                            {order.address}
                          </td>
                          <td
                            rowSpan={order.products.length}
                            className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500"
                          >
                            {order.pincode}
                          </td>
                          <td
                            rowSpan={order.products.length}
                            className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500"
                          >
                            {order.phone}
                          </td>
                          <td
                            rowSpan={order.products.length}
                            className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500"
                          >
                            {order.buyer}
                          </td>
                          <td
                            rowSpan={order.products.length}
                            className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500"
                          >
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>

                        </>
                      )}
                    </tr>
                  ))
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
