import { useEffect, useState } from "react";
import Layout from "../../Components/layouts/Layout";
import { useContext } from "react";
import myContext from "../../context/myContext";




const UserDashboard = () => {

    const context = useContext(myContext)
    const { userData, SetUserData, user } = context
    const [order, SetUserOrder] = useState(null)

 
    // const email= localStorage.getItem("email")

   console.log(user)

console.log(user.email)

    const getUserOrder = async () => {
        try {
   
            const response = await fetch("https://e-commerce-backend-814s.onrender.com/api/order/get-user-orders/" + user.email, {
                mode:"no-cors",
                method: "GET",
            })
            const data = await response.json();
           
            SetUserOrder(data)
        } catch (error) {
            console.log(error)
        }

        console.log(order)
        // const createdDate = new Date(order.createdAt);

        // // Format date using toLocaleDateString()
        // const formattedDate = createdDate.toLocaleDateString();

        // console.log(formattedDate)
    }
    useEffect(() => {
        // getuserData();
        getUserOrder();
    }

)

    return (
        <Layout>
            <div className=" container mx-auto px-4 py-5 lg:py-8">
                {/* Top  */}
                <div className="top ">
                    {/* main  */}
                    <div className=" bg-pink-50 py-5 rounded-xl border border-pink-100">
                        {/* image  */}
                        <div className="flex justify-center">
                            <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="" />
                        </div>

                        <div className="">
                            <h1 className=" text-center text-lg"><span className=" font-bold">Name :{user.username} </span></h1>
                            <h1 className=" text-center text-lg"><span className=" font-bold">Email :</span>{user.email}</h1>
                            <h1 className=" text-center text-lg"><span className=" font-bold">Phone :</span>{user.phone}</h1>



                        </div>
                    </div>
                </div>


                <div className="bottom">

                    <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">

                        <h2 className=" text-2xl lg:text-3xl font-bold">Order Details</h2>

                        {order && order.map((item, index) => (
                            <div key={index+1} className="mt-5 flex flex-col overflow-hidden rounded-xl border border-pink-100 md:flex-row">

                                <div className="w-full border-r border-pink-100 bg-pink-50 md:max-w-xs">

                                    <div className="p-8">
                                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                                            <div className="mb-4">
                                                <div className="text-sm font-semibold text-black">Order Id</div>
                                                <div className="text-sm font-medium text-gray-900">{item.orderId}</div>
                                            </div>

                                            <div className="mb-4">
                                                <div className="text-sm font-semibold">Date</div>
                                                <div className="text-sm font-medium text-gray-900">{}</div>
                                            </div>

                                            <div className="mb-4">
                                                <div className="text-sm font-semibold">Total Amount</div>
                                                <div className="text-sm font-medium text-gray-900">{item.totalPrice}</div>
                                            </div>

                                            <div className="mb-4">
                                                <div className="text-sm font-semibold">Order Status</div>
                                                <div className="text-sm font-medium text-green-800">{item.status}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="p-8">
                                        <ul className="-my-7 divide-y divide-gray-200">
                                            {item.products.map((product,k) => (
                                                <li key={k+1}
                                                    className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
                                                >
                                                    <div className="flex flex-1 items-stretch">
                                                        <div className="flex-shrink-0">
                                                            <img
                                                                className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                                                                src={product.image}
                                                            // alt={product.imageSrc}
                                                            />
                                                        </div>

                                                        <div className="ml-5 flex flex-col justify-between">
                                                            <div className="flex-1">
                                                                <p className="text-sm font-bold text-gray-900">{product.title}</p>
                                                                {/* <p className="mt-1.5 text-sm font-medium text-gray-500">{product.color}</p> */}
                                                            </div>

                                                            <p className="mt-4 text-sm font-medium text-gray-500">X {product.quantity}</p>
                                                        </div>
                                                    </div>

                                                    <div className="ml-auto flex flex-col items-end justify-between">
                                                        <p className="text-right text-sm font-bold text-gray-900">₹{product.price * product.quantity}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>

                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UserDashboard;