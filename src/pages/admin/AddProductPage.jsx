import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { toast } from "react-toastify"
import PulseLoader from "react-spinners/PulseLoader";
import { Navigate } from "react-router-dom";

const categoryList = [
    {
        name: 'fashion'
    },
    {
        name: 'shirt'
    },
    {
        name: 'jacket'
    },
    {
        name: 'mobile'
    },
    {
        name: 'laptop'
    },
    {
        name: 'shoes'
    },
    {
        name: 'home'
    },
    {
        name: 'books'
    }
]
const AddProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading , user} = context;
    const navigate = useNavigate();
    const [data, Setdata] = useState({
        title: "",
        price: "",
        image: "",
        category: "",
        desc: ""
    })
     const token= localStorage.getItem("token")
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        Setdata({
            ...data,
            [name]: value,
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(data)
        setLoading(true);
        try {
            const response = await fetch("https://e-commerce-backend-814s.onrender.com/api/admin/create-product", {
                mode:"no-cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
            console.log(response)

            if (response.ok) {
                Setdata({
                    title: "",
                    price: "",
                    image: "",
                    category: "",
                    desc: ""
                })

                toast.success("Product Added Sucessful")
                setLoading(false)
                navigate("/admin-dashboard")
            }

        } catch (error) {
            console.log("Add product error", error)
        }

    
    }

    if(!user.isAdmin){
        return <Navigate to= "/"/>
     }

    return (
        <div>
            {loading ? <div className='flex justify-center items-center h-screen'><PulseLoader color="#d81b60" /></div>:<div className='flex justify-center items-center h-screen'>
                {/* Login Form  */}
                <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">

                    {/* Top Heading  */}
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-pink-500 '>
                            Add Product
                        </h2>
                    </div>

                  
                    <form onSubmit={handleSubmit} >

                        <div className="mb-3">
                            <input
                                type="text"
                                name="title"
                                value={data.title}
                                onChange={handleInput}
                                placeholder='Product Title'
                                className='bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="number"
                                name="price"
                                value={data.price}
                                onChange={handleInput}
                                placeholder='Product Price'
                                className='bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                            />
                        </div>

                        
                        <div className="mb-3">
                            <input
                                type="text"
                                name="image"
                                value={data.image}
                                onChange={handleInput}
                                placeholder='Product Image Url'
                                className='bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                            />
                        </div>

                        <div className="mb-3">
                            <select
                                value={data.category}
                                onChange={handleInput}
                                name="category"
                                className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none  ">
                                <option disabled>Select Product Category</option>
                                {categoryList.map((value, index) => {
                                    const { name } = value
                                    return (
                                        <option className=" first-letter:uppercase" key={index} value={name}>{name}</option>
                                    )
                                })}
                            </select>
                        </div>

                        
                        <div className="mb-3">
                            <textarea 
                            value={data.desc}
                            onChange={handleInput} 
                            name="desc" 
                            placeholder="Product Description" 
                            rows="5" 
                            className=" w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300 ">

                            </textarea>
                        </div>

                        
                        <div className="mb-3">
                            <button
                                type='submit'
                                className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                            >
                                Add Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>}
            
        </div>
    );
}

export default AddProductPage;