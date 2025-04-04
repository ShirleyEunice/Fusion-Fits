import React from 'react'

const checkout = {
  _id: "1234",
  createdAt: new Date(),
  checkoutItems: [
    {
      productId: "1",
      name: "Jacket",
      color: "Red",
      size: "M",
      price: 200,
      quantity: 1,
      image: "https://picsum.photos/150?random=1",
    },
    {
      productId: "2",
      name: "T-Shirt",
      color: "White",
      size: "S",
      price: 100,
      quantity: 2,
      image: "https://picsum.photos/150?random=2",
    },
  ],
  shippingAddress: {
    address: "Ganapathy",
    city: "Coimbatore",
    country: "India",
  },
};

const calculateEstimatedDelivery = (createdAt) =>
{
  const orderDate = new Date(createdAt);
  orderDate.setDate(orderDate.getDate() + 10); // Add 10 days to the order date
  return orderDate.toLocaleDateString();
}
const OrderConfirmation = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank You for Your Order!
      </h1>
      {checkout && (
        <div className="p-6 rounded-lg border">
          <div className="flex justify-between mb-20">
            {/* Order ID and date */}
            <div>
            <h2 className="text-xl font-semibold">
              Order ID: {checkout._id}
            </h2>
            <p className="text-gray-500 ">
              Order date: {new Date(checkout.createdAt).toLocaleDateString()}
            </p>
            </div>
            {/* Estimated Delivery */}
            <div>
              <p className="text-emerald-700 text-sm">
                Estimated Delivery: {calculateEstimatedDelivery(checkout.createdAt)}
              </p>
            </div>
          </div>
          {/* Ordered Items */}
          <div className="mb-20">
            {checkout.checkoutItems.map((item) =>
            (
              <div className="flex items-center mb-4" key={item.productId}>
                <img 
                src={item.image} 
                alt={item.name} 
                className="w-16 h-16 object-cover rounded-md mr-4" />
                <div>
                  <h4 className="text-md font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.color} | {item.size}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <h4 className="text-md font-semibold">₹{item.price}</h4>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Payment and delivery Info */}
          <div className="grid grid-cols-2 gap-8">
            {/* Payment Info */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment</h4>
              <p className="text-gray-600">RazorPay</p>
            </div>

            {/* Delivery Info */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Delivery</h4>
              <p className="text-gray-600">
                {checkout.shippingAddress.address}
              </p>
              <p className="text-gray-600">
                {checkout.shippingAddress.city}, {" "}
                {checkout.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderConfirmation