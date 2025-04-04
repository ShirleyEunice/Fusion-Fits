import React from 'react';
import home2 from '../../assets/home2.jpg';
import { Link } from 'react-router-dom';

const Hero = () => {
  
  return (
    <section className="relative">
      <img
      src={home2}
      className="w-full h-[300px] md:h-[400px] lg:h-[640px] object-cover "
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 flex items-end justify-center lg:bottom-48"> 
        <div className="text-white p-6">
          <Link
          to="#"
          className="bg-white text-gray-950 px-6 py-2 rounded-lg text-lg hover:bg-fresh-green hover:text-white">
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero