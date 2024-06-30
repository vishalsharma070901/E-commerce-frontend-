import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import myContext from "../../context/myContext";
import axios from "axios";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";

const ProductDetail = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const [product, setProduct] = useState([]);
  const token = localStorage.getItem("token");

  const getproducts = async () => {
    try {
      const response = await fetch("https://e-commerce-backend-814s.onrender.com/api/admin/products", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setProduct(data.products);
      // console.log(product);
    } catch (error) {}
  };

  const HandleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://e-commerce-backend-814s.onrender.com/api/admin/deleteProduct/${id}`,
        {
          mode:"no-cors",
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        setLoading(false);
        getproducts();
        toast.success("Product added sucessfull");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getproducts();
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <PulseLoader color="#d81b60" />
        </div>
      ) : (
        <>
          {" "}
          <div className="py-5 flex justify-between items-center">
            {/* text  */}
            <h1 className=" text-xl text-pink-300 font-bold">All Product</h1>
            {/* Add Product Button  */}
            <Link to={"/addproduct"}>
              <button className="px-5 py-2 bg-pink-50 border border-pink-100 rounded-lg">
                Add Product
              </button>
            </Link>
          </div>
          {/* table  */}
          <div className="w-full overflow-x-auto mb-5">
            <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara"
                  >
                    S.No.
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                  >
                    Action
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {product.map((curr, index) => {
                  return (
                    <tr className="text-pink-300" key={index}>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                        {index + 1}
                      </td>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                        <img className="h-20" src={curr.image} alt="" />
                      </td>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                        {curr.title}
                      </td>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                        ₹{curr.price}
                      </td>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                        {curr.category}
                      </td>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                        {new Date(curr.createdAt).toLocaleDateString()}
                      </td>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-green-500 cursor-pointer ">
                        <Link to={"/updateproduct/" + curr._id}>Edit</Link>
                      </td>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                        <Link onClick={() => HandleDelete(curr._id)}>
                          Delete
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
