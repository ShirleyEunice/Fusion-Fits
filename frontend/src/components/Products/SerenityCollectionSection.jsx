import React from 'react'
import MenCollection from '../../assets/MenCollection.jpg';
import WomenCollection from '../../assets/WomenCollection.jpg';
import { Link } from 'react-router-dom';

const SerenityCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-x-40">
        {/*Men Collection */}
        <div className="relative flex-1">
          <img
          src={MenCollection}
          alt="Men's Collection"
          className="w-[550px] h-[560px] object-cover rounded-lg"
          />
          <div className="absolute lg:bottom-8 lg:left-8 bg-white bg-opacity-80 p-4 rounded-lg bottom-20 left-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 mt-2">
              Men Collection
            </h2>
            <Link
            to="/collections/all?collection=men"
            className="text-gray-900 underline hover:text-fresh-green">
              Shop Now
            </Link>
          </div>
        </div>

        {/*Women Collection */}
        <div className="relative flex-1 lg:py-0 py-10">
          <img
          src={WomenCollection}
          alt="Women's Collection"
          className="w-[550px] h-[560px] object-cover rounded-lg"
          />
          <div className="absolute lg:bottom-8 lg:left-8 bg-white bg-opacity-80 p-4 rounded-lg bottom-20 left-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 mt-2">
              Women Collection
            </h2>
            <Link
            to="/collections/all?collection=women"
            className="text-gray-900 underline hover:text-fresh-green">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SerenityCollectionSection;