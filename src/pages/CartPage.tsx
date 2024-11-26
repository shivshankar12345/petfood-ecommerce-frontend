import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa"; // Using FontAwesome for the delete icon
import useApi from "../hooks/useApi";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const CartPage = () => {
  
  const { makeAPICallWithData, makeAPICallWithOutData } = useApi();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const [cart, setCart] = useState<any[]>([]);

  // Handle quantity change
  const handleQuantityChange = async (id: number, delta: number) => {
    const { isError, error } = await makeAPICallWithData(
      "patch",
      "/cart/updateCartItem",
      {
        cart_id: id,
        qty: delta,
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (isError) {
      toast.error(error?.response?.data?.message || "Something went wrong !!");
      return;
    }
    fetchCartItems();
  };

  // Remove cart item (API functionality is commented)
  const removeCartItem = async (id: number) => {
    const { isError, error } = await makeAPICallWithOutData(
      "delete",
      `/cart/deleteCartItem?cart_item_id=${id}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (isError) {
      toast.error(error?.response?.data?.message || "Something went Wrong !!");
      return;
    }
    fetchCartItems();
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => {
    console.log();
    const price = Number(item.product_id.discounted_price
      );
    const quantity = item.qty || 0;
    return total + price * quantity;
  }, 0);

  async function fetchCartItems() {
    const { isError, error, response } = await makeAPICallWithOutData(
      "get",
      "/cart/getCartItems",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (isError) {
      toast.error(error?.response?.data?.message || "Something went Wrong !!");
      return;
    }
    const { cartItems } = response?.data?.data;
    setCart(cartItems || []);
    console.log(cartItems);
  }

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleGoHome = () => {
    navigate("/");
  };
  const navigate = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 py-10 bg-gray-50">
      {/* Cart Items Section */}
      <div className="flex-grow">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Cart</h2>
        <div className="grid gap-6">
          {cart.length > 0 ? (
            cart.map(item => (
              <div
                key={item.id}
                className="border rounded-lg p-6 bg-white shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-4 relative"
              >
                {/* Delete Icon */}
                <button
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800 z-10"
                  onClick={() => removeCartItem(item.id)}
                >
                  <FaTrash size={18} />
                </button>

                {/* Product Image */}
                <img
                  src={item.product_id.imageUrl}
                  //alt={product.name}
                  className="w-24 h-24 object-cover rounded-md"
                />

                {/* Product Details */}
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.product_id.name}
                  </h3>
                  <p className="text-gray-700 mt-2">
                    <span className="font-bold text-xl text-green-600">
                      {/* ${product.price.toPrecision(2)} */}
                      {Number(item.product_id.discounted_price) &&
                      !isNaN(item.product_id.
                        discounted_price
                        )
                        ? Number(item.product_id.
                          discounted_price
                          ).toFixed(2)
                        : "N/A"}
                    </span>
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-4 mt-11">
                  <button
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md hover:bg-gray-300"
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="text-lg font-medium">{item.qty}</span>
                  <button
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md hover:bg-gray-300"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          ) : (
            // If cart is empty, show the button to go to home
            <div className="text-center col-span-3">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Your cart is empty.
              </h3>
              <button
                onClick={handleGoHome}
                className="w-60 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:bg-gradient-to-l hover:from-red-500 hover:to-orange-500 transition duration-300">
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Price Details Section */}
      {cart.length > 0 && (
        <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md p-6 sticky top-4">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Price Details
          </h3>
          <div className="flex justify-between text-gray-700 mb-3">
            <span>Subtotal</span>
            <span>
              $
              {totalPrice && !isNaN(totalPrice) ? totalPrice.toFixed(2) : "N/A"}
            </span>
          </div>
          <div className="flex justify-between text-gray-700 mb-3">
            <span>Delivery Fee</span>
            <span>0</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-3">
            <span>Tax (5%)</span>
            <span>
              $
              {totalPrice * 0.05 && !isNaN(totalPrice * 0.05)
                ? (totalPrice * 0.05).toFixed(2)
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-800 mb-6">
            <span>Total</span>
            <span>
              $
              {totalPrice * 1.05 && !isNaN(totalPrice * 1.05)
                ? (totalPrice * 1.05).toFixed(2)
                : "N/A"}
            </span>
          </div>
          <a href="/details">
          <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:bg-gradient-to-l hover:from-red-500 hover:to-orange-500 transition duration-300">
            Proceed Further 
          </button>
          </a>
        </div>
      )}
    </div>
  );
};

export default CartPage;
