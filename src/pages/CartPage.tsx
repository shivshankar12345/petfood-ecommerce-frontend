// Non-filter
// import React, { useState } from "react";

// const CartPage = () => {
//   // Static cart data for now
//   const [cart, setCart] = useState([
//     {
//       id: 1,
//       name: "Dog Food - Chicken Flavor",
//       price: 24.99,
//       imageUrl: "https://via.placeholder.com/150",
//       quantity: 1,
//     },
//     {
//       id: 2,
//       name: "Cat Food - Salmon Delight",
//       price: 19.99,
//       imageUrl: "https://via.placeholder.com/150",
//       quantity: 2,
//     },
//     {
//       id: 3,
//       name: "Bird Seed - Premium Blend",
//       price: 12.49,
//       imageUrl: "https://via.placeholder.com/150",
//       quantity: 1,
//     },
//   ]);

//   // Handle quantity change
//   const handleQuantityChange = (id: number, delta: number) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id
//           ? { ...item, quantity: Math.max(1, item.quantity + delta) }
//           : item
//       )
//     );
//   };

//   // Calculate total price
//   const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

//   return (
//     <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 py-16 bg-gray-50">
//       {/* Cart Items Section */}
//       <div className="flex-grow">
//         <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
//         <div className="grid gap-6">
//           {cart.map((product) => (
//             <div
//               key={product.id}
//               className="border rounded-lg p-6 bg-white shadow-md flex items-center gap-4"
//             >
//               {/* Product Image */}
//               <img
//                 src={product.imageUrl}
//                 alt={product.name}
//                 className="w-24 h-24 object-cover rounded-md"
//               />

//               {/* Product Details */}
//               <div className="flex-grow">
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   {product.name}
//                 </h3>
//                 <p className="text-gray-700 mt-2">
//                   <span className="font-bold text-xl text-green-600">
//                     ${product.price.toFixed(2)}
//                   </span>
//                 </p>
//               </div>

//               {/* Quantity Controls */}
//               <div className="flex items-center gap-4">
//                 <button
//                   className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md hover:bg-gray-300"
//                   onClick={() => handleQuantityChange(product.id, -1)}
//                 >
//                   -
//                 </button>
//                 <span className="text-lg font-medium">{product.quantity}</span>
//                 <button
//                   className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md hover:bg-gray-300"
//                   onClick={() => handleQuantityChange(product.id, 1)}
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Price Details Section */}
//       <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md p-6">
//         <h3 className="text-xl font-semibold mb-4">Price Details</h3>
//         <div className="flex justify-between text-gray-700 mb-3">
//           <span>Subtotal</span>
//           <span>${totalPrice.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between text-gray-700 mb-3">
//           <span>Tax (5%)</span>
//           <span>${(totalPrice * 0.05).toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between text-lg font-bold text-gray-800 mb-6">
//           <span>Total</span>
//           <span>${(totalPrice * 1.05).toFixed(2)}</span>
//         </div>
//         <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:bg-gradient-to-l hover:from-red-500 hover:to-orange-500 transition duration-300">
//           Proceed to Payment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartPage;

//latest responsive
// import React, { useState } from "react";

// const CartPage = () => {
//   // Static cart data for now
//   const [cart, setCart] = useState([
//     {
//       id: 1,
//       name: "Dog Food - Chicken Flavor",
//       price: 24.99,
//       imageUrl: "https://via.placeholder.com/150",
//       quantity: 1,
//     },
//     {
//       id: 2,
//       name: "Cat Food - Salmon Delight",
//       price: 19.99,
//       imageUrl: "https://via.placeholder.com/150",
//       quantity: 2,
//     },
//     {
//       id: 3,
//       name: "Bird Seed - Premium Blend",
//       price: 12.49,
//       imageUrl: "https://via.placeholder.com/150",
//       quantity: 1,
//     },
//   ]);

//   // Handle quantity change
//   const handleQuantityChange = (id: number, delta: number) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id
//           ? { ...item, quantity: Math.max(1, item.quantity + delta) }
//           : item
//       )
//     );
//   };

//   // Calculate total price
//   const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

//   return (
//     <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 py-10 bg-gray-50">
//       {/* Cart Items Section */}
//       <div className="flex-grow">
//         <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Cart</h2>
//         <div className="grid gap-6">
//           {cart.map((product) => (
//             <div
//               key={product.id}
//               className="border rounded-lg p-6 bg-white shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-4"
//             >
//               {/* Product Image */}
//               <img
//                 src={product.imageUrl}
//                 alt={product.name}
//                 className="w-24 h-24 object-cover rounded-md"
//               />

//               {/* Product Details */}
//               <div className="flex-grow text-center sm:text-left">
//                 <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
//                 <p className="text-gray-700 mt-2">
//                   <span className="font-bold text-xl text-green-600">
//                     ${product.price.toFixed(2)}
//                   </span>
//                 </p>
//               </div>

//               {/* Quantity Controls */}
//               <div className="flex items-center gap-4">
//                 <button
//                   className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md hover:bg-gray-300"
//                   onClick={() => handleQuantityChange(product.id, -1)}
//                 >
//                   -
//                 </button>
//                 <span className="text-lg font-medium">{product.quantity}</span>
//                 <button
//                   className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md hover:bg-gray-300"
//                   onClick={() => handleQuantityChange(product.id, 1)}
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Price Details Section */}
//       <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md p-6 sticky top-4">
//         <h3 className="text-xl font-semibold mb-4 text-gray-800">Price Details</h3>
//         <div className="flex justify-between text-gray-700 mb-3">
//           <span>Subtotal</span>
//           <span>${totalPrice.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between text-gray-700 mb-3">
//           <span>Tax (5%)</span>
//           <span>${(totalPrice * 0.05).toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between text-lg font-bold text-gray-800 mb-6">
//           <span>Total</span>
//           <span>${(totalPrice * 1.05).toFixed(2)}</span>
//         </div>
//         <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:bg-gradient-to-l hover:from-red-500 hover:to-orange-500 transition duration-300">
//           Proceed to Payment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartPage;

// import React, { useState } from "react";

// const CartPage = () => {
//   // Static cart data for now
//   const [cart, setCart] = useState([
//     {
//       id: 1,
//       name: "Dog Food - Chicken Flavor",
//       price: 24.99,
//       imageUrl: "https://via.placeholder.com/150",
//       quantity: 1,
//     },
//     {
//       id: 2,
//       name: "Cat Food - Salmon Delight",
//       price: 19.99,
//       imageUrl: "https://via.placeholder.com/150",
//       quantity: 2,
//     },
//     {
//       id: 3,
//       name: "Bird Seed - Premium Blend",
//       price: 12.49,
//       imageUrl: "https://via.placeholder.com/150",
//       quantity: 1,
//     },
//   ]);

//   // Handle quantity change
//   const handleQuantityChange = (id: number, delta: number) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id
//           ? { ...item, quantity: Math.max(1, item.quantity + delta) }
//           : item
//       )
//     );
//   };

//   // Calculate total price
//   const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

//   return (
//     <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 py-10 bg-gray-50">
//       {/* Cart Items Section */}
//       <div className="flex-grow">
//         <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Cart</h2>
//         <div className="grid gap-6">
//           {cart.map((product) => (
//             <div
//               key={product.id}
//               className="border rounded-lg p-6 bg-white shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-4"
//             >
//               {/* Product Image */}
//               <img
//                 src={product.imageUrl}
//                 alt={product.name}
//                 className="w-24 h-24 object-cover rounded-md"
//               />

//               {/* Product Details */}
//               <div className="flex-grow text-center sm:text-left">
//                 <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
//                 <p className="text-gray-700 mt-2">
//                   <span className="font-bold text-xl text-green-600">
//                     ${product.price.toFixed(2)}
//                   </span>
//                 </p>
//               </div>

//               {/* Quantity Controls */}
//               <div className="flex items-center gap-4">
//                 <button
//                   className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md hover:bg-gray-300"
//                   onClick={() => handleQuantityChange(product.id, -1)}
//                 >
//                   -
//                 </button>
//                 <span className="text-lg font-medium">{product.quantity}</span>
//                 <button
//                   className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md hover:bg-gray-300"
//                   onClick={() => handleQuantityChange(product.id, 1)}
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Price Details Section */}
//       <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md p-6 sticky top-4">
//         <h3 className="text-xl font-semibold mb-4 text-gray-800">Price Details</h3>
//         <div className="flex justify-between text-gray-700 mb-3">
//           <span>Subtotal</span>
//           <span>${totalPrice.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between text-gray-700 mb-3">
//           <span>Delivery Fee</span>
//           <span>0</span>
//         </div>
//         <div className="flex justify-between text-gray-700 mb-3">
//           <span>Tax (5%)</span>
//           <span>${(totalPrice * 0.05).toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between text-lg font-bold text-gray-800 mb-6">
//           <span>Total</span>
//           <span>${(totalPrice * 1.05).toFixed(2)}</span>
//         </div>
//         <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:bg-gradient-to-l hover:from-red-500 hover:to-orange-500 transition duration-300">
//           Proceed to Payment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartPage;

import React, { useState } from "react";
import { FaTrash } from "react-icons/fa"; // Using FontAwesome for the delete icon

const CartPage = () => {
  // Static cart data for now
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Dog Food - Chicken Flavor",
      price: 24.99,
      imageUrl: "https://via.placeholder.com/150",
      quantity: 1,
    },
    {
      id: 2,
      name: "Cat Food - Salmon Delight",
      price: 19.99,
      imageUrl: "https://via.placeholder.com/150",
      quantity: 2,
    },
    {
      id: 3,
      name: "Bird Seed - Premium Blend",
      price: 12.49,
      imageUrl: "https://via.placeholder.com/150",
      quantity: 1,
    },
  ]);

  // Handle quantity change
  const handleQuantityChange = (id: number, delta: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // Remove cart item (API functionality is commented)
  const removeCartItem = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));

    // Uncomment below to integrate with backend API
    /*
    try {
      await axios.delete(`/api/cart/${id}`); // Replace with your API endpoint
    } catch (err) {
      console.error("Error removing cart item:", err);
    }
    */
  };

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 py-10 bg-gray-50">
      {/* Cart Items Section */}
      <div className="flex-grow">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Cart</h2>
        <div className="grid gap-6">
          {cart.map(product => (
            <div
              key={product.id}
              className="border rounded-lg p-6 bg-white shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-4 relative"
            >
              {/* Delete Icon */}
              <button
                className="absolute top-2 right-2 text-red-600 hover:text-red-800 z-10"
                onClick={() => removeCartItem(product.id)}
              >
                <FaTrash size={18} />
              </button>

              {/* Product Image */}
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-md"
              />

              {/* Product Details */}
              <div className="flex-grow text-center sm:text-left">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-700 mt-2">
                  <span className="font-bold text-xl text-green-600">
                    ${product.price.toFixed(2)}
                  </span>
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-4 mt-11">
                <button
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md hover:bg-gray-300"
                  onClick={() => handleQuantityChange(product.id, -1)}
                >
                  -
                </button>
                <span className="text-lg font-medium">{product.quantity}</span>
                <button
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md hover:bg-gray-300"
                  onClick={() => handleQuantityChange(product.id, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Details Section */}
      <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md p-6 sticky top-4">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Price Details
        </h3>
        <div className="flex justify-between text-gray-700 mb-3">
          <span>Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-700 mb-3">
          <span>Delivery Fee</span>
          <span>0</span>
        </div>
        <div className="flex justify-between text-gray-700 mb-3">
          <span>Tax (5%)</span>
          <span>${(totalPrice * 0.05).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-gray-800 mb-6">
          <span>Total</span>
          <span>${(totalPrice * 1.05).toFixed(2)}</span>
        </div>
        <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:bg-gradient-to-l hover:from-red-500 hover:to-orange-500 transition duration-300">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CartPage;
