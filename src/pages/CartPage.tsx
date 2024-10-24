import React from 'react'

const CartPage:React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
       
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
    <div className="border rounded-lg p-6 bg-white shadow-lg transform transition-transform duration-300 hover:scale-105 relative">
    {/* 15% OFF Label - Positioned at top-left corner of the card */}
    <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 text-xs rounded">
      15% OFF
    </span>
 
    {/* Product Image */}
    <div>
      <img
        src="https://cdn.shopify.com/s/files/1/0565/8021/0861/products/Frame1-2022-05-14T125036.756-527280.png?v=1696545663"
        alt="Comfortable Pet Bed"
        className="h-40 w-full object-cover rounded-md"
      />
    </div>
  
    {/* Rating - Positioned above product title */}
    <div className="flex items-center mt-4">
      <svg className="w-4 h-4 fill-current text-yellow-500" viewBox="0 0 24 24">
        <path d="M12 .587l3.668 7.568L24 9.748l-6 5.844L19.8 24 12 20.142 4.2 24l1.8-8.408L0 9.748l8.332-1.593L12 .587z" />
      </svg>
      <span className="text-sm text-gray-700 ml-1">4.5</span>
    </div>
  
    {/* Product Details */}
    <div className="mt-2">
      <h3 className="text-lg font-bold">Comfortable Pet Bed</h3>
      
  
      {/* Price */}
      <p className="text-gray-500 mt-1">
        <span className="line-through">$59.99</span>{" "}
        <span className="text-green-600 font-semibold">$49.99</span>
      </p>
      
  
      {/* Stock Availability */}
      <p className="text-sm text-green-500 mt-1">In Stock</p>

      
      {/* Size and Quantity Block */}
      <div className="mt-4">
        <p className="text-sm text-gray-600">Select Size:</p>
        <select className="mt-2 border rounded-md p-2 w-full">
          <option value="5kg">5kg</option>
          <option value="10kg">10kg</option>
          <option value="20kg">20kg</option>
        </select>
      </div>
  
      {/* Quantity Selector for Package Type */}
      <div className="mt-4">
        <p className="text-sm text-gray-600">Select Quantity:</p>
        <select className="mt-2 border rounded-md p-2 w-full">
          <option value="1">1x10kg</option>
          <option value="2">2x10kg</option>
          <option value="5">5x10kg</option>
          <option value="10">10x10kg</option>
          <option value="20">20x10kg</option>
        </select>
      </div>
  
      {/* Buttons */}
      <div className="flex items-center justify-between mt-6">
        {/* Add to Cart Button */}
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
  </div>
  </section>

  
  )
}

export default CartPage;
