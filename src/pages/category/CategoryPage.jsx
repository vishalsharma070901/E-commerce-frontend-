import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../Components/layouts/Layout';
import { useParams } from "react-router-dom"
import myContext from '../../context/myContext';


const CategoryPage = () => {
    const { categoryname } = useParams();
    const context = useContext(myContext)
    const { loading, setLoading, mode } = context

    const [product, setProduct] = useState([]);

    const getproducts = async () => {
        setLoading(true)
        try {
            const response = await fetch("http://localhost:8000/api/product/get-products", {
                method: "GET",
            });
            const data = await response.json();
            setProduct(data.products)
            // console.log(product);
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    };
   

    const filterProduct = product.filter((obj) => {
        return obj.category === categoryname.toString()
    })
    console.log(filterProduct)

    useEffect(() => {
        getproducts()
    }, [])

    return (
        <Layout>
            <div className="mt-10">
                {/* Heading  */}
                <div className="">
                    <h1 className=" text-center mb-5 text-2xl font-semibold first-letter:uppercase">{categoryname}</h1>
                </div>
                <section className="text-gray-600 body-font">
                    <div className="container px-5 lg:px-0 py-5 mx-auto">
                        <div className="flex flex-wrap -m-4">
                            {filterProduct.map((item, index) => {

                                return (
                                    <div key={index} className="p-4 md:w-1/4  drop-shadow-lg " >
                                        <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                            <div className="flex justify-center cursor-pointer" >
                                                <img
                                                    onClick={() => navigate('/product/' + item._id)}
                                                    className=" rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out" src={item.image} alt="blog" />
                                            </div>
                                            <div className="p-5 border-t-2">
                                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '', }}>E-Bharat</h2>
                                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '', }}>{item.title.substring(0, 25)}</h1>
                                                {/* <p className="leading-relaxed mb-3">{item.description.}</p> */}
                                                <p className="leading-relaxed mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{item.price}</p>
                                                <div className=" flex justify-center">
                                                    <button type="button" className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full  py-2">Add To Cart</button>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>


            </div>



        </Layout>
    );
}

export default CategoryPage


