import React from 'react';
import { HiShoppingBag } from "react-icons/hi";
import { TbTruckDelivery } from "react-icons/tb";
import { IoBagCheckOutline } from "react-icons/io5";

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Feature 1 */}
<div className="flex flex-col items-center">
  <div className="p-4 rounded-full mb-4">
    <HiShoppingBag className="text-2xl hover:text-fresh-green" />
  </div>
  <h4 className="tracking-tighter mb-2 uppercase">
    Trendy & Handpicked Styles
  </h4>
  <p className="text-gray-600 text-sm tracking-tighter">
    Every piece is carefully selected to offer the latest fashion trends.
  </p>
</div>

{/* Feature 2 */}
<div className="flex flex-col items-center">
  <div className="p-4 rounded-full mb-4">
    <TbTruckDelivery className="text-2xl hover:text-fresh-green" />
  </div>
  <h4 className="tracking-tighter mb-2 uppercase">
    Fast & Free Shipping
  </h4>
  <p className="text-gray-600 text-sm tracking-tighter">
    Enjoy fast and free shipping on all orders over ₹ 500.
  </p>
</div>

{/* Feature 3 */}
<div className="flex flex-col items-center">
  <div className="p-4 rounded-full mb-4">
    <IoBagCheckOutline className="text-2xl hover:text-fresh-green" />
  </div>
  <h4 className="tracking-tighter mb-2 uppercase">
    Easy Returns & Exchanges
  </h4>
  <p className="text-gray-600 text-sm tracking-tighter">
    Hassle-free returns and exchanges for a perfect fit every time.
  </p>
</div>


      </div>
    </section>
  );
};

export default FeaturesSection;
