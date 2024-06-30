import React, { useContext, useEffect } from 'react'
import Layout from "../../Components/layouts/Layout"
import HeroSection from '../../Components/heroSection/HeroSection'
import Category from '../../Components/category/Category'
import HomePageProductCard from '../../Components/homePageProductCard/HomePageProductCard'
import Track from '../../Components/track/Track'
import Testimonial from '../../Components/testimonials/Testimonials'

import { Link} from "react-router-dom"


const Homepage = () => {

  




 
   
  return (
    
    <Layout>

      <HeroSection/>
      <Category/>
      <HomePageProductCard/>
      <div className="flex justify-center -mt-10 mb-4">
        <Link to={'/allproduct'}>
          <button className=' bg-gray-300 px-5 py-2 rounded-xl'>See more</button>
        </Link>
      </div>
      <Track/>
      <Testimonial/>
      
     
    </Layout>
    
  )
}

export default Homepage
