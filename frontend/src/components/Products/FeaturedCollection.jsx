import React from 'react';
import { Link } from 'react-router-dom';
import featured from '../../assets/featured.jpg';

const FeaturedCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-fresh-green-200 rounded-3xl">
        
        {/* Left Content */}
        <div className="lg:w-1/2 p-8 text-center lg:text-left">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Fashion Fits - Where Style Meets Comfort
          </h2>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 py-2">
          Style that matches your vibe, your comfort, your story.
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Discover the latest trends in men's and women's fashion at Fashion Fits. Our collection is designed to bring you the perfect blend of comfort, style, and quality. From casual wear to formal outfits, each piece is crafted to enhance your everyday look. Elevate your wardrobe with our fresh arrivals!
          </p>
          <Link
            to="/collections/all"
            className="bg-fresh-green text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800"
          >
            Shop Now
          </Link>
        </div>

        {/* Right Content */}
        <div className="lg:w-1/2">
          <img
            src={featured}
            alt="Featured Collection"
            className="w-full h-[500px] object-cover lg:rounded-tr-3xl lg:rounded-br-3xl"
          />
        </div>
        
      </div>
    </section>
  );
};

export default FeaturedCollection;
